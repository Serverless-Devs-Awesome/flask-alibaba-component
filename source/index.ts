// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Framework = require('@serverless-devs/s-framework');
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import format = require('string-format');
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import fse = require('fs-extra');
import { DEFAULTPORT, DEFAULTSTART, DEFAULTBOOTSTRAP } from './bootstrap';

interface ProjectConfig {
  ProjectName: string;
}

interface CredentialsConfig {
  AccountID: string;
  AccessKeyID: string;
  AccessKeySecret: string;
}

interface PropertiesConfig {
  [key: string]: any
}

interface InputsContext {
  Project: ProjectConfig
  Credentials: CredentialsConfig
  Properties: PropertiesConfig
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
class TornadoComponent extends Framework {
  constructor(id?: string) {
    super(id);
  }

  async deploy(inputs: InputsContext) {

    if (!inputs.Properties.Detail) {
      inputs.Properties.Detail = {};
    }

    const frameworkInputs:any = inputs;
    frameworkInputs.Properties.Detail = {
      Function: inputs.Properties.Detail ? inputs.Properties.Detail.Function || {} : {},
      Service: inputs.Properties.Detail ? inputs.Properties.Detail.Service || {} : {}
    };
    frameworkInputs.Properties.Detail.Function.Runtime = frameworkInputs.Properties.Detail.Function.Runtime || frameworkInputs.Properties.Runtime || 'python3';
    frameworkInputs.Properties.Detail.Function.Runtime = frameworkInputs.Properties.Detail.Function.Runtime.toLowerCase();
    if (['python2.7', 'python3.6', 'python3.7'].indexOf(frameworkInputs.Properties.Detail.Function.Runtime) == -1) {
      throw new Error('The flash project runtime only supports python3 and python2.7');
    }
    frameworkInputs.Properties.Detail.Function.Handler = frameworkInputs.Properties.Detail.Function.Handler || frameworkInputs.Properties.Handler || 'index.app';
    // console.log(frameworkInputs.Properties.Detail.Function.Runtime);
    if (frameworkInputs.Properties.Detail.Function.Runtime === 'python3.7') {
      frameworkInputs.Properties.Detail.Function.Runtime = 'custom';
      const { Detail = {} } = inputs.Properties;
      const formatStr = {
        port: DEFAULTPORT,
        start: Detail.Bootstrap ? Detail.Bootstrap.Start || DEFAULTSTART : DEFAULTSTART,
        app: frameworkInputs.Properties.Detail.Function.Handler.replace('.', ':')
      };
      const bootstrapPath = Detail.Bootstrap ? Detail.Bootstrap.Path : undefined;
      if (bootstrapPath) {
        frameworkInputs.Bootstrap = {
          Content: await fse.readFileSync(bootstrapPath, 'utf-8'),
          IsConfig: Detail.Bootstrap ? true : false
        };
      } else {
        frameworkInputs.Bootstrap = {
          Content: format(DEFAULTBOOTSTRAP, formatStr),
          IsConfig: Detail.Bootstrap ? true : false
        };
      }
    } else {
      if (frameworkInputs.Properties.Detail.Function.Runtime === 'python3.6') {
        frameworkInputs.Properties.Detail.Function.Runtime = 'python3';
      }
      frameworkInputs.Bootstrap = {
        NoBootstrap: true
      };
    }
    return await super.deploy(frameworkInputs);
  }

  async remove(inputs:any) {
    await super.remove(inputs);
  }
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
module.exports = TornadoComponent;


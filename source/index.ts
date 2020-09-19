// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Framework = require('@serverless-devs/s-framework');

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
    frameworkInputs.Properties.Detail.Function.Runtime = frameworkInputs.Properties.Detail.Function.Runtime || frameworkInputs.Properties.Runtime || "python3"
    frameworkInputs.Properties.Detail.Function.Handler = frameworkInputs.Properties.Detail.Function.Handler || frameworkInputs.Properties.Handler || "index.app"
    frameworkInputs.Bootstrap = {
      NoBootstrap: true
    }
    frameworkInputs.Properties.Detail.Function.Runtime = frameworkInputs.Properties.Detail.Function.Runtime.toLowerCase()
    if(["python2.7", "python3"].indexOf(frameworkInputs.Properties.Detail.Function.Runtime)==-1){
      throw new Error("The flash project runtime only supports python3 and python2.7")
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


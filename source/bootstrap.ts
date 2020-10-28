export const DEFAULTBOOTSTRAP = `#!/usr/bin/env bash

export PORT={port}
export DEFAULTAPP={app}
{start}`;

export const DEFAULTPORT = 9000;
export const DEFAULTAPP = 'index.app';
export const DEFAULTSTART = 'gunicorn -w  1  --threads 10  -b 0.0.0.0:9000 $DEFAULTAPP';
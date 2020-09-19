export const DEFAULTBOOTSTRAP = `#!/usr/bin/env bash

export PORT={port}
export FLASK_APP={app}
{start}`;

export const DEFAULTPORT = 9000;
export const DEFAULTAPP = 'app.py';
export const DEFAULTSTART = 'python -m flask run --port $PORT';
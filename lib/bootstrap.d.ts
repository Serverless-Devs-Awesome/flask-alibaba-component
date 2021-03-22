export declare const DEFAULTBOOTSTRAP = "#!/usr/bin/env bash\n\nexport PORT={port}\nexport DEFAULTAPP={app}\n{start}";
export declare const DEFAULTPORT = 9000;
export declare const DEFAULTAPP = "index.app";
export declare const DEFAULTSTART = "gunicorn -w  1  --threads 10  -b 0.0.0.0:9000 $DEFAULTAPP";
//# sourceMappingURL=bootstrap.d.ts.map
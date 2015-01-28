## Setup

- `sudo npm -g install grunt grunt-cli bower browser-sync`
- `npm install`
- `bower install`




## Developing

- `grunt` to develop and watch local files. Browser sync will (if installed) proxy a vhost setup at `BROWSERSYNC_HOST_PROXY` (defined at the top of `Gruntfile.js`) to `http://localhost:3000`.
- `grunt build` to compile minified files for release.
- If running in a pre - web3 browser, you must also run a local Ethereum server with one of the following commands or change server URIs in `src/jsx/_config.jsx`.
	- (Go server) websockets: `ethereum -ws`, HTTP: `ethereum -rpc`
	- (C++ server) HTTP: `eth -j`

This project uses the [EditorConfig](http://editorconfig.org/) standard to maintain consistent source formatting, please use a relevant plugin for your editor.




## License

Developed under an MIT open source license, see the file LICENSE.txt for details.


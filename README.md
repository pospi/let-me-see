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




## TODO

- Designs and y'know, basic video chat implementation
- Address book implementations:
	- Ethereum contract storage (public)
	- Local storage (private)
	- Disabled completely
- Communication protocol support:
	- WebRTC with decentralised signalling via Whisper
	- Direct Whisper (delayed) transmission
	- Telehash
- Persistent recording storage:
	- Configurable transfer mode:
		- In-stream: halve bandwidth or request recipient(s) to handle storage for us
		- Configurable-quality post-broadcast: generated from max quality version cached on device or potentially uploaded in idle connection time (may need an app for this, but LocalStorage is possibly workable if flushed to disk)
	- Easily pluggable storage networks:
		- Storj
		- BTsync
		- Swarm
		- raw IPFS
- Extremely scalable input:
	- Full HD or whatever
	- Commonly supported video formats
	- 256-colour palletes, GIF streaming
	- mjpeg frames
- i18n *(this is mainly written here to repeatedly remind me to do it as I go)*




## Other ideas

These may or may not be realistic expectations and possibilities, or even good ideas. None of them have been verified as advantageous or secure by anyone else!

- **Key exchange anonymity with Whisper**<br />
  Send components of a secondary topic hash in non-visible areas of the message format in order to enhance anonymity of the connection. This could even be moved with every packet.
- Do a key handshake across an encrypted network (say, Tor) or possibly transmit WebRTC over it if the network speed is adequate.



User id format: begin '0x' & are 130 hex chars
in that case i'd probably just make sure that your group chat ids never like this

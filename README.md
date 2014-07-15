# smart url forward for heroku
## why
To forward from one domain to the next: 
* `<APP_NAME>.herokuapp.com/<URL_PATH_AFTER_FIRST_/>` to `<DESTINATION_URL>`.

For example, `code.bestape.net/lineNbr` forwards to `https://raw.githubusercontent.com/bestape/.0.sh-project/master/lineNbr.js` via this webapp. 

## about
This webapp is designed to use the benifits of: (1) a personally controlled server configured with [.0.sh](http://0.sh.bestape.net); and (2) a heroku server. It follows Unix philosophy's [Rule of Separation](https://en.wikipedia.org/wiki/Unix_philosophy#Eric_Raymond.E2.80.99s_17_Unix_Rules). 

The personally controlled server's primary job is to host the `dynDns/data.json` file on the Web. `dynDns/data.json` is what the user manually edits on a going forward basis to modify the webapp's setting. This system is the front-end interface.  

The heroku server's primary job is to be the system that hosts the back-end engine. 

##setup
On a personally controlled server (e.g. an [EC2](https://aws.amazon.com/ec2) instance):
* `git clone http://heroku.node.js-urlForward.bestape.net urlForward`;
* `cd urlForward`;
* `npm init`;
* `npm install`;
* replace the `"<DYNDATA_DESTINATION_URL>"` value in the `"dynDataLoc"` object in the `posit.json` file to the personally controlled server's url address;
* install [heroku](https://toolbelt.heroku.com);
* `heroku login`;
* `heroku apps:create <APP_NAME>`;
* `git commit -am "customized prototype git for specific use"`;
* `git push heroku master`;
* replace the `["<URL_PATH_AFTER_FIRST_/>", "<DESTINATION_URL>"]`values in the `"paths"` array's subArray in the `dynData/data.json` file with intended use data;
* add as many additional subArrays in the `dynData/data.json` file's `"path"` array as necessary; and
  * each subArray should have two values: (1) the [`"<URL_PATH_AFTER_FIRST_/>"`](https://en.wikipedia.org/wiki/URI_scheme#Examples) that will point to; (2) the `"<DESTINATION_URL>"` value.
* `./dynData/posit.js`.

## license
[heroku.node.js-urlForward](http://heroku.node.js-urlForward.bestape.net) is released under the [ISC](http://www.isc.org/downloads/software-support-policy/isc-license) license.

Copyright &copy; 2013-2014 by [bestape](mailto:heroku.node.js-urlForward@bestape.net) 

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

## notes
The personally controlled server can be used as git version control system. 
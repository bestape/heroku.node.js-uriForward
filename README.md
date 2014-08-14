# smart url forward for heroku
## why
To forward from one domain to the next: 
* `<APP_NAME>.herokuapp.com/<URL_PATH_AFTER_FIRST_/>` to `<DESTINATION_URL>`.

For example:
* [`code.bestape.net/lineNbr`](http://code.bestape.net/lineNbr) forwards to `https://raw.githubusercontent.com/bestape/.0.sh-project/master/lineNbr.js` via this webapp; and
* [`code.bestape.net`](http://code.bestape.net) provides a json object that lists the [urn](https://en.wikipedia.org/wiki/Uniform_resource_name) paths available at code.bestape.net. 

## about
This webapp is designed to use the benifits of: (1) a personally controlled server configured with [.0.sh](http://0.sh.bestape.net); and (2) a heroku server. It follows Unix philosophy's [Rule of Separation](https://en.wikipedia.org/wiki/Unix_philosophy#Eric_Raymond.E2.80.99s_17_Unix_Rules). 

The personally controlled server's primary job is to host the `content/data.json` file on the Web. `content/data.json` is what the user manually edits on a going forward basis to modify the webapp's setting. This system is the front-end interface. 

The heroku server's primary job is to be the system that hosts the back-end engine.

To turn the heroku server on/off or change the paths it redirects to, the desired effects should be written in the personally controlled server's `content/data.json` and passed to the heroku server.

##setup
On a personally controlled server (e.g. an [EC2](https://aws.amazon.com/ec2) instance), run the following commands.

To install urlForward's dependencies: 
* `git clone http://heroku.node.js-urlForward.bestape.net urlForward`;
* `cd urlForward`;
* `npm init`;
* `npm install`;

To customize urlForward:
* In the `posit.json` file, replace the `"<CONTENT_DESTINATION_URL>"` value within the `"uri" object that is within the `"content"` object to the personally controlled server's url address;
* In the `content/data.json` file, replace the `["<URN_PATH_AFTER_FIRST_/>", "<DESTINATION_URN>"]` values in the `"paths"` array's 0 value with specific and applied urn and url information; and
 * Add as many additional vales to in the array as needed; and
 * each subArray should have two values: (1) the `"<URN_PATH_AFTER_FIRST_/>"` that will point to; (2) the `"<DESTINATION_URL>"` value.
* In the `./content/posit.json` file, switch the `"port"` object to the desired port if it is not `4430`.

If no prior heroku work exists:
* install [heroku](https://toolbelt.heroku.com);
* `heroku login`;
* `heroku apps:create <APP_NAME>`;

If prior heroku work exists:
* `heroku keys:add`
* `git remote add <APP_HEROKU_GIT_URL>` 

Heroku deploy:
* `git commit -am "customized prototype git for specific use"`; and
* `git push heroku master`.

Serve content to heroku deploy:
* `./content/posit.js`.

## license
[heroku.node.js-urlForward](http://heroku.node.js-urlForward.bestape.net) is released under the [ISC](http://www.isc.org/downloads/software-support-policy/isc-license) license.

Copyright &copy; 2013-2014 by [bestape](mailto:heroku.node.js-urlForward@bestape.net) 

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

## notes
The personally controlled server's git can be used as a [revision control](https://en.wikipedia.org/wiki/Source_code_management) hub for the app's front-end and back-end content: 
* Run `./publicPrivateSwitch.js` to change between the custom and generic versions of the app; 
* use the `urlForward` folder to commit only generic, public viable git commits of the app; and
* create a clone of the `urlForward` folder with `cp -r urlForward urlForward.publish` and use it to record the custom git commits that will be pushed to heroku with `git push heroku master --force`. 

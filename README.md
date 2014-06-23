# Audio for the masses
> A talk for WebVisions 2014, Barcelona

Built with [generator-bespoke](https://github.com/markdalgleish/generator-bespoke), if you were curious about it.

## Credits

* ...

## View slides locally

First, ensure you have the following installed:

1. [Node.js](http://nodejs.org)
2. [Bower](http://bower.io): `$ npm install -g bower`
3. [Grunt](http://gruntjs.com): `$ npm install -g grunt-cli`

Then, install dependencies and run the preview server:

```bash
$ npm install && bower install
$ grunt server
```

## to-dos/would-be-nice-to-haves

- active line background change with transition
- why does the web component not work in Firefox?
	- also say webcomponentsenabled needs to be true
	- use <template>?
	- is it possible to place the code mirror dependency inside the component only? Browserify??
- iframes or what happens when changing between slides (+multiple audio contexts, multiple CMs)
- push to upstream the fixes in brickpresso
- brickpresso change slides on page up/down only as option (so arrows can be used to navigate the code)
- probably update the brickpresso (deck) css to a recent version, if applicable

- platform.js
	- html imports
		- code mirror encapsulation?
		- ~~~ brick deck

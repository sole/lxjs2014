# Audio for the masses
> A talk for LXJS 2014, Lisbon

## Video

[Watch it](https://www.youtube.com/watch?v=Bqj9LDszlDY&feature=youtu.be).

## View slides online

Here: [http://soledadpenades.com/files/t/lxjs2014/](http://soledadpenades.com/files/t/lxjs2014/)

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

To generate the things for uploading just run `grunt`.

## Accessing and running the examples

My recommendation is that you open them in a new tab. Also do it with the local server running as some things do not work well because of security restrictions (e.g. loading files' data).

The examples are using my strange invention which is a web component called `x-livecode` which uses an editor component called `x-editor` that internally uses CodeMirror for highlighting and stuff. Have a look at the index.html of each page to see how the `src` attribute is used to load `main.js`. Or how other attributes are used.

But if you want to just see the code in your favourite editor, just go to `src/examples/`. There's a folder per example and the `main.js` code is what gets loaded each time.

You can either execute line by line or selections. When you press `command + E`, if nothing is selected the current line will be evaluated. If something is selected, the selection will be evaluated.

You can also press the `run` button to execute the entire code. If you do it twice you might end up with double the amount of canvasses in the page, so be aware of this.

The code for the components is in `src/examples/js`. I plan to give them their own home in the web and write about them. Bear with me.

## Warnings

Because I'm running on the bleeding edge of the web components world, if you want to play with the examples make sure that `dom.webcomponents.enabled` is `false` in Firefox Nightly. If it's `true` you have been messing with it already so you shouldn't need help to bring it back to `false`.

The more-detailed-reason is that I'm using `platform.js` to polyfill things, and it gets confused with the intermediate support for web components in Firefox.

This presentation was built with [generator-bespoke](https://github.com/markdalgleish/generator-bespoke), and a couple of extra plugins I built, if you were curious about it.



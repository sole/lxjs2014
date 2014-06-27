# Audio for the masses
> A talk for LXJS 2014, Lisbon

## Video

[Watch it](https://www.youtube.com/watch?v=Bqj9LDszlDY&feature=youtu.be)

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

## Warnings

Because I'm running on the bleeding edge of the web components world, if you want to play with the examples make sure that `dom.webcomponents.enabled` is `false` in Firefox Nightly. If it's `true` you have been messing with it already so you shouldn't need help to bring it back to `false`.

The more-detailed-reason is that I'm using `platform.js` to polyfill things, and it gets confused with the intermediate support for web components in Firefox.

This presentation wa built with [generator-bespoke](https://github.com/markdalgleish/generator-bespoke), and a couple of extra plugins I built, if you were curious about it.



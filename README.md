# Duplicant

Duplicant is a bare-bones generator for creating React-powered <abbr title="Single Page App">SPA</abbr>s hosted by simple Express servers. These generated projects include the conveniences of contemporary JavaScript, code splitting, streamed <abbr title="Server-side Rending">SSR</abbr>, and <abbr title="Hot Module Replacement">HMR</abbr> (for both the client and server).

![Duplicant](https://d1u5p3l4wpay3k.cloudfront.net/oxygennotincluded_gamepedia_en/6/6f/Duplicant.png?version=82f7dd84b21270470e0b3c065894bd95)

> In JavaScript, no one can hear `this` scream...

### Installation

```shell
npm install -g duplicant
```

### Getting started

```shell
duplicant my-project
cd my-project
npm start
```

You are now ready to start building with:

* `react`
* `react-dom`
* `react-router-dom`
* `styled-components`

Some key things to review before you get too far down the rabbit hole:

* Review the available scripts in the `package.json` file
* `common/chunks.js` and `common/client-chunks.js` will show you how to create code-split components
* You can split on any component, not just pages!
* `common/routes.js` will show you how these split components are used

#### Time to get shit done!!

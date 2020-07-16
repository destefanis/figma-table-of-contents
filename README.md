# Table of Contents Figma Plugin

![Table of Contents Plugin Banner](https://github.com/destefanis/figma-table-of-contents/blob/master/src/app/assets/plugin-banner.png)

Direct people to the pages in your project that matter the most.

This Table of contents plugin for Figma generates a table of contents page and frame for your project. This is intended to:
* Help non-designers in your organization find the important pages in your file.
* Provide other designers context with links to important related documents.
* Help make all of your projects look consistent.

This plugin can be adjusted to fit your company's brand and can then be used as an internal plugin for your org.

## Install from the Figma Plugin Page
Although this plugin is open source, for most users you'll want to install from the Figma plugin community page.
[View Plugin Page](https://www.figma.com/community/plugin/865650075456407958/Table-of-Contents)

## Use the template instead
This file is also [published on the Figma community pages](https://www.figma.com/community/file/865646511096801223/Table-of-Contents) if you'd rather just duplicate the design.

## To Run Locally
* Run `yarn` to install dependencies.
* Run `yarn build:watch` to start webpack in watch mode.
* Open `Figma` -> `Plugins` -> `Development` -> `New Plugin...` and choose `manifest.json` file from this repo.

### To Edit
What this plugin generates and its appearance can be edited in [controller.ts](./src/plugin/controller.ts).
The react code, components, and UI can be found here [App.tsx](./src/app/components/App.tsx).  
Read more on the [Figma API Overview](https://www.figma.com/plugin-docs/api/api-overview/).

### How do I make this match my design brand
Update the font this plugin uses [here](./src/plugin/controller.ts#L10)
```javascript
  // Set the name of the font you want to use.
  let fontName = "Inter";
```
you can also adjust the right hand side color [here](./src/plugin/controller.ts#L137)
```javascript
  const fills = clone(imageFrame.fills);
  fills[0].color.r = 0.9764705896377563;
  fills[0].color.b = 0.9764705896377563;
  fills[0].color.g = 0.9764705896377563;
```

### Large Files
This plugin doesn't scale very well to very large projects but if this is a common enough request I'll add it in the future!

## Toolings
This repo is using:
* React + Webpack
* TypeScript
* TSLint
* Prettier precommit hook

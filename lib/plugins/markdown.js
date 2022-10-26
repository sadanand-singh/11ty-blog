/* Markdown Plugins */
let markdownIt = require("markdown-it");
let markdownItAnchor = require("markdown-it-anchor");
let markdownItEmoji = require("markdown-it-emoji");
let markdownItFootnote = require("markdown-it-footnote");
let markdownItContainer = require("markdown-it-container");
let markdownItTasks = require('markdown-it-task-lists')
let markdownItAttrs = require("markdown-it-attrs")

const anchorSlugify = (s) =>
  encodeURIComponent(
    String(s)
        .trim()
        .toLowerCase()
        .replace(/[.,\/#!$%\^&\*;:{}=_`~()]/g, '')
        .replace(/\s+/g, '-')
  );

let options = {
  html: true,
  breaks: false,
  linkify: true,
  typographer: true
};

let opts = {
  permalink: true,
  permalinkSymbol: '',
  permalinkClass: 'heading-anchor',
  permalinkBefore: true,
  level: 2,
  slugify: anchorSlugify,
};

const markdownLib = markdownIt(options)
    .use(markdownItAnchor, opts)
    .use(markdownItEmoji)
    .use(markdownItFootnote)
    .use(markdownItContainer, 'callout')
    .use(markdownItContainer, 'callout-blue')
    .use(markdownItContainer, 'callout-pink')
    .use(markdownItContainer, 'callout-green')
    .use(markdownItContainer, 'warning')
    .use(markdownItTasks)
    .use(require('@iktakahiro/markdown-it-katex'), {
      "throwOnError" : false,
      "errorColor" : " #cc0000"
    })
    .use(markdownItAttrs, {
      includeLevel: [2,3],
      listType: "ol"
    });

module.exports = markdownLib;
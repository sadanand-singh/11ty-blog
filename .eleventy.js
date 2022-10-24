const yaml = require("js-yaml");
const moment = require('moment');
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const htmlmin = require("html-minifier");
// const pluginRss = require("@11ty/eleventy-plugin-rss");
const readingTime = require('eleventy-plugin-reading-time');
const pluginTOC = require('@thedigitalman/eleventy-plugin-toc-a11y');
const site = require('./src/_data/site');

/**
 * Prefixes the given URL with the site's base URL.
 * @param {string} url
 */
const toAbsoluteUrl = (url) => {
  return new URL(url, site.baseUrl).href;
}

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

module.exports = function (eleventyConfig) {
  // Disable automatic use of your .gitignore
  eleventyConfig.setUseGitIgnore(false);

  // Merge data instead of overriding
  eleventyConfig.setDataDeepMerge(true);
  eleventyConfig.addPlugin(pluginTOC, {
    tags: ['h2', 'h3'],
    wrapperClass: 'text-gray-600 border-l-2 border-indigo-500 pl-1',
    headingClass: 'mb-2 font-semibold text-indigo-600 dark:text-indigo-400 tracking-widestest text-sm',
    headingText: 'TABLE OF CONTENTS',
    listType: 'ul',
    listClass: 'relative pl-1',
    listItemClass: 'pl-1 active:text-indigo-500',
    listItemAnchorClass: 'transition duration-500 transform hover:translate-x-2 block mt-2 text-sm hover:text-indigo-600 ml-0 text-gray-700 dark:text-gray-300 dark:hover:text-indigo-400 font-semibold active:text-indigo-500'
  });

  eleventyConfig.setLibrary("md", markdownIt(options)
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
    })
  );

  // human readable date
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return moment(dateObj).format(
      'MMMM Do YYYY'
    );
  });

  // Syntax Highlighting for Code blocks
  eleventyConfig.addPlugin(syntaxHighlight);

  // To Support .yaml Extension in _data
  // You may remove this if you can use JSON
  eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));

  // Copy Static Files to /_Site
  eleventyConfig.addPassthroughCopy({
    "./node_modules/alpinejs/dist/cdn.min.js": "./static/js/alpine.js",
    "./node_modules/prismjs/themes/prism-tomorrow.css":
      "./static/css/prism-tomorrow.css",
  });

  // Copy Image Folder to /_site
  eleventyConfig.addPassthroughCopy("./src/static/img");

  eleventyConfig.addFilter('relatedPosts', require('./lib/filters/related'));
  eleventyConfig.addFilter('featuredPosts', require('./lib/filters/featured'));
  eleventyConfig.addFilter('getTags', require('./lib/filters/getTags'));
  eleventyConfig.addFilter('interestingPosts', require('./lib/filters/interesting-posts'));
  eleventyConfig.addNunjucksFilter('limit', (arr, limit) => arr.slice(0, limit));
  eleventyConfig.addFilter('toAbsoluteUrl', toAbsoluteUrl);


  eleventyConfig.addPlugin(readingTime);
  eleventyConfig.addCollection('posts', require('./lib/collections/posts'));


  // Minify HTML
  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    // Eleventy 1.0+: use this.inputPath and this.outputPath instead
    if (outputPath.endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    }

    return content;
  });

  // Let Eleventy transform HTML files as nunjucks
  // So that we can use .html instead of .njk
  return {
    dir: {
      input: "src",
    },
    htmlTemplateEngine: "njk",
    templateFormats: ['md', 'njk', 'html'],
    dataTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk'
  };
};

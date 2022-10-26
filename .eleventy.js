const yaml = require("js-yaml");
const moment = require('moment');
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const htmlmin = require("html-minifier");
// const pluginRss = require("@11ty/eleventy-plugin-rss");
const readingTime = require('eleventy-plugin-reading-time');
const pluginTOC = require('@thedigitalman/eleventy-plugin-toc-a11y');
const site = require('./src/_data/site');
const shortcodes = require('./lib/shortcodes/shortcodes.js')
const pairedshortcodes = require('./lib/shortcodes/paired_shortcodes.js')
const markdownLib = require('./lib/plugins/markdown');

/**
 * Prefixes the given URL with the site's base URL.
 * @param {string} url
 */
const toAbsoluteUrl = (url) => {
  return new URL(url, site.baseUrl).href;
}





module.exports = function (eleventyConfig) {
  // Disable automatic use of your .gitignore
  eleventyConfig.setUseGitIgnore(false);

  // Merge data instead of overriding
  eleventyConfig.setDataDeepMerge(true);
  eleventyConfig.addPlugin(pluginTOC, {
    tags: ['h2', 'h3'],
    wrapperClass: 'text-gray-600 border-l-2 border-indigo-500 pl-1',
    headingClass: 'mt-10 text-lg font-normal text-indigo-700 dark:text-indigo-300 tracking-widestest',
    headingText: 'TABLE OF CONTENTS',
    listType: 'ul',
    listClass: 'relative pl-1',
    listItemClass: 'pl-1 active:text-indigo-500',
    listItemAnchorClass: 'transition duration-500 transform hover:translate-x-2 block mt-2 text-sm hover:text-indigo-600 ml-0 text-gray-700 dark:text-gray-300 dark:hover:text-indigo-400 font-semibold active:text-indigo-500'
  });

  /**
   * Shortcodes
   * @link https://www.11ty.io/docs/shortcodes/
   */
   Object.keys(shortcodes).forEach((shortcodeName) => {
    eleventyConfig.addShortcode(shortcodeName, shortcodes[shortcodeName])
  })

  /**
   * Paired Shortcodes
   * @link https://www.11ty.dev/docs/languages/nunjucks/#paired-shortcode
   */
  Object.keys(pairedshortcodes).forEach((shortcodeName) => {
    eleventyConfig.addPairedShortcode(
      shortcodeName,
      pairedshortcodes[shortcodeName]
    )
  })

  eleventyConfig.setLibrary('md', markdownLib);

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

const yaml = require("js-yaml");
const moment = require('moment');
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const Image = require("@11ty/eleventy-img");
const fs = require("fs");
const htmlmin = require("html-minifier");
// const pluginRss = require("@11ty/eleventy-plugin-rss");
const readingTime = require('eleventy-plugin-reading-time');
const pluginTOC = require('@thedigitalman/eleventy-plugin-toc-a11y');
const site = require('./src/_data/site');
const shortcodes = require('./lib/shortcodes/shortcodes.js')
const pairedshortcodes = require('./lib/shortcodes/paired_shortcodes.js')
const markdownLib = require('./lib/plugins/markdown');
const codeClipboard = require("eleventy-plugin-code-clipboard");

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

  eleventyConfig.addFilter('splitlines', function(input) {
    const parts = input.split(' ');
    const lines = parts.reduce(function(prev, current) {

    if (!prev.length) {
        return [current];
    }

    let lastOne = prev[prev.length - 1];

    if (lastOne.length + current.length > 19) {
        return [...prev, current];
    }

    prev[prev.length - 1] = lastOne + ' ' + current;

    return prev;
    }, []);

    return lines;
});


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
  eleventyConfig.addPlugin(codeClipboard, {
    // Version of clipboard.js to use. default to 2.0.8.
    clipboardJSVersion: '2.0.11',
    // Name of clipboard button css class. default to code-copy.
    // This class is also used to renderer
    // Click event of element with this class is listened by clipboard.js.
    buttonClass: 'code-copy',
    // Message if copy succeeds. default to "Copied!"
    successMessage: 'Copied!',
    // Message if copy failes. default to "Failed..."
    failureMessage: 'Failed...',
  });

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
  eleventyConfig.addFilter('getPostsByTags', require('./lib/filters/get-by-tags'));
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

  eleventyConfig.on('afterBuild', () => {
    const socialPreviewImagesDir = "_site/img/social-preview-images/";
    fs.readdir(socialPreviewImagesDir, function (err, files) {
        if (files.length > 0) {
            files.forEach(function (filename) {
                if (filename.endsWith(".svg")) {

                    let imageUrl = socialPreviewImagesDir + filename;
                    Image(imageUrl, {
                        formats: ["jpeg"],
                        outputDir: "./" + socialPreviewImagesDir,
                        filenameFormat: function (id, src, width, format, options) {

                            let outputFilename = filename.substring(0, (filename.length-4));

                            return `${outputFilename}.${format}`;

                        }
                    });
                    fs.unlink(imageUrl, function (err) {
                      if (err) {
                        console.error(err);
                      } else {
                        console.log("File removed:", filename);
                      }
                    });
                }
            })
        }
    })
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

const yaml = require("js-yaml");
const { DateTime } = require("luxon");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const htmlmin = require("html-minifier");
const pluginRss = require("@11ty/eleventy-plugin-rss");

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
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
      "dd LLL yyyy"
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

  // Copy favicon to route of /_site
  eleventyConfig.addPassthroughCopy("./src/favicon.ico");

  /**
 * Add shortcodes
 *
 * @link https://www.11ty.io/docs/shortcodes/
 */
    eleventyConfig.addShortcode('excerpt', (article) => {
    if (!article.hasOwnProperty('templateContent')) {
      console.warn(
        'Failed to extract excerpt: Document has no property "templateContent".'
      )
      return null
    }

    let excerpt = null
    const content = article.templateContent

    // The start and end separators to try and match to extract the excerpt
    const separatorsList = [
      { start: '<!-- Excerpt Start -->', end: '<!-- Excerpt End -->' },
      { start: '<p>', end: '</p>' },
    ]

    separatorsList.some((separators) => {
      const startPosition = content.indexOf(separators.start)
      const endPosition = content.indexOf(separators.end)

      if (startPosition !== -1 && endPosition !== -1) {
        excerpt = content
          .substring(startPosition + separators.start.length, endPosition)
          .trim()
        return true // Exit out of array loop on first match
      }
    })

    return excerpt.replace(/(\r\n|\n|\r)/gm, "").substring(0, 100)
  })

  eleventyConfig.addNunjucksFilter('limit', (arr, limit) => arr.slice(0, limit));

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

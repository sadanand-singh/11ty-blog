module.exports = {
  layout: 'posts',
  toc: true,
  tags: [],
  eleventyComputed: {
    sitemap: {
      'changefreq': 'weekly',
      'priority': 0.75,
      'ignore': false,
    },
    permalink: (data) => {
      if (data.slug) {
        return `blog/${data.slug}/index.html`;
        }
        else {
          return `blog/${data.page.fileSlug}/index.html`
        }
    },
  }
};
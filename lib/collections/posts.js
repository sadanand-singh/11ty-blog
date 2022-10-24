const isProduction = process.env.NODE_ENV === 'production';

module.exports = (coll) => {
  const posts = coll
      .getFilteredByGlob(['src/blog/**/*.md'])
      .filter((item) => item.data.permalink !== false)
      .filter((item) => !(item.data.draft && isProduction))
      .reverse();
  return posts;
};
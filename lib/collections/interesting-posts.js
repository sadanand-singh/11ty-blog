const isProduction = process.env.NODE_ENV === 'production';

module.exports = (coll) => {
    const posts = require('./posts')(coll);
    const filtered = posts
        .filter((item) => (item.data.tags.some(r=>["Deep Learning", "Machine Learning", "Algorithms", "Productivity"].includes(r))))
    return filtered;
  };
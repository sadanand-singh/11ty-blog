var stringSimilarity = require("string-similarity");

const getSimilarityScore = function(title, tags, b) {

    const res = [];
    tags.forEach(
      (e1) => b.data.tags.forEach(
        (e2) => res.push(stringSimilarity.compareTwoStrings(e1, e2))
      )
    );
    const tag_score = 5.0 * res.reduce((a, b) => a + b, 0);
    return tag_score + stringSimilarity.compareTwoStrings(title, b.data.title);
  };

module.exports = (posts, title, tags, date, url) => {
  return posts.filter((post) => {
    return post.url !== url;
    }).sort((a,b) => {
      const score_a = getSimilarityScore(title, tags, a);
      const score_b = getSimilarityScore(title, tags, b);
      const interval_a = Math.abs(a.date - date);
      const interval_b = Math.abs(b.date - date);

      return score_b - score_a || interval_a - interval_b;
    })
    .slice(0, 4);
  };
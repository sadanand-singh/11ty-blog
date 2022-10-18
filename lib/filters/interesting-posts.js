
module.exports = (posts) => {
    const filtered = posts
        .filter((item) => (item.data.tags.some(r=>["Deep Learning", "Machine Learning", "Algorithms", "Productivity"].includes(r))))
    return filtered;
};
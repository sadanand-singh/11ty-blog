
module.exports = (posts, tags) => {
    const filtered = posts
        .filter((item) => (item.data.tags.some(r=>tags.includes(r))))
    return filtered;
};
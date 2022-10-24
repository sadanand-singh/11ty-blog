const isDev = process.env.ELEVENTY_ENV === 'development';

const baseUrl = isDev ? `http://localhost:8080` : `https://reckoning.dev/`;

const site = {
  title: 'reckoning.dev',
  author: 'Sadanand Singh',
  lang: 'en-US',
  comments_repo: 'sadanand-singh/reckoning.dev.comments',
  description: 'Sadanand Singh Blog and Digital Garden',
  baseUrl,
}

module.exports = site;

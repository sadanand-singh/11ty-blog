const isDev = process.env.ELEVENTY_ENV === 'development';
const isProd = process.env.ELEVENTY_ENV === 'production';

const baseUrl = isDev ? `http://localhost:8080` : `https://reckoning.dev/`;
const tag = process.env.GOOGLE_TAGMANAGER_ID

const site = {
  title: 'reckoning.dev',
  author: 'Sadanand Singh',
  lang: 'en-US',
  comments_repo: 'sadanand-singh/reckoning.dev.comments',
  google_tagmanager_id: tag,
  description: 'Sadanand Singh Blog and Digital Garden',
  issues: {
    owner: `sadanand-singh`,
    repo: `11ty-blog`,
  },
  baseUrl,
  isProd
}

module.exports = site;

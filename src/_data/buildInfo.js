const childProcess = require('child_process');

const getLatestGitCommitHash = (format = 'long') => {
    return childProcess
      .execSync(`git rev-parse ${format === 'short' ? '--short' : ''} HEAD`)
      .toString()
      .trim();
  };

const buildInfo = () => {
  const latestGitCommitHash = getLatestGitCommitHash('long');
  const now = new Date();
  const timeZone = 'UTC';
  const buildTime = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone,
  }).format(now);
  return {
    // Can't use timeZoneName option together with dateStyle, so interpolate manually
    time: {
      raw: now.toISOString(),
      formatted: `${buildTime} ${timeZone}`,
    },
    hash: latestGitCommitHash,
  };
};

module.exports = buildInfo;

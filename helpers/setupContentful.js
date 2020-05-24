// This helper function does the following:
// 1. Determines the github branch
// 2. Uses environment variables depending on the current github branch
// 3. Returns a contentful config that is used in gatsby-config.js

const executeGitCommand = require('./executeGitCommand');

const liveBranches = new Set(['master', 'develop', 'preview']);

const setupContentful = () => {
  let branch = executeGitCommand('git rev-parse --abbrev-ref HEAD');
  if (!liveBranches.has(branch)) branch = 'develop';
  console.log('Current Branch:', branch);

  const deploymentDir = {
    master: {
      envFileName: 'production',
      apiType: 'Content API'
    },
    develop: {
      envFileName: 'development',
      apiType: 'Preview API'
    },
    preview: {
      envFileName: 'preview',
      apiType: 'Preview API'
    }
  };

  const envFile = `.env.${
    process.env.CONTENTFUL_ENV
      ? deploymentDir[process.env.CONTENTFUL_ENV].envFileName
      : deploymentDir[branch].envFileName
  }`;

  require('dotenv').config({
    path: envFile
  });

  console.log(
    `Contentful API Type: ${
      process.env.CONTENTFUL_ENV ? deploymentDir[process.env.CONTENTFUL_ENV].apiType : deploymentDir[branch].apiType
    }`
  );

  const contentfulConfig = {
    spaceId: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
  };

  process.env.CONTENTFUL_HOST ? (contentfulConfig.host = process.env.CONTENTFUL_HOST) : null;
  console.log('Contentful Config: ', contentfulConfig);

  const { spaceId, accessToken } = contentfulConfig;

  if (!spaceId || !accessToken) {
    throw new Error('Contentful spaceId and the access token need to be provided.');
  }

  return contentfulConfig;
};

module.exports = setupContentful;

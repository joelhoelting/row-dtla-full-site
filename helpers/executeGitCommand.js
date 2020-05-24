const { execSync } = require('child_process');

const executeGitCommand = command => {
  return execSync(command)
    .toString('utf8')
    .replace(/[\n\r\s]+$/, '');
};

module.exports = executeGitCommand;

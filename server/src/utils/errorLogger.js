const fs = require('fs').promises;

module.exports = function (error, status) {
  const seperator = '=-='.repeat(5);

  const str = `${error.name}\n${seperator}\n${error.message}\n${error.stack}`;

  const logName = new Date().toLocaleString().replace(', ', '-');

  console.log({ logName });

  console.log({ error: error.message });
  console.log({ name: error.name });
  console.log({ stack: error.stack });
};

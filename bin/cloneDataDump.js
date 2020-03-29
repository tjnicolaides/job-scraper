const clone = require('git-clone');

// eslint-disable-next-line no-console
clone('https://github.com/jobjawn/dataDump', './tmp/dataDump/', { shallow: true }, () => console.log('repo is downloaded'));

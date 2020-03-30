const clone = require('git-clone');
const rimraf = require('rimraf');
const fs = require('fs');
const path = require('path');

const tmpDestination = path.resolve('./tmp/dataDump/');
const tmpData = path.resolve(`${tmpDestination}/data/`);
const employersDestination = path.resolve('./src/data/employers/');

/* eslint-disable no-console */

const cleanupTmpDirectory = () => rimraf(tmpDestination, () => {
  console.log(`${tmpDestination} has been removed.\n`);
});

const transferEmployerFiles = () => {
  fs
    .readdirSync(tmpData)
    .filter((file) => file.extname !== '.json')
    .map((file) => fs.renameSync(path.resolve(`${tmpData}/${file}`), path.resolve(`${employersDestination}/${file}`), (err) => {
      if (err) throw err;
    }));

  console.log(`dataDump employers information moved to ${employersDestination}\n`);
};

const cloneRepository = (repository) => clone(repository, tmpDestination, { shallow: true },
  () => {
    console.log(`${repository} cloned to ${tmpDestination}\n`);

    fs.accessSync(tmpData, fs.constants.F_OK, (err) => {
      console.log(`${tmpDestination} ${err ? 'does not exist' : 'exists'}\n`);
    });

    transferEmployerFiles();
    cleanupTmpDirectory();
  });

const init = () => {
  const repository = 'https://github.com/jobjawn/dataDump';
  cloneRepository(repository);
};

init();

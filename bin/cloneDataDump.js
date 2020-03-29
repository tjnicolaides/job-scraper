const clone = require('git-clone');
const rimraf = require('rimraf');
const fs = require('fs');
const path = require('path');

const tmpDestination = path.resolve(`.${path.sep}tmp${path.sep}dataDump${path.sep}`);
const tmpData = path.resolve(`${tmpDestination}${path.sep}data${path.sep}`);
const employersDestination = path.resolve(`.${path.sep}src${path.sep}data${path.sep}employers${path.sep}`);

const cleanupTmpDirectory = () => rimraf(tmpDestination, () => {
  // eslint-disable-next-line no-console
  console.log(`${tmpDestination} has been removed.\n`);
});

const transferEmployerFiles = () => {
  fs.readdirSync(tmpData).forEach((file) => {
    if (path.extname(file) === '.json') {
      fs.renameSync(`${tmpData}${path.sep}${file}`, `${employersDestination}${path.sep}${file}`, (err) => {
        if (err) throw err;
      });
    }
  });

  // eslint-disable-next-line no-console
  console.log(`dataDump employers information moved to ${employersDestination}\n`);
};

const cloneRepository = () => {
  cleanupTmpDirectory();
  const repository = 'https://github.com/jobjawn/dataDump';
  return clone(repository, tmpDestination, { shallow: true },
    () => {
      // eslint-disable-next-line no-console
      console.log(`dataDump repo cloned to ${tmpDestination}\n`);
      fs.accessSync(tmpData, fs.constants.F_OK, (err) => {
        // eslint-disable-next-line no-console
        console.log(`${tmpDestination} ${err ? 'does not exist' : 'exists'}`);
      });

      transferEmployerFiles();
      cleanupTmpDirectory();
    });
};


const init = () => {
  cloneRepository();
};

init();

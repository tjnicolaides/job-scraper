const clone = require('git-clone');
const rimraf = require('rimraf');
const path = require('path');
const { ncp } = require('ncp');

const tmpDestination = `.${path.sep}tmp${path.sep}dataDump${path.sep}`;
const tmpData = `${tmpDestination}data${path.sep}`;
const employersDestination = `.${path.sep}src${path.sep}data${path.sep}employers${path.sep}`;

const cleanupTmpDirectory = () => rimraf(tmpDestination, () => {
  // eslint-disable-next-line no-console
  console.log(`${tmpDestination} has been removed.\n`);
});

const transferEmployerFiles = () => ncp(`${tmpData}`, `${employersDestination}`, (err) => {
  if (err) throw err;
  // eslint-disable-next-line no-console
  console.log(`dataDump employers information moved to ${employersDestination}\n`);
});

const cloneRepository = () => {
  cleanupTmpDirectory();
  const repository = 'https://github.com/jobjawn/dataDump';
  return clone(repository, tmpDestination, { shallow: true },
    () => {
      // eslint-disable-next-line no-console
      console.log(`dataDump repo cloned to ${tmpDestination}\n`);
      transferEmployerFiles();
      cleanupTmpDirectory();
    });
};


const init = () => {
  cloneRepository();
};

init();

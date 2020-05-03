import fs from 'fs';
import path from 'path';
import { EmployerJSON } from '../types';
import { EmployerDetail } from '../types/employer';

const employersDestination = path.resolve('./src/data/employers/');

export const cleanEmployerJSON = (data:string): EmployerJSON => {
  // eslint-disable-next-line no-useless-escape
  const re = /\,(?!\s*?[\{\[\"\'\w])/g;
  const jsonWithOutTrailingCommas = data.replace(re, '');
  return JSON.parse(jsonWithOutTrailingCommas);
};

export const getEmployerDetails = (data: string): EmployerDetail => {
  const employer = cleanEmployerJSON(data);
  const { company: { name, url, jobs_url: jobsUrl } } = employer;
  return { name, url, jobsUrl };
};

export const readFileContents = (file: string): Promise<EmployerDetail> => {
  const employerFile = `${employersDestination}/${file}`;

  // returns a promise (then/catch pattern) that will eventually return an object
  return fs.promises.readFile(employerFile)
    .then((data) => getEmployerDetails(data.toString()))
    .catch((error) => { throw error; });
};

export const readEmployerFiles = (files: string[]): Promise<EmployerDetail[]> => {
  // filters for JSON files, then loops through filtered set and returns *resolved* promises
  const employers = files
    .filter((file) => path.extname(file) === '.json')
    .map((file) => Promise.resolve(readFileContents(file)));

  // returns one promise that resolves when all the promises in the array are resolved
  return Promise.all(employers);
};

export const getEmployerFiles = async () => {
  const employerDir = fs.readdirSync(employersDestination);

  // awaits readEmployerFile Promise to resolve before going to next line
  const employers = await readEmployerFiles(employerDir);
  return employers;
};

export default getEmployerFiles;

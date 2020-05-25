import { cleanEmployerJSON, getEmployerDetails } from '../../src/utils/getEmployers';
import mockEmployerDetails from '../mocks/mockEmployerDetails';

describe('cleanEmployerJSON', () => {
  it('cleans trailing commas in JSON', () => {
    const invalidJSON = '{"company": "test",}';
    const validJSON = JSON.parse('{"company": "test"}');
    expect(cleanEmployerJSON(invalidJSON)).toEqual(validJSON);
  });
});

describe('getEmployerDetails', () => {
  it('gets relevant Employer Details from JSON files', () => {
    const filterEmployer = { name: 'Company', url: 'https://example.com', jobsUrl: 'https://example.com/jobs' };
    expect(getEmployerDetails(mockEmployerDetails)).toEqual(filterEmployer);
  });
});


describe('readFileContents', () => {
  it.skip('reads contents of Employer Files', () => {

  });
});

describe('readEmployerFiles', () => {
  it.skip('iterates over a list of JSON files', () => {

  });
});

import { cleanEmployerJSON, getEmployerDetails } from '../../src/utils/getEmployers';

describe('cleanEmployerJSON', () => {
  it('cleans trailing commas in JSON', () => {
    const invalidJSON = '{"company": "test",}';
    const validJSON = JSON.parse('{"company": "test"}');
    expect(cleanEmployerJSON(invalidJSON)).toEqual(validJSON);
  });
});

describe('getEmployerDetails', () => {
  it('gets relevant Employer Details from JSON files', () => {
    const fullEmployerJSON = '\{\"company\": \{\"name\":\"Company\"\,\"url\": \"https://example.com\"\,\"location\": \"Old City\"\,\"jobs_url\": \"https://example.com/jobs\"\}\,\"jobs\": \{"updated": "2/11/2019"\,\"listings\": \[\{\"title\": \"Director of Engineering\"\,\"url\": \"https://example.com/jobs/engineering-manager\"\,\"discipline\": \"development\"\,\"level\": \"Management\"\,\"found\": \"2/11/2019\"\}\,\]\}\}';
    const filterEmployer = {"name":"Company","url": "https://example.com","jobsUrl": "https://example.com/jobs"};
    expect(getEmployerDetails(fullEmployerJSON)).toEqual(filterEmployer);
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
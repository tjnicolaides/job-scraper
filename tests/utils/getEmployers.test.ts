import { cleanEmployerJSON, getEmployerDetails } from '../../src/utils/getEmployers';
const mock = require('mock-fs');

describe('cleanEmployerJSON', () => {
  it('cleans trailing commas in JSON', () => {
    const invalidJSON = '{"company": "test",}';
    const validJSON = JSON.parse('{"company": "test"}');
    expect(cleanEmployerJSON(invalidJSON)).toEqual(validJSON);
  });
});

describe('getEmployerDetails', () => {
  it('gets relevant Employer Details from JSON files', () => {
    const invalidJSON = '\{\"company\": \{\"name\":\"Company\"\,\"url\": \"https://example.com\"\,\"location\": \"Old City\"\,\"jobs_url\": \"https://example.com/jobs\"\}\,\"jobs\": \{"updated": "2/11/2019"\,\"listings\": \[\{\"title\": \"Director of Engineering\"\,\"url\": \"https://example.com/jobs/engineering-manager\"\,\"discipline\": \"development\"\,\"level\": \"Management\"\,\"found\": \"2/11/2019\"\}\,\]\}\}';
    const validJSON = {"name":"Company","url": "https://example.com","jobsUrl": "https://example.com/jobs"};
    expect(getEmployerDetails(invalidJSON)).toEqual(validJSON);
  });
});

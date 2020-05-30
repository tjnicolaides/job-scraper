/* eslint-disable no-console */
// import metascraper from 'metascraper';
import got from 'got';
import nock from 'nock';
import crawlJobLists from '../../src/utils/crawlJobList';
import mockEmployerHTML from '../mocks/mockEmployerHTML';

// jest.genMockFromModule('metascraper').default;
jest.mock('got');

const mockEmployer = {
  name: 'ABC Company',
  url: 'https://abc.domain',
  jobsUrl: 'https://careers.abc.domain',
};

describe('crawlJobLists', () => {
  nock(mockEmployer.url)
    .get('/')
    .reply(200, mockEmployerHTML);

  it('runs metascraper on each employer\'s URL and returns objects with metadata', async () => {
    const mockResponse = [Promise.resolve({
      title: 'ABC Company website',
      author: null,
      description: 'ABC Company is here for you',
      date: '2020-05-03T21:46:25.000Z',
      url: 'https://abc.domain',
    })];

    const response = await crawlJobLists([mockEmployer]);
    console.log(response);
    console.log(mockResponse);

    expect(got).toHaveBeenCalledTimes(1);
    // expect(response).toEqual(mockResponse);
    // expect(metascraper).toHaveBeenCalledTimes(1);
    expect(got).toHaveBeenCalledWith(mockEmployer.url, { rejectUnauthorized: false });
  });
});

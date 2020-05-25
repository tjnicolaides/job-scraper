// import metascraper from 'metascraper';
import got from 'got';
import nock from 'nock';
import crawlJobLists from '../../src/utils/crawlJobList';

// jest.genMockFromModule('metascraper').default;
jest.mock('got');

describe('crawlJobLists', () => {
  const mockEmployer = {
    name: 'ABC Company',
    url: 'https://abc.domain',
    jobsUrl: 'https://careers.abc.domain',
  };
  nock(mockEmployer.url)
    .get('/')
    .reply(200, 'Hello world!');

  it.skip('runs metascraper on each employer\'s URL and returns objects with metadata', async () => {
    const mockResponse = [Promise.resolve({
      title: 'ABC Company website',
      author: null,
      description: 'ABC Comapny is here for you',
      date: '2020-05-03T21:46:25.000Z',
      url: 'https://abc.domain',
    })];

    // metascraper.mockReturnValue(mockResponse);
    const response = await crawlJobLists([mockEmployer]);

    expect(response).toEqual(mockResponse);
    // expect(metascraper).toHaveBeenCalledTimes(1);
    expect(got).toHaveBeenCalledWith(mockEmployer.url, { rejectUnauthorized: false });
  });
});

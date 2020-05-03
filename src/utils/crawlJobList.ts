import got from 'got';
import { EmployerDetail } from '../types/employer';

const metascraper = require('metascraper')([
  /* eslint-disable global-require */
  require('metascraper-title')(),
  require('metascraper-author')(),
  require('metascraper-description')(),
  require('metascraper-date')(),
  require('metascraper-url')(),
  /* eslint-enable global-require */
]);

const scrapeURL = async (targetURL: string): Promise<void> => {
  // eslint-disable-next-line no-console
  console.log('Scrapin\'');

  // eslint-disable-next-line no-console
  const { body: html, url } = await got(targetURL);
  const metadata = await metascraper({ html, url });
  // eslint-disable-next-line no-console
  return (metadata);
};

const gatherURLs = async (employers: EmployerDetail[]) => {
  // eslint-disable-next-line no-console
  console.log(employers);
  const targetURL = 'https://mobilesyrup.com/2020/05/01/oneplus-ideas-user-suggested-features-oxygenos/';
  const response = scrapeURL(targetURL);
  return (response);
};

const crawlJobLists = async (employer: EmployerDetail[]) => {
  const response = gatherURLs(employer);
  return (response);
};

export default crawlJobLists;

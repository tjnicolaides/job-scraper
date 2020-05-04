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

type SiteMetadata = {
  title: string | null;
  author: string | null;
  description: string | null;
  date: string | null;
  url: string | null;
};

const scrapeEmployerSiteMetadata = async (targetURL: string): Promise<SiteMetadata> => {
  const { body: html, url } = await got(targetURL, { rejectUnauthorized: false });
  return metascraper({ html, url });
};

const crawlJobLists = (employers: EmployerDetail[]): Promise<SiteMetadata>[] => employers
  .map((employer) => scrapeEmployerSiteMetadata(employer.url));

export default crawlJobLists;

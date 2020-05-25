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
  try {
    const { body: html, url } = await got(targetURL, { rejectUnauthorized: false });
    return metascraper({ html, url });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
  return (
    {
      title: null,
      author: null,
      description: null,
      date: null,
      url: targetURL,
    }
  );
};

// eslint-disable-next-line max-len
const crawlJobLists = (employers: EmployerDetail[]): Promise<SiteMetadata>[] => employers.map((employer) => {
  let result:Promise<SiteMetadata> = Promise.resolve({
    title: null,
    author: null,
    description: null,
    date: null,
    url: employer.url,
  });
  try {
    result = scrapeEmployerSiteMetadata(employer.url);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
  return result;
});

export default crawlJobLists;

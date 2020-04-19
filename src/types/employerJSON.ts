type Company = {
  name: string;
  url: string;
  location: string;
  jobs_url: string;
};

type Jobs = {
  updated: string;
  listings: Job[];
};

type Job = {
  title: string;
  url: string;
  discipline: string;
  level: string;
  found: string;
};

export type EmployerJSON = {
  company: Company;
  jobs: Jobs;
};

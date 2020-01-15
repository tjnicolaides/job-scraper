# Jobjawn Job Scraper
Job Scraper is a serverless project that scrapes our favorite sites looking for tech jobs in the Philadelphia area.

## Requirements
To spin up a working copy of this site on your local machine, you'll need a few important pieces before getting started:
- Sign up for a free [Google Cloud account](https://cloud.google.com/sdk/docs/)
  - Request permissions to the jobjawn-scraper project
- [Install Docker Community Edition](https://www.docker.com/community-edition)
- Windows users will need to [configure Docker to access local drives](https://rominirani.com/docker-on-windows-mounting-host-directories-d96f3f056a2c)

## Installation
- Clone this repository to your local machine
- `cd` into the project directory
- [Authenticate](https://cloud.google.com/container-registry/docs/advanced-authentication) with Google Services: `gcloud auth configure-docker`

## Development
- Run `npm run develop` to pull down a copy of the Docker image.
- Visit [http://localhost:9090](http://localhost:9090) in your browser to view the "Hello world!" page.

### Deploy a build of the container to Google Cloud
- Run `npm run docker:build && npm run docker:push`

## Support
Please [open an issue](https://github.com/tjnicolaides/job-scraper/issues) for support.

## Contributing
Please contribute using [Gitflow Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow). Create a branch, add commits, and [open a pull request](https://github.com/tjnicolaides/job-scraper/pulls).

Branch names should follow the following formats:

- New features / additions: `feature/new-feature-name`
- Bugfixes: `fix/bugfix-description`
- Releases: `release/release-2.0.0` 

If you solve a tricky bug, the next person who works on this codebase will appreciate you including a Stack Overflow or Github Issue link to help understand why the change was made!

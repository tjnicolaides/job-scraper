// Imports the Google Cloud Tasks library.
import { CloudTasksClient } from '@google-cloud/tasks';

// Instantiates a client.
const client = new CloudTasksClient();

// TODO(developer): Uncomment these lines and replace with your values.
const project = 'jobjawn-scraper';
const queue = 'employer-site';
const location = 'us-east1';
const url = 'https://jobjawn-paizh5jejq-ue.a.run.app/test';
const serviceAccountEmail = 'employer-site@jobjawn-scraper.iam.gserviceaccount.com';
const payload = 'Hello, World!';

// Construct the fully qualified queue name.
const parent = client.queuePath(project, location, queue);

const task = {
  httpRequest: {
    httpMethod: 'POST' as const,
    url,
    body: Buffer.from(payload).toString('base64'),
    oidcToken: {
      serviceAccountEmail,
    },
  },
};

const init = async () => {
  console.log('Sending task:');
  console.log(task);
  // Send create task request.
  const request = { parent, task };
  const [response] = await client.createTask(request);
  const { name } = response;
  console.log(`Created task ${name}`);
};

init();

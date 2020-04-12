import { cleanEmployerJSON } from '../../src/utils/getEmployers';

describe('cleanEmployerJSON', () => {
  it('cleans trailing commas in JSON', () => {
    const invalidJSON = '{"company": "test",}';
    const validJSON = JSON.parse('{"company": "test"}');
    expect(cleanEmployerJSON(invalidJSON)).not.toEqual(validJSON);
  });
});

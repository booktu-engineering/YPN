import { expect } from 'chai';
import { testElection, testSurvey, voteResponses } from './test'
import QuestionService from '../../services/election';

let data
let results;
let responses
/* eslint object-curly-newline: 0 */
describe('Question Service - Polls, Surveys, Questionaiires and elections', () => {
  describe('Polls unit tests', () => {
    it('Create should automatically create a unit with type 3', async () => {
      data = { title: 'A test poll', type: 2, questions: [{ question: 'Who would you rather go for ?', options: ['Free Education', 'Goodlucj Jonathan', 'Princess Diana'] }] };
      data = await QuestionService.createSync(data);
      expect(data.type).to.equal(2);
      expect(data.questions['0']).to.equal('Who would you rather go for ?');
      expect(data.options['0']['Free Education']).to.equal(0);
    });

    it('Respond should vote for a specfic option', async () => {
      data = { id: data.id, responses: [{ 0: 'Free Education'}], user: { name: 'Hasstrup Ezekiel', id: 2}, reasons: { 0: 'I think free education is totally nice'}}
      data = await QuestionService.respond(data);
      expect(data.options['0']['Free Education']).to.equal(1);
      expect(data.responses[0].user.name).to.equal('Hasstrup Ezekiel');
    });

    it('Respond should vote for a specfic option (Second vote)', async () => {
      data = { id: data.id, responses: [{ 0: 'Princess Diana'}], user: { name: 'Chisom Ekwuribe', id: 2}, reasons: { 0: 'She was truly amazing'}}
      data = await QuestionService.respond(data);
      expect(data.options['0']['Princess Diana']).to.equal(1);
      expect(data.responses[1].user.name).to.equal('Chisom Ekwuribe');
    });

    it('Fetch Results should get the results of the subject election', async () => {
      results = await QuestionService.fetchResults('_id', data._id);
      expect(results).to.be.an('object');
      expect(results['0'].question).to.equal('Who would you rather go for ?');
    })
  });

  describe('Elections service object', () => {
    before(async () => {
      data = await QuestionService.createSync(testSurvey);
      responses = voteResponses.map(vote => Object.assign({}, vote, { id: data._id }))
      await QuestionService.respond(responses[0]);
      await QuestionService.respond(responses[1]);
      await QuestionService.respond(responses[2]);
      await QuestionService.respond(responses[3]);
      await QuestionService.respond(responses[4]);
    });

    it('Fetch results of the election', async () => {
      results = await QuestionService.fetchResults('_id', data._id);
      expect(results[0].response).to.be.an('array');
      expect(results[0].response[0].user.name).to.equal('Jermaine cole');
      expect(results[0].response[0].reason).to.equal('well I really love sleeping')
    });
  })


});

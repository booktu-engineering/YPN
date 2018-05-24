import 'babel-polyfill';
import { expect } from 'chai';
import ConversationService from '../../services/conversation-service';
import PostService from '../../services/post-service';

let testcase;
let data;

/* eslint object-curly-newline: 0, padded-blocks: 0 */
describe('Conversation service object', () => {

  it('Create should create a conversation', async () => {
    testcase = { members: [69, 70], type: 1, origin: { id: 1 } };
    data = await ConversationService.create(testcase);
    expect(data.members).to.include(69);
  });

  describe('Fetch messages for conversation', () => {
    before(async () => {
      const message1 = { content: 'This is the crazy', type: 2, destination: data._id, origin: { id: 12, name: 'Hasstrup Ezekiel' } };
      const message2 = { content: 'This is the crazy again', type: 2, destination: data._id, origin: { id: 13, name: 'Toyin Ezekiel' } };
      await PostService.create(message1);
      await PostService.create(message2);
    });

    it('Fetch one should get the conversation and its messages', async () => {
      data = await ConversationService.fetchOne('_id', data._id);
      expect(data.messages).to.be.an('array');
      expect(data.messages[0].content).to.equal('This is the crazy');
    });

    it('Should add a user to the members of a conversation', async () => {
      data = await ConversationService.extendInvite('_id', data._id, { id: 12, username: 'BaysixBitiyong' });
      expect(data.invites.map(item => item.id)).to.include(12);
      expect(data.invites[0].username).to.equal('BaysixBitiyong');
    });
  });

  describe('Get timeline', () => {
    before(async () => {
      const post1 = { content: 'This is the crazy ghost', type: 1, destination: null, origin: { id: 14, name: 'Hasstrup Ezekiel' } };
      const post2 = { content: 'This is the crazy ghost 122', type: 1, destination: null, origin: { id: 14, name: 'Hasstrup Ezekiel' } };
      const post3 = { content: 'This is the crazy ghost 12345', type: 1, destination: null, origin: { id: 15, name: 'Ezekiel Hasstrup G' } };
      await PostService.create(post1);
      await PostService.create(post2);
      await PostService.create(post3);
    });

    it('Get timeline should get the posts of a user', async () => {
      const body = [14, 15];
      data = await ConversationService.getTimeline(body);
      expect(data).to.be.an('array');
    });

  });

});

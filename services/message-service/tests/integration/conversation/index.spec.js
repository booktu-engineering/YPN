import 'babel-polyfill'
import request from 'supertest';
import { expect } from 'chai';
import jwt from 'jsonwebtoken';
import app from '../../../';
import token, { validConversation, messages, invalidTownHall, validTownHall } from '../helper';
import { decodeToken, decodeKeyTest } from '../../../helpers/keys';
import PostService from '../../../services/post-service'

let res;
let data;
let user;
let source;
let otherToken

describe('Conversation Endpoints', () => {
  before(async () => {
    user = await decodeToken(token);
  });
  describe('Normal Conversations - specified with type 0', () => {

    it('Should successfully create a message log between two or more party members', async () => {
      res = await request(app).post('/api/v1/convos/?type=1').send(validConversation).set('Authorization', token);
      data = res.body.data;
      expect(res.statusCode).to.equal(201);
      expect(res.body.data.type).to.equal(1);
      expect(res.body.data.members.length).to.not.equal(0);
    });

    it('Fetch conversation should get some of the messages added to the group', async () => {
      const { group } = messages;
      source = group.map(item => Object.assign({}, item, { destination: data._id }));
      await PostService.create(source[0]);
      await PostService.create(source[1]);
      res = await request(app).get(`/api/v1/convos/${data._id}`).set('Authorization', token);
      expect(res.statusCode).to.equal(200);
      expect(res.body.data.messages[0]).to.be.an('object');
      expect(res.body.data.messages.length).to.not.equal(0);
    });

    it('Join Conversation should be blocked for non town-hall/debate meetings except invites extended to you', async () => {
      otherToken = await jwt.sign({ id: 17, name: 'This is Hasstrup', role: 1 }, decodeKeyTest);
      res = await request(app).put(`/api/v1/convos/join/${data._id}`).set('Authorization', otherToken);
      expect(res.statusCode).to.equal(401);
      expect(res.body.error).to.equal('You cannot join a personal conversation, because you havent been invited');
    });

    it('Invite a member should only work for the owner of the conversation', async () => {
      res = await request(app).put(`/api/v1/convos/invite/${data._id}`).set('Authorization', token).send({ id: 17, username: 'BaysixBitiyong' });
      expect(res.statusCode).to.equal(200);
      expect(res.body.data.invites[0].id).to.equal(17);
      expect(res.body.data.invites[0].username).to.equal('BaysixBitiyong');
    });

    it('The invited member should now be able to join the conversation', async () => {
      res = await request(app).put(`/api/v1/convos/join/${data._id}`).set('Authorization', otherToken);
      expect(res.statusCode).to.equal(200);
      expect(res.body.data.members.map(item => item.id)).to.include(17);
    });

    it('Should fetch all the conversations a user is part of', async () => {
      res = await request(app).get('/api/v1/convos/').set('Authorization', token);
      expect(res.statusCode).to.equal(200);
      expect(res.body.data).to.be.an('array');
      expect(res.body.data[(Math.floor(Math.random() * (res.body.data.length - 1)))]).to.have.property('members');
    });

    it('Leave conversation should allow a current member of the conversation leave', async () => {
      res = await request(app).put(`/api/v1/convos/leave/${data._id}`).set('Authorization', otherToken);
      expect(res.statusCode).to.equal(200);
      expect(res.body.data.members.map(item => item.id)).to.not.include(17);
    });

    it('Archive conversation should be blocked for personal and group conversation', async () => {
      res = await request(app).delete(`/api/v1/convos/${data.id}`).set('Authorization', token);
      expect(res.statusCode).to.equal(401);
      expect(res.body.error).to.equal('Sorry you are not authorized to do this');
    });
  });
  describe('Town Hall Special Filters', () => {
    it('Should reject an an invalid post because it is a basic user', async () => {
      res = await request(app).post('/api/v1/convos/?type=3').send(invalidTownHall).set('Authorization', token);
      expect(res.statusCode).to.equal(401);
    });

    it('Should reject the create request because the body is incomplete', async () => {
      otherToken = await jwt.sign({ id: 3, role: 5, username: 'Hasstrupezekiel' }, decodeKeyTest);
      res = await request(app).post('/api/v1/convos/?type=3').set('Authorization', otherToken);
      expect(res.statusCode).to.equal(422);
    });

    it('Should create a successful townhall with the focus', async () => {
      res = await request(app).post('/api/v1/convos/?type=3').set('Authorization', otherToken).send(validTownHall);
      expect(res.statusCode).to.equal(201);
      expect(res.body.data.focus.id).to.equal(validTownHall.focus.id);
    });
  });

});

import 'babel-polyfill'
import request from 'supertest';
import { expect } from 'chai';
import app from '../../../';
import token, { validPost } from '../helper';
import { decodeToken } from '../../../helpers/keys';

let res;
let user;
let data;
/* eslint no-unused-expressions: 0, prefer-destructuring: 0 */
describe('Post EndPoints', () => {
  before(async () => {
    user = await decodeToken(token);
  });

  it('Create one should create a post with origin belonging to the current user', async () => {
    try {
      res = await request(app).post('/api/v1/posts/').send(validPost).set('Authorization', token);
      expect(res.statusCode).to.equal(201);
      expect(res.body.data.origin.username).to.equal(user.username);
    } catch (e) {
      expect(e).to.not.exist;
    }
  });

  it('Fetch one should fetch a particular post', async () => {
    data = res.body.data;
    res = await request(app).get(`/api/v1/posts/${data._id}`);
    expect(res.statusCode).to.equal(200);
    expect(res.body.data.data).to.be.an('object');
    expect(res.body.data.data).to.have.property('origin');
  });


  it('/ should get the timeline of the current user', async () => {
    res = await request(app).get('/api/v1/posts/').set('Authorization', token);
    expect(res.statusCode).to.equal(200);
    expect(res.body.data).to.be.an('array');
  });

  it('Should update the post object if the user owns the object', async () => {
    res = await request(app).put(`/api/v1/posts/${data._id}`).send({ content: 'I changed the content to something amazing', media: 'Blah Blah' }).set('Authorization', token);
    expect(res.statusCode).to.equal(200);
    expect(res.body.data).to.be.an('object');
    expect(res.body.data.content).to.equal('I changed the content to something amazing');
    expect(res.body.data.media).to.not.equal('Blah Blah');
  });

  it('Delete one should delete a specific post with the right access', async () => {
    res = await request(app).delete(`/api/v1/posts/${data._id}`).set('Authorization', token);
    expect(res.statusCode).to.equal(204);
  });

});

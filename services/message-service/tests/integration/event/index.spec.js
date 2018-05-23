import 'babel-polyfill'
import request from 'supertest';
import { expect } from 'chai';
import jwt from 'jsonwebtoken';
import app from '../../../';
import token, { validEvent } from '../helper';
import { decodeToken, decodeKeyTest } from '../../../helpers/keys';

let res;
let user;
let data;

/* eslint prefer-destructuring: 0, no-unused-expressions: 0 */
describe('Events Endpoints', () => {
  before(async () => {
    user = await decodeToken(token);
  });

  it('Post events/ should create a new event', async () => {
    res = await request(app).post('/api/v1/events').send(validEvent).set('Authorization', token);
    data = res.body.data;
    expect(res.statusCode).to.equal(201);
    expect(res.body.data.name).to.equal(validEvent.name);
  });

  it('Get events should fetch all the events on the platform', async () => {
    res = await request(app).get('/api/v1/events').set('Authorization', token);
    expect(res.statusCode).to.equal(200);
    expect(res.body.data).to.be.an('array');
    res.body.data = res.body.data.filter(item => !item.valid);
    expect(res.body.data.length).to.equal(0);
  });

  it('Get event should fetch a particular event', async () => {
    res = await request(app).get(`/api/v1/events/${data._id}`).set('Authorization', token);
    expect(res.statusCode).to.equal(200);
    expect(res.body.data).to.be.an('object');
    expect(res.body.data.name).to.equal(validEvent.name);
  });

  it('Confirm event should confirm the event from the backend', async () => {
    const adminToken = await jwt.sign({ role: 5, id: 114 }, decodeKeyTest);
    res = await request(app).put(`/api/v1/events/confirm/${data._id}`).set('Authorization', adminToken);
    expect(res.statusCode).to.equal(200);
    expect(res.body.data.valid).to.be.true;
  });

  it('Get events should fetch all the events on the platform, after confirmation', async () => {
    res = await request(app).get('/api/v1/events').set('Authorization', token);
    expect(res.statusCode).to.equal(200);
    expect(res.body.data).to.be.an('array');
    expect(res.body.data.length).to.not.equal(0);
  });

  it('Attend event should let a user attend a user', async () => {
    res = await request(app).put(`/api/v1/events/join/${data._id}`).set('Authorization', token);
    expect(res.statusCode).to.equal(200);
    expect(res.body.data).to.be.an('object');
    expect(res.body.data.members.length).not.to.equal(0);
    expect(res.body.data.members[0].id).to.equal(user.id);
  });

  it('Get All the events concerning a user', async () => {
    res = await request(app).get(`/api/v1/events/user/${user.id}`).set('Authorization', token);
    expect(res.statusCode).to.equal(200);
    expect(res.body.data).to.be.an('array');
    expect(res.body.data.length).to.not.equal(0);
  });

  it('Leave event should remove a user from an event', async () => {
    res = await request(app).put(`/api/v1/events/leave/${data._id}`).set('Authorization', token);
    expect(res.statusCode).to.equal(200);
    expect((res.body.data.members.map(item => item.id))).not.to.include(user.id);
  });

  it('Should edit event || ONLY the creator of the event can do this', async () => {
    res = await request(app).put(`/api/v1/events/${data._id}`).set('Authorization', token).send({ name: 'Grand Party Alliance' });
    expect(res.statusCode).to.equal(200);
    expect(res.body.data.name).to.equal('Grand Party Alliance');
  });

  it('Should archive an event after it has been done', async () => {
    res = await request(app).delete(`/api/v1/events/${data._id}`).set('Authorization', token);
    expect(res.statusCode).to.equal(200);
    expect(res.body.data.archived).to.equal(true);
  });
});

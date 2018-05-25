import 'babel-polyfill'
import request from 'supertest';
import { expect } from 'chai';
import jwt from 'jsonwebtoken';
import app from '../../../';
import token, { validMedia } from '../helper';
import { decodeToken, decodeKeyTest } from '../../../helpers/keys';

let res;
let otherData;
let data;
let otherToken;

describe('Media Enpoints', () => {
  before(async () => {
    otherToken = await jwt.sign({ role: 5, id: 12, name: 'Baysix' }, decodeKeyTest)
  });

  it('Should successfuly create a gallery', async () => {
    res = await request(app).post('/api/v1/media/').send(validMedia).set('Authorization', otherToken);
    data = res.body.data;
    expect(res.statusCode).to.equal(201);
    expect(res.body.data).to.be.an('object');
    expect(res.body.data).to.have.property('title');
  });

  it('Should get all the galleries', async () => {
    res = await request(app).get('/api/v1/media/').set('Authorization', token);
    expect(res.statusCode).to.equal(200);
    expect(res.body.data).to.be.an('array');
    expect(res.body.data[0]).to.have.property('title');
  });

  it('Should fetch a specific gallery', async () => {
    res = await request(app).get(`/api/v1/media/${data._id}`).set('Authorization', token);
    expect(res.statusCode).to.equal(200);
    expect(res.body.data).to.be.an('object');
    expect(res.body.data._id).to.have.equal(data._id);
  });

  it('Should edit a specific gallery', async () => {
    res = await request(app).put(`/api/v1/media/${data._id}`).set('Authorization', otherToken).send({ title: 'Changed it' })
    expect(res.statusCode).to.equal(200);
    expect(res.body.data.title).to.equal('Changed it');
  });

  it('Should delete a specific gallery', async () => {
    res = await request(app).delete(`/api/v1/media/${data._id}`).set('Authorization', otherToken)
    expect(res.statusCode).to.equal(204);
  });
})

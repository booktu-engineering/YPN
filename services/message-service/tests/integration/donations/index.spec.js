import 'babel-polyfill'
import request from 'supertest';
import { expect } from 'chai';
import jwt from 'jsonwebtoken';
import app from '../../../';
import token, { PartyDonation, CandidateDonation, Donation1 } from '../helper';
import { decodeToken, decodeKeyTest } from '../../../helpers/keys';

let res;
let otherData;
let data;
let otherToken;

describe('Donation Endpoints', () => {
  before(async () => {
    otherToken = await jwt.sign({ id: 15, role: 5, name: 'Baysix Bitiyong' }, decodeKeyTest)
  });

  it('Should create a new Party donation with a target', async () => {
    res = await request(app).post('/api/v1/donations/').set('Authorization', otherToken).send(PartyDonation);
    data = res.body.data;
    expect(res.statusCode).to.equal(201);
    expect(res.body.data).to.be.an('object');
    expect(res.body.data).to.have.property('type');
    expect(res.body.data.type).to.equal(1);
    expect(res.body.data.valid).to.equal(true);
  });

  it('Should create a new candidate donation', async () => {
    res = await request(app).post('/api/v1/donations/').set('Authorization', otherToken).send(CandidateDonation);
    otherData = res.body.data;
    expect(res.statusCode).to.equal(201);
    expect(res.body.data).to.be.an('object');
    expect(res.body.data).to.have.property('type');
    expect(res.body.data.type).to.equal(2);
    expect(res.body.data.valid).to.equal(true);
  });

  it('Should allow a user donate to any of the parties', async () => {
    res = await request(app).put(`/api/v1/donations/donate/${data._id}`).set('Authorization', token).send(Donation1);
    expect(res.statusCode).to.equal(200);
    expect(res.body.data.amount).to.not.equal(0);
    expect(res.body.data.references.length).to.not.equal(0);
  });

  it('Fetch one should get the current amount donated and the references', async () => {
    res = await request(app).get(`/api/v1/donations/${data._id}`).set('Authorization', token);
    expect(res.statusCode).to.equal(200);
    expect(res.body.data.status).to.be.an('object');
    expect(Object.keys(res.body.data).length).to.equal(12);
  });

  it('Delete Should archive a donation - ADMIN ACCESS ONLY', async () => {
    res = await request(app).delete(`/api/v1/donations/${data._id}`).set('Authorization', otherToken);
    expect(res.statusCode).to.equal(200);
    expect(res.body.data.archived).to.equal(true);
  });

});

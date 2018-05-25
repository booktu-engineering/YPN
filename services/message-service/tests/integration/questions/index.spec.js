import 'babel-polyfill'
import jwt from 'jsonwebtoken'
import request from 'supertest';
import { expect } from 'chai';
import app from '../../../';
import token, { validPoll, validElection, ElectionResponse1, ElectionResponse2 } from '../helper';
import {  decodeKeyTest } from '../../../helpers/keys';

let res;
let data;
let validToken;

describe('Questions EndPoints', () => {

  before(async () => {
    validToken = await jwt.sign({ id: 2, role: 5, name: 'Hasstrup Ezekiel' }, decodeKeyTest);
  });
  describe('Polls Endpoints', () => {
    it('Should create a a poll with admin access only', async () => {
      res = await request(app).post('/api/v1/questions/?type=1').set('Authorization', validToken).send(validPoll);
      data = res.body.data;
      expect(res.statusCode).to.equal(201);
      expect(res.body.data.meta.type).to.equal('Opinion');
      expect(res.body.data.type).to.equal(1);
    });

    it('Should respond to a valid question', async () => {
      res = await request(app).put('/api/v1/questions/respond').send({ id: data._id, responses: [{ 0: 'Business' }] }).set('Authorization', token);
      expect(res.statusCode).to.equal(200);
      expect(res.body.data.options['0'].Business).to.equal(1);
    });

    it('Fetch results should fetch the results of a poll', async () => {
      res = await request(app).get(`/api/v1/questions/results/${data._id}`).set('Authorization', token);
      expect(res.statusCode).to.equal(200);
      expect(res.body.data['0'].answers.Business).to.equal(1);
    });

    it('Archiving a post should archive this subject poll', async () => {
      res = await request(app).delete(`/api/v1/questions/${data._id}`).set('Authorization', validToken);
      expect(res.statusCode).to.equal(200);
      expect(res.body.data.archived).to.equal(true);
    });
  });

  describe('Election Testing Endpoints', async () => {

    it('Should create a a poll with admin access only', async () => {
      res = await request(app).post('/api/v1/questions/?type=2').set('Authorization', validToken).send(validElection);
      data = res.body.data;
      expect(res.statusCode).to.equal(201);
      expect(res.body.data.meta.type).to.equal('Party');
      expect(res.body.data.type).to.equal(2);
    });

    it('Should respond to the user', async () => {
      res = await request(app).put('/api/v1/questions/respond').set('Authorization', token).send({ id: data._id, ...ElectionResponse1})
      expect(res.statusCode).to.equal(200);
      expect(res.body.data.responses.length).to.not.equal(0);
    });

    it('Should respond to the user', async () => {
      res = await request(app).put('/api/v1/questions/respond').set('Authorization', validToken).send({ id: data._id, ...ElectionResponse2})
      expect(res.statusCode).to.equal(200);
      expect(res.body.data.responses.length).to.not.equal(1);
    });

    it('Fetch results of an election should show the results of an election', async () => {
      res = await request(app).get(`/api/v1/questions/results/${data._id}`).set('Authorization', token);
      expect(res.statusCode).to.equal(200);
      expect(res.body.data['0'].response.length).to.not.equal(1)
    });
  })

})

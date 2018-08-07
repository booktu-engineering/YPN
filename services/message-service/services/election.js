import Question from '../models/question';
import BaseService from './base';

let data;
let responses;

/* eslint no-underscore-dangle: 0, max-len: 0 */
class QuestionServiceBase extends BaseService {
  // rewrite create function
  createSync = async (body) => {
    // this.__sanitizeInput(body);
    let obj = { questions: {}, options: {}, responses: [] };
    obj.title = body.title;
    // assuming the questions look like this { name: 'Ati', questions: [{question: 'nfnkfn', options: [okd, onn]}]}
    body.questions.forEach((object, index) => {
      const ref = {};
      obj.questions[`${index}`] = object.question;
      object.options.forEach((q) => {
        ref[`${q}`] = 0;
      });
      obj.options[`${index}`] = ref;
    });
    obj = { ...body, ...obj }
    data = await  this.create(obj);
    return data;
  }
  
  filterResponses = (data, user) => {
    const filterX = data.responses.filter(item => item.user.id === user.id)
    if(filterX.length) return false;
    return true;
  }

  respond = async (response) => {
    data = await this.model.findById(response.id);
    if (data && response.responses && response.responses.constructor === Array) {
      if(!this.filterResponses(data, response.user)) return this.__unprocessableEntity("Looks like you've voted earlier")
      const { options } = data
      response.responses.forEach((item) => {
        const opt = Object.entries(item)[0];
        if (Object.keys(data.options[`${opt[0]}`]).includes(`${opt[1]}`)) {
          data.options[`${opt[0]}`][`${opt[1]}`] += 1;
        }
      });
      const userResponse = {};
      const ref = {};
      userResponse.user = response.user;
      userResponse.reasons = [];
      if (response.reasons && ((typeof response.reasons) === 'object')) {
        Object.keys(response.reasons).forEach((key, index) => {
          ref[`${key}`] = Object.values(response.reasons)[`${index}`];
        });
        userResponse.reasons.push(ref);
        data.responses.push(userResponse);
      }
      const dataX = await this.model.findByIdAndUpdate(data._id, { $set: { options: data.options, responses: data.responses } });
      return data;
    }
    this.__notFoundError();
  }



  fetchResults = async (key, value) => {
    data = await this.fetchOne(key, value);
    if (data) {
      const results = {};
      Object.values(data.questions).forEach((item, index) => {
        results[`${index}`] = { question: item, answers: data.options[`${index}`] };
        if (data.responses.length > 0) {
          const response = data.responses.map((res) => {
            if (res.reasons[0][`${index}`]) {
              const dt = {};
              dt.user = res.user;
              dt.reason = res.reasons[0][`${index}`];
              return dt;
            }}).filter(item => item);
          results[`${index}`].response = response;
        }
      });
      return results;
    }
    this.__notFoundError();
  }
}


const QuestionService = new QuestionServiceBase(Question);

export default QuestionService

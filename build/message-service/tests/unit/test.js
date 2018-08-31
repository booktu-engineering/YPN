'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var testSurvey = exports.testSurvey = {
  title: 'Why do you like going out',
  type: 3,
  questions: [{
    question: 'How many times do you sleep a day?',
    options: ['1', '2', '3', '4', '5']
  }, {
    question: 'How often do you brush your mouth',
    options: ['Almost never', 'twice', 'thrice', '4']
  }, {
    question: 'Do you think burna boy is overrated',
    options: ['Might be', 'Absolutely not', 'Well, I dont care', 'Yes, very very']
  }]
};

var voteResponses = exports.voteResponses = [{
  user: {
    name: 'Jermaine cole',
    id: 12
  },
  responses: [{
    0: '2'
  }, {
    1: 'twice'
  }, {
    2: 'Absolutely not'
  }],
  reasons: {
    0: 'well I really love sleeping',
    1: 'I stan a non conformist king Lmao',
    2: 'Burna boy is the greatest nigerian artist'
  }
}, {
  user: {
    name: 'Emmanuel Meforibe',
    id: 13
  },
  responses: [{
    0: '1'
  }, {
    1: 'Almost never'
  }, {
    2: 'Absolutely not'
  }],
  reasons: {
    0: 'Sleep as they say, is for the weak',
    1: 'Bro, you dont want to hear me talk'
  }
}, {
  user: {
    name: 'Anto Munirat',
    id: 14
  },
  responses: [{
    0: '2'
  }, {
    1: 'thrice'
  }, {
    2: 'Absolutely not'
  }],
  reasons: {
    0: 'Men there isnt much I can do you know',
    1: 'I stan a non conformist king Lmao',
    2: 'Burna boy is the greatest nigerian artist'
  }
}, {
  user: {
    name: 'Ezekiel Hasstrup',
    id: 15
  },
  responses: [{
    0: '3'
  }, {
    1: '4'
  }, {
    2: 'Yes, very very'
  }],
  reasons: {
    0: 'well I really really  love sleeping',
    1: 'Gotta stay fresh on my level',
    2: 'I mean, he aight tho bet'
  }
}, {
  user: {
    name: 'Goodluck Benard',
    id: 14
  },
  responses: [{
    0: '2'
  }, {
    1: 'thrice'
  }, {
    2: 'Absolutely not'
  }],
  reasons: {
    0: 'Lol look at that',
    1: 'No valid reason and thats okay',
    2: 'Burna boy is the greatest nigerian artist, I believe'
  }
}];

var testElection = exports.testElection = {
  title: 'General Election',
  type: 1,
  questions: [{
    question: 'General Chairman',
    options: ['Emmanuel Chandler', 'Baysix Bitiyong', 'Baysix yet again']
  }, {
    question: 'Office Secretary',
    options: ['Emmanuel Etim Inyang ', 'David Beckcham']
  }]
};
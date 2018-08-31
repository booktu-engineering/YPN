'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var testtoken = 'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MTg0Nywicm9sZSI6MSwidXNlcm5hbWUiOiJIYXNzdHJ1cGV6ZWtpZWwiLCJsYXN0bmFtZSI6bnVsbCwiZW1haWwiOiJPbm9zZXRhbGUzMkBnbWFpbC5jb20iLCJmaXJzdG5hbWUiOm51bGwsIm50X3Rva2VuIjoiZXlKaGJHY2lPaUpJVXpJMU5pSjkuVzEwLjRNY01sLUtwVXVqandialk5STBXYVUta2g3cXlBN0ZDdVh3NERtSlZGOGcifQ.nbfD4pTbXQP6p9-JEHkeKkvmuPnOa1zfix3V4-QBqBI';
var nt_token = exports.nt_token = 'eyJhbGciOiJIUzI1NiJ9.eyJub3RpZmljYXRpb25zIjpbXX0.WEkYvEtxW5GXGby8O5-zMcqSDdMx9tFn5gCTXAa7KI8';
var validPost = exports.validPost = {
  content: 'Hello there this is pretty nice post',
  type: 0
};

var validEvent = exports.validEvent = {
  name: 'General Party Get Together',
  startDate: Date.now(),
  endDate: Date.now(),
  details: {
    location: 'Surulere, ',
    dressCode: 'Black and white',
    rsvp: 'Call 08171708574'
  }
};

var validConversation = exports.validConversation = {
  members: [{ id: 12, name: 'Hasstrup Ezekiel' }, { id: 13, name: 'Tope Ukay' }]
};

var validTownHall = exports.validTownHall = {
  startDate: Date.now(),
  endDate: Date.now(),
  members: [{ id: 12 }],
  focus: {
    name: 'Baysix biti',
    meta: {
      office: 'Vice President Candidate'
    }
  },
  details: {
    inclusion: {
      name: 'BaysixBitiyong'
    }
  }
};

var invalidTownHall = exports.invalidTownHall = {
  name: 'Invalid Conversation'
};

var messages = exports.messages = {
  group: [{
    content: 'I generally think things could be a bit better if you think it through',
    type: 2,
    origin: {
      id: 15,
      name: 'Ezekiel Hasstrup',
      username: 'hasstrupezekiel'
    }
  }, {
    content: 'Well maybe not exactly sha @hasstrupezekiel',
    type: 2,
    origin: {
      id: 15,
      name: 'Chisom Ekwuribe',
      username: 'chisomekwuribe'
    }
  }]
};

var validPoll = exports.validPoll = {
  title: 'This is a test Poll',
  questions: [{ question: 'Which issue is the most pressing', options: ['Education', 'Business', 'Princess Diana', 'Good light'] }],
  meta: {
    type: 'Opinion'
  }
};

var validElection = exports.validElection = {

  title: 'Party Elections',
  questions: [{
    question: 'Vice President',
    options: ['Hasstrup Ezekiel', 'Tunde Ednut', 'Chisom Daniel']
  }, {
    question: 'President',
    options: ['Emeka Stanley', 'Toyin Toyin', 'DareDevil Ramsey']
  }, {
    question: 'Party Chairman',
    options: ['Kingsley Badman', 'Seni Suleyman', 'We Move']
  }, {
    question: 'Party Secretary',
    options: ['Baysix', 'Skidaddle Daddy', 'Seni Suleyman']
  }, {
    question: 'Party PRO',
    options: ['Major Famous Baba', 'Seni Suleyman', 'David Lanre Messan', 'C Edwin']
  }],
  meta: {
    type: 'Party'
  }
};

var ElectionResponse1 = exports.ElectionResponse1 = {
  responses: [{
    0: 'Hasstrup Ezekiel'
  }, {
    1: 'Emeka Stanley'
  }, {
    2: 'Seni Suleyman'
  }, {
    3: 'Skidaddle Daddy'
  }, {
    4: 'C Edwin'
  }],
  reasons: [{
    0: 'Hasstrup is actually amazing'
  }, {
    1: 'Emeka Stanley is the best guy I ever saw'
  }, {
    2: 'Seni Suleyman is obviously the best'
  }, {
    3: 'Skidaddle Daddy my daddy daddy'
  }, {
    4: 'Lmao this man and his fresh range'
  }]
};

var ElectionResponse2 = exports.ElectionResponse2 = {
  responses: [{
    0: 'Chisom Daniel'
  }, {
    1: 'Emeka Stanley'
  }, {
    2: 'We Move'
  }, {
    3: 'Baysix'
  }, {
    4: 'C Edwin'
  }],
  reasons: [{
    0: 'Chisom seems like a nice chap'
  }, {
    1: 'Emeka Stanley has a strong vision for the association, I stan'
  }, {
    2: 'We Move for life!!!!'
  }, {
    3: 'Baysix has a nice vision, You understand now?'
  }, {
    4: 'Looool this guy and his crazy range'
  }]

  // export const PartyDonation = {
  //   target: 500000,
  //   startDate: Date.now(),
  //   description: 'I thought it will be nice to make a few good donations',
  //   type: 1,
  //   title: 'Donation for the IJAROGBE Constituency',
  // }

};var PartyDonation = exports.PartyDonation = {
  target: 500000,
  description: 'I thought it will be nice to make a few good donations',
  type: 1,
  title: 'Donation for the IJAROGBE Constituency',
  meta: {
    type: 3,
    location: 'Ijarogbe'
  }
};

var CandidateDonation = exports.CandidateDonation = {
  target: 500000,
  startDate: Date.now(),
  endDate: Date.now(),
  description: 'Help me win the presidency in this state',
  type: 2,
  title: 'Donation for Ayotunde Campaign',
  meta: {
    user: {
      name: 'Hasstrup Ezekiel',
      post: 'Ekiti State Vice President',
      id: 1
    }
  }
};

var Donation1 = exports.Donation1 = {
  amount: 50000,
  referenceID: '12345XXX12344',
  date: Date.now()
};

var validMedia = exports.validMedia = {
  title: 'Party\'s 15 year birthday',
  description: 'Here are some pictures from our third year anniversary',
  images: ['test.jpg', 'another-test.jpg']
};
exports.default = testtoken;
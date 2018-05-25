const testtoken = 'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MTg0Nywicm9sZSI6MSwidXNlcm5hbWUiOiJIYXNzdHJ1cGV6ZWtpZWwiLCJsYXN0bmFtZSI6bnVsbCwiZW1haWwiOiJPbm9zZXRhbGUzMkBnbWFpbC5jb20iLCJmaXJzdG5hbWUiOm51bGwsIm50X3Rva2VuIjoiZXlKaGJHY2lPaUpJVXpJMU5pSjkuVzEwLjRNY01sLUtwVXVqandialk5STBXYVUta2g3cXlBN0ZDdVh3NERtSlZGOGcifQ.nbfD4pTbXQP6p9-JEHkeKkvmuPnOa1zfix3V4-QBqBI'

export const validPost = {
  content: 'Hello there this is pretty nice post',
  type: 0
}

export const validEvent = {
  name: 'General Party Get Together',
  startDate: Date.now(),
  endDate: Date.now(),
  details: {
    location: 'Surulere, ',
    dressCode: 'Black and white',
    rsvp: 'Call 08171708574',
  }
}

export const validConversation = {
  members: [{ id: 12, name: 'Hasstrup Ezekiel' }, { id: 13, name: 'Tope Ukay' }]
}

export const validTownHall = {
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
}

export const invalidTownHall = {
  name: 'Invalid Conversation'
}

export const messages = {
  group: [
    {
      content: 'I generally think things could be a bit better if you think it through',
      type: 2,
      origin: {
        id: 15,
        name: 'Ezekiel Hasstrup',
        username: 'hasstrupezekiel'
      }
    },
    {
      content: 'Well maybe not exactly sha @hasstrupezekiel',
      type: 2,
      origin: {
        id: 15,
        name: 'Chisom Ekwuribe',
        username: 'chisomekwuribe'
      }
    }
  ]
}

export const validPoll = {
  title: 'This is a test Poll',
  questions: [{ question: 'Which issue is the most pressing', options: [ 'Education', 'Business', 'Princess Diana', 'Good light'] }],
  meta: {
    type: 'Opinion'
  }
}

export const validElection = {

  title: 'Party Elections',
  questions: [
    {
      question: 'Vice President',
      options: ['Hasstrup Ezekiel', 'Tunde Ednut', 'Chisom Daniel']
    },
    {
      question: 'President',
      options: ['Emeka Stanley', 'Toyin Toyin', 'DareDevil Ramsey']
    },
    {
      question: 'Party Chairman',
      options: ['Kingsley Badman', 'Seni Suleyman', 'We Move']
    },
    {
      question: 'Party Secretary',
      options: ['Baysix', 'Skidaddle Daddy', 'Seni Suleyman']
    },
    {
      question: 'Party PRO',
      options: ['Major Famous Baba', 'Seni Suleyman', 'David Lanre Messan', 'C Edwin']
    }
  ],
  meta: {
    type: 'Party'
  }
}

export const ElectionResponse1 = {
  responses: [
    {
      0: 'Hasstrup Ezekiel'
    },
    {
      1: 'Emeka Stanley'
    },
    {
      2: 'Seni Suleyman'
    },
    {
      3: 'Skidaddle Daddy'
    },
    {
      4: 'C Edwin'
    }
  ],
  reasons: [
    {
      0: 'Hasstrup is actually amazing'
    },
    {
      1: 'Emeka Stanley is the best guy I ever saw'
    },
    {
      2: 'Seni Suleyman is obviously the best'
    },
    {
      3: 'Skidaddle Daddy my daddy daddy'
    },
    {
      4: 'Lmao this man and his fresh range'
    }
  ]
};

export const ElectionResponse2 = {
  responses: [
    {
      0: 'Chisom Daniel'
    },
    {
      1: 'Emeka Stanley'
    },
    {
      2: 'We Move'
    },
    {
      3: 'Baysix'
    },
    {
      4: 'C Edwin'
    }
  ],
  reasons: [
    {
      0: 'Chisom seems like a nice chap'
    },
    {
      1: 'Emeka Stanley has a strong vision for the association, I stan'
    },
    {
      2: 'We Move for life!!!!'
    },
    {
      3: 'Baysix has a nice vision, You understand now?'
    },
    {
      4: 'Looool this guy and his crazy range'
    }
  ]
}

// export const PartyDonation = {
//   target: 500000,
//   startDate: Date.now(),
//   description: 'I thought it will be nice to make a few good donations',
//   type: 1,
//   title: 'Donation for the IJAROGBE Constituency',
// }

export const PartyDonation = {
  target: 500000,
  description: 'I thought it will be nice to make a few good donations',
  type: 1,
  title: 'Donation for the IJAROGBE Constituency',
  meta: {
    type: 3,
    location: 'Ijarogbe'
  }
}

export const CandidateDonation = {
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
}

export const Donation1 = {
  amount: 50000,
  referenceID: '12345XXX12344',
  date: Date.now()
}
export default testtoken

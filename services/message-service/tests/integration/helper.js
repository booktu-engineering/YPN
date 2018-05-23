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
    rsvp: 'Call 08171708574'
  }
}
export default testtoken

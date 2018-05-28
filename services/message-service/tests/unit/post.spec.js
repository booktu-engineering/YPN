import 'babel-polyfill'
import { expect } from 'chai'
import PostService from '../../services/post-service';
import token, { nt_token } from '../integration/helper';

let data;
let mock;
let status;
/* eslint object-curly-newline: 0, no-unused-expressions: 0, prefer-destructuring: 0 */
describe('Post Services', () => {
  it('Create should create a new post', async () => {
    mock = { content: 'This is a test content', origin: { id: 1880, email: 'hasstrup.ezekiel@gmail.com', username: 'HasstrupEzejiek', nt_token }, type: 2, destination: null };
    mock = await PostService.create(mock, token);
    expect(mock.origin.id).to.equal(1880);
  });


  it('Fetch one should get the post queried for', async () => {
    data = await PostService.fetchOne('content', 'This is a test content');
    expect(data).to.exist;
    expect(data.origin.id).to.equal(1880);
  });

  it('Fetch All should get all the posts queried for', async () => {
    data = await PostService.fetchAll();
    expect(data).to.exist;
    expect(data).to.be.an('array');
  });

  it('Update one should only update the content of the db', async () => {
    data = data[0];
    data = await PostService.updateOne('_id', data.id, { content: 'I have now changed the content of the post', id: 4 });
    expect(data.content).to.equal('I have now changed the content of the post');
    expect(data).to.exist;
  });

  it('Liking a post should allow a user like a post', async () => {
    data = await PostService.like('_id', mock._id, { id: 7, name: 'Onosetale32', avatar: 'blam', username: 'Baysixagain', email: 'hasstrup.ezekiel@gmail.com', nt_token }, 0);
    expect(data.likes.count).to.equal(1);
    expect(data.likes.data[0].id).to.equal(7);
  });

  it('Unliking a post should let a user unlike a post', async () => {
    data = await PostService.like('_id', mock._id, { id: 7, name: 'Onosetale32', avatar: 'blam', username: 'Baysix', email: 'hasstrup.ezekiel@gmail.com', nt_token }, 1);
    expect(data.likes.count).to.equal(0);
    expect(data.likes.data.length).to.equal(0);
  });

  it('Fetching the comments of a post', async () => {
    const otherData = await PostService.create( { content: 'This is a another test content', origin: { id: 19, username: 'Baysix-biti', nt_token  }, type: 2, destination: null, referenceID: data._id, referenceObject: data })
    const comments = await PostService.fetchComments(data);
    expect(comments).to.be.an('array');
    expect(comments[0].origin.id).to.equal(19);
  });



  it('Delete one should delete the message', async () => {
    status = await PostService.deleteOne('_id', data.id);
    expect(status).to.be.true;
  });

  it('Should examine for mentions should return the users mentioned in a comment', async () => {
    data = await PostService.__examineForMentions({ content: 'Hasstrup is a pretty great guy @Hasstrupezekiel @Edgar Bahringer', _id: data._id, origin: { name: 'Hasstrup Ezekiel', username: 'BaysixBiti' } }, token)
  })
});

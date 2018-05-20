import 'babel-polyfill'
import { expect } from 'chai'
import PostService from '../../services/post-service';

let data;
let mock;
let status;
/* eslint object-curly-newline: 0, no-unused-expressions: 0, prefer-destructuring: 0 */
describe('Post Services', () => {
  it('Create should create a new post', async () => {
    mock = { content: 'This is a test content', origin: { id: 19 }, type: 2, destination: null };
    data = await PostService.create(mock);
    expect(data.origin.id).to.equal(19);
  });


  it('Fetch one should get the post queried for', async () => {
    data = await PostService.fetchOne('content', 'This is a test content');
    expect(data).to.exist;
    expect(data.origin.id).to.equal(19);
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

  it('Delete one should delete the message', async () => {
    status = await PostService.deleteOne('_id', data.id);
    expect(status).to.be.true;
  });
});

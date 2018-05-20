import { expect } from 'chai';
import DonationService from '../../services/donation';

let data;
let mock;

/* eslint object-curly-newline: 0*/
describe('Donation Service', () => {
  before(async () => {
    mock = {
      target: 300000,
      startDate: Date.now(),
      endDate: Date.now(),
      description: 'This is the beginning of donation',
      title: 'Donation for Campaign',
      origin: {
        name: 'Hasstrup Ezekiel',
        role: 2,
        avatar: 'String',
        id: 1
      }
    }
    data = await DonationService.create(mock);
  });

  it('Donation should add the donation to the current campaign', async () => {
    mock = { id: data.id, amount: 10000, referenceID: '1233000', date: Date.now(), user: { name: 'Chisom Ekwuribe', id: 2} }
    data = await DonationService.donate(mock);
    expect(data.amount).to.equal(10000);
    expect(data.references.length).to.equal(1);
    expect(data.references[0].user.name).to.equal('Chisom Ekwuribe');
  });

  it('Fetch one should return the status of the current donation', async () => {
    data = await DonationService.fetchOneSync('_id', data._id);
    expect(data.status).to.exist;
    expect(data.status.donors).to.equal(1);
  });

})

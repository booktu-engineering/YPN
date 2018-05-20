import { expect } from 'chai';
import EventService from '../../services/event';

let data;
/* eslint object-curly-newline: 0, no-unused-expressions: 0 */
describe('Event service', () => {
  it('Create service should create an event', async () => {
    data = { startDate: Date.now(), endDate: Date.now(), name: 'Party Meeting', details: { location: 'Surulere Lagos', max: 100 } };
    data = await EventService.create(data);
    expect(data.name).to.equal('Party Meeting');
  });

  it('Join Event should add a user to the members of a group', async () => {
    data = await EventService.participate('_id', data._id, 12);
    expect(data).to.exist;
    expect(data.members).to.include(12);
  });

  it('Leave Event should remove a user from the group', async () => {
    data = await EventService.leave('_id', data._id, 12);
    expect(data).to.exist;
    expect(data.members).to.not.include(12);
  });

});

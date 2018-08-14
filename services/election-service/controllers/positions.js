import jwt from 'jsonwebtoken';
import Position from '../models/positions';

const KEY = '6df7e61ce8cfc31f2c4f000fa5fcf7c0fb4c2395ea10818e2eb5e94efd008b022bae771d8fa30a4dc37dd06ed851554b5aa40e7b40dfb39acbc7a4282520c20a';

const createNewPosition = async (req, res) => {
  try {
    // there has to be a name and the required fields
    if (req.user.role < 3) return res.status(401).json({ message: 'You need to be an ad min for these privileges' });
    if (!req.body.name || !req.body.type) return res.status(400).json({ message: 'Please pass in the name and the type of the position' });
    req.body.origin = req.user;
    const position = await Position.create(req.body);
    res.status(201).json({ data: position });
  } catch (err) {
    console.log(err);
    res.json({ message: 'Something went wrong processing your request' });
  }
};

const fetchAllPositions = async (_, res) => {
  const data = await Position.find({ archived: false });
  res.status(200).json({ data });
};

const fetchSinglePosition = async (req, res) => {
  try {
    const data = await Position.find({ _id: req.query.id });
    if (data) return res.status(200).json({ data });
    return res.status(422).json({ message: 'Sorry we could not find that resource' });
  } catch (err) {
    console.log(err);
    res.status(422).json({ message: 'Something went wrong processing your request' });
  }
};

const DeletePosition = async (req, res) => {
  try {
    if (req.user.role < 3) return res.status(403).json({ message: 'You do not have permission to do this' });
    const data = await Position.findOneAndUpdate({ _id: req.query.id }, { $set: { archived: true } });
    return res.status(200).json({ message: 'successfully changed', data });
  } catch (err) {
    res.status(422).json({ message: 'Something went wrong processing your request' });
  }
};


const ApplyForPosition = async (req, res) => {
  try {
    const data = await Position.findOne({ _id: req.params.id });
    if (!data) return res.status(403).json({ message: 'Sorry there is no open position like that ' });
    const { applicants } = data;
    if (applicants.map(item => item.id).includes(req.user.id)) return res.status(409).json({});
    const newApplication = {
      ...req.user,
      ...req.body,
      sponsored: false,
      confirmed: false
    };
    const application = [...applicants, newApplication];
    await Position.findOneAndUpdate({ _id: req.params.id }, { $set: { applicants: application } });
    return res.status(200).json({ message: 'Done' });
  } catch (err) {
    res.status(422).json({ message: 'Something went wrong processing your request' });
  }
};

const changeStatusOfApplication = async (req, res) => {
  try {
    if (req.user.role < 3) return res.status(403).json({ message: 'You need to be an admin to do this' });
    const data = await Position.findOne({ _id: req.params.id });
    if (!data) return res.status(400).json({ message: 'Sorry we couldnt find the position matching that criteria' });
    const { applicants } = data;
    const index = applicants.map(item => item.id).indexOf(parseInt(req.query.user));
    if (index < 0) return res.status(403).json({ message: 'That user is not candidtate' });
    applicants[index] = { ...applicants[index], ...req.body };
    const newApplicants = applicants;
    const position = await Position.findOneAndUpdate({ _id: req.params.id }, { $set: { applicants: newApplicants } }, { new: true });
    res.status(200).json({ message: 'Nicely done', position });
  } catch (err) {
    res.status(422).json({ message: 'Something went wrong processing your request' });
  }
};


const fetchAllCandidates = async (req, res) => {
  try {
    const data = await Position.find({ archived: false });
    const dictionary = data.reduce((a, b) => {
      a[`${b._id}`] = b.applicants;
      return a;
    }, {});
    // sponsored
    const target = data.reduce((a, b) => {
      a = [...a, ...b.applicants];
      return a;
    }, []);
    return res.status(200).json({
      data,
      dictionary,
      sponsored: target.filter(candidate => candidate.sponsored),
      aspirants: target.filter(candidate => candidate.confirmed)
    });
  } catch (err) {
    res.status(422).json({ message: 'Something went wrong processing your request' });
  }
};


const ensureUsers = (req, res, next) => {
  try {
    if (!req.headers.authorization) return res.status(403).json({ message: 'You need to be authorized to access this route' });
    req.user = jwt.verify(req.headers.authorization, KEY);
    next();
  } catch (err) {
    res.status(422).json({ message: 'Something went wrong' });
  }
};

const partyMembersOnly = (req, res, next) => {
  try {
    if (req.user.role < 1) return res.status(401).json({ message: 'You need to be a party member to this' });
    next();
  } catch (err) {
    res.status(400).json({ message: 'Something went wrong processing this' });
  }
};


const fetchExcos = async (req, res, next) => {
  try {
    const data = await Position.findOne({ name: 'Excos' });
    res.status(200).json({ data });
  } catch (err) {
    res.status(400).json({ message: 'Something went wrong processing your request' });
  }
};

const changeExco = async (req, res) => {
  try {
    if (req.user.role < 3) return res.status(401).json({ message: 'You do not have permission to do that' });
    let data = await Position.findOne({ name: 'Excos' });
    const { meta } = data;
    const newMeta = { ...meta, ...req.body };
    data = await Position.findOneAndUpdate({ name: 'Excos' }, { $set: { meta: newMeta } }, { new: true });
    res.status(200).json({ data });
  } catch (err) {
    res.status(400).json({ message: 'Something went wrong processing your request' });
  }
};

export {
  ensureUsers,
  createNewPosition,
  partyMembersOnly,
  fetchAllPositions,
  fetchSinglePosition,
  DeletePosition,
  ApplyForPosition,
  changeStatusOfApplication,
  fetchAllCandidates,
  fetchExcos,
  changeExco

};

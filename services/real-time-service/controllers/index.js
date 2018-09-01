import jwt from 'jsonwebtoken';
import NotificationInteractor from '../interactors/notifications';
import PlayersModel from '../models';

let status;
let message;


export const ErrorHandlerController = (req, res, next, err) => {
  status = err.status ? err.status : 500;
  message = err.message ? err.message : 'Something went wrong please try again';
  res.status(status).json({ message });
};

const NotificationHandler = (req, res, next) => {
  try {
    NotificationInteractor.interact(req.body);
    res.status(200).json({ ok: true });
  } catch (e) {
    console.log(e); 
    next(e);
  }
};

export const HandleDecode = (req, res, next) => {
  try {
    const data = NotificationInteractor.fetchAllNotifications(req.params.userId);
    res.status(200).json({ ok: true, data });
  } catch (e) {
    next(e);
  }
};

export const RegisterPlayer = async (req, res) => {
  try {
    if (!req.headers.authorization) return res.status(401).json({ message: 'Needs to have the token' });
    const user = jwt.verify(req.headers.authorization, '6df7e61ce8cfc31f2c4f000fa5fcf7c0fb4c2395ea10818e2eb5e94efd008b022bae771d8fa30a4dc37dd06ed851554b5aa40e7b40dfb39acbc7a4282520c20a');
    const player = await PlayersModel.findOne({ userId: user.id });
    if (player) {
      player.playerId = req.body.playerId;
      player.save();
      return res.status(200).json({ message: 'Done', playerId: req.body.playerId });
    }
    await PlayersModel.create({ userId: user.id, playerId: req.body.playerId });
    return res.status(201).json({ message: 'Done', playerId: req.body.playerId });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Something went wrong' });
  }
};

export default NotificationHandler;

import NotificationInteractor from '../interactors/notifications';

let status;
let message;


export const ErrorHandlerController = (req, res, next, err) => {
  status = err.status ? err.status : 500;
  message = err.message ? err.message : 'Something went wrong please try again';
  res.status(status).json({ message });
}

const NotificationHandler = (req, res, next) => {
  try {
    NotificationInteractor.interact(req.body)
    res.status(200).json({ ok: true })
  } catch (e) {
    console.log(e);
    next(e)
}
}

export default NotificationHandler

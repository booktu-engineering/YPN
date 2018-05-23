
/* eslint no-shadow: 0, no-underscore-dangle: 0, radix: 0 */
let data;
class BaseController {
  constructor(service) {
    this.service = service;
  }
  __wrapInTryCatch = async (func, next) => {
    try {
      return await func();
    } catch (e) {
      e.status = e.status ? e.status : 400;
      e.message = e.message ? e.message : 'Something went wrong trying to process this request';
      next(e);
    }
  }

  __responseOkay = (res, data) => {
    res.status(200).json({ data });
  }

  __resourceCreated = (res, data) => {
    res.status(201).json({ data });
  }

  __successfulDelete = res => res.status(204).json({ message: 'Successfully deleted' })


   create = (req, res, next) => {
     this.__wrapInTryCatch(async () => {
       data = await this.service.create(req.body);
       this.__resourceCreated(res, data);
     }, next);
   }

   fetchOne = (req, res, next) => {
     this.__wrapInTryCatch(async () => {
       data = await this.service.fetchOne('_id', req.params.id);
       this.__responseOkay(res, data);
     }, next);
   };

     updateOne = (req, res, next) => {
       this.__wrapInTryCatch(async () => {
         data = await this.service.updateOne('_id', req.params.id, req.body);
         this.__responseOkay(res, data);
       }, next);
     };

     fetchAll = (req, res, next) => {
       this.__wrapInTryCatch(async () => {
         data = await this.service.fetchAll();
         this.__responseOkay(res, data);
       }, next);
     }

     deleteOne = (req, res, next) => {
       this.__wrapInTryCatch(async () => {
         data = await this.service.deleteOne('_id', req.params.id);
         this.__successfulDelete(res);
       }, next);
     }

     participate = (req, res, next) => {
       this.__wrapInTryCatch(async () => {
         data = await this.service.participate('_id', req.params.id, req.user);
         this.__responseOkay(res, data);
       }, next);
     }

     leave = (req, res, next) => {
       this.__wrapInTryCatch(async () => {
         data = await this.service.leave('_id', req.params.id, req.user);
         this.__responseOkay(res, data)
       }, next);
     }
}

export default BaseController;

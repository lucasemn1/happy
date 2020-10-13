import { NextFunction, Request, Response } from 'express';
import * as Yup from 'yup';

export default {
  async store(req: Request, res: Response, next: NextFunction) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.string().required(),
      files: Yup.array(
        Yup.object().shape({
          filename: Yup.string().required(),
        }),
      ),
    });

    await schema.validate(req.body, { abortEarly: false });

    next();
  }
}
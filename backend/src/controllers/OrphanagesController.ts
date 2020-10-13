
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Image from '../models/Image';
import Orphanage from '../models/Orphanage';
import * as Yup from 'yup';

export default {
  async store(req: Request, res: Response) {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends
    }: {
      name: string,
      latitude: number,
      longitude: number,
      about: string,
      instructions: string,
      opening_hours: string,
      open_on_weekends: boolean,
    } = req.body;
    const files = req.files as Express.Multer.File[];

    const orphanageRepository = getRepository(Orphanage);

    const orphanage = orphanageRepository.create({
      name,
      latitude,
      longitude,
      about,
      instructions,
      open_on_weekends,
      opening_hours,
      images: files.map(image => new Image(image.filename)),
    })

    const result = await orphanageRepository.save(orphanage);

    return res.status(201).json(result);
  },

  async index(req: Request, res: Response) {
    const orphanageRepository = getRepository(Orphanage);

    let orphanages = await orphanageRepository.find({ relations: ['images'] });
    orphanages = orphanages.map(orphanage => {
        orphanage.images = orphanage.images.map(image => {
          image.name = `http://localhost:3333/uploads/${image.name}`;

          return image;
        });

        return orphanage;
      });

    return res.status(200).json(orphanages);
  },

  async show(req: Request, res: Response) {
    const orphanageRepository = getRepository(Orphanage);

    const id = Number(req.params.id);

    orphanageRepository
      .findOneOrFail({ id })
      .then(orphanage => res.status(200).json(orphanage))
      .catch(err => res.status(500).json(err));
  },
}
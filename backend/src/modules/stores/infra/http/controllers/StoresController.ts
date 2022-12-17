import CreateStoreService from '@modules/stores/services/CreateStoreService';
import DeleteStoreService from '@modules/stores/services/DeleteStoreService';
import UpdateStoreService from '@modules/stores/services/UpdateStoreService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class StoresController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      name,
      description,
      phone_number,
      open_hour,
      close_hour,
      contract_type,
    } = req.body;

    const { id: id_admin } = req.user;

    const [banner_image, profile_image] = req.files
      ? (req.files as Express.Multer.File[])
      : ['', ''];

    const createStore = container.resolve(CreateStoreService);

    const store = await createStore.execute({
      name,
      description,
      phone_number,
      open_hour,
      close_hour,
      contract_type,
      id_admin,
      filename_banner_image: banner_image.filename,
      filename_profile_image: profile_image.filename,
    });

    delete store.id;

    return res.status(201).json(store);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { description, phone_number, open_hour, close_hour, contract_type } =
      req.body;
    const { id: id_admin } = req.user;

    const updateStore = container.resolve(UpdateStoreService);

    const store = await updateStore.execute({
      description,
      phone_number,
      open_hour,
      close_hour,
      contract_type,
      id_admin,
    });

    return res.status(200).json(store);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id: id_admin } = req.user;

    const deleteUser = container.resolve(DeleteStoreService);

    await deleteUser.execute({
      id_admin,
    });

    return res.status(204).json();
  }
}

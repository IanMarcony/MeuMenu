import UpdateStatusStoreService from '@modules/stores/services/UpdateStatusStore';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class StatusStoreController {
  public async update(req: Request, res: Response): Promise<Response> {
    const { status, id_store } = req.body;
    const { id: id_admin } = req.user;

    const updateStatusStore = container.resolve(UpdateStatusStoreService);

    const store = await updateStatusStore.execute({
      id_store,
      status,
      id_admin,
    });

    return res.status(200).json(store);
  }
}

import UpdateProfileAndBannerStoreService from '@modules/stores/services/UpdateProfileAndBannerStore';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ProfileBannerController {
  public async update(req: Request, res: Response): Promise<Response> {
    const { id: id_admin } = req.user;

    const [banner_image, profile_image] = req.files
      ? (req.files as Express.Multer.File[])
      : ['', ''];

    const updateProfileBanneStore = container.resolve(
      UpdateProfileAndBannerStoreService,
    );

    const store = await updateProfileBanneStore.execute({
      filename_banner_image: banner_image.filename,
      filename_profile_image: profile_image.filename,
      id_admin,
    });

    return res.status(200).json(store);
  }
}

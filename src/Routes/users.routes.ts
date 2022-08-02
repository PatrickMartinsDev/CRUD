import { Router } from 'express';
import multer = require('multer');

import uploadConfig from '../dtos/config/upload';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { CreateUserController } from '../accounts/UseCases/createUser/createUserController';
import { UpdateUserAvatarController } from '../accounts/UseCases/updateUserAvatar/UpdateUserAvatarController';

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRoutes.post('/', createUserController.handle)

usersRoutes.patch(
  "/avatar",
  uploadAvatar.single("avatar"),
  ensureAuthenticated,
  updateUserAvatarController.handle);

export { usersRoutes };

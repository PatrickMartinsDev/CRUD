import { Router } from "express";
import { AuthenticateUserController } from "../accounts/UseCases/authenticateUser/AuthenticateUserController";

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();

authenticateRoutes.post("/", authenticateUserController.handle);

export { authenticateRoutes };
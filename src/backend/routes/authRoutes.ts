import express, { Request, Response, NextFunction } from "express";
import AuthController from "../controllers/authController";
import authMiddleware from "../middleware/authMiddleware";

// Define a type for route handler
type RouteHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void | Response>;

// Utility function to wrap async route handlers
const asyncHandler = (fn: RouteHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

const router = express.Router();

router.post(
  "/signup",
  asyncHandler(async (req, res) => {
    await AuthController.signup(req, res);
  })
);

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    await AuthController.login(req, res);
  })
);

router.post(
  "/logout",
  authMiddleware,
  asyncHandler(async (req, res) => {
    await AuthController.logout(req, res);
  })
);

router.get(
  "/me",
  authMiddleware,
  asyncHandler(async (req, res) => {
    await AuthController.getCurrentUser(req, res);
  })
);

export default router;

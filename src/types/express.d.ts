// src/types/express.d.ts
import { User } from "@/backend/models/userModel";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export {};

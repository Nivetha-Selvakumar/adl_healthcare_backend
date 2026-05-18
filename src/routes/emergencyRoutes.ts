import { Router } from "express";
import { getContacts } from "../controllers/emergencyController";

const router = Router();

router.get("/contacts", getContacts);

export default router;

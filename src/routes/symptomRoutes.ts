import { Router } from "express";
import { checkSymptoms } from "../controllers/symptomController";

const router = Router();

router.post("/check", checkSymptoms);

export default router;

import { Router } from "express";
import { listMedicines, addMedicine, updateMedicineStatus, deleteMedicine } from "../controllers/medicineController";

const router = Router();

router.get("/list", listMedicines);
router.post("/add", addMedicine);
router.put("/update/:id", updateMedicineStatus);
router.delete("/delete/:id", deleteMedicine);

export default router;

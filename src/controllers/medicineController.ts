import { Request, Response } from "express";
import Medicine from "../models/Medicine";

export const listMedicines = async (req: Request, res: Response): Promise<void> => {
    try {
        const medicines = await Medicine.findAll();
        res.json(medicines);
    } catch (error) {
        console.error("Error fetching medicines:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const addMedicine = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, dosage, time, status } = req.body;
        
        if (!name || !dosage || !time) {
            res.status(400).json({ error: "Name, dosage, and time are required." });
            return;
        }

        const newMedicine = await Medicine.create({
            name,
            dosage,
            time,
            status: status || "Pending"
        });

        res.status(201).json(newMedicine);
    } catch (error) {
        console.error("Error adding medicine:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const updateMedicineStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!status) {
            res.status(400).json({ error: "Status is required." });
            return;
        }

        const medicine = await Medicine.findByPk(Number(id));

        if (!medicine) {
            res.status(404).json({ error: "Medicine not found." });
            return;
        }

        medicine.status = status;
        await medicine.save();

        res.json({ message: "Medicine status updated successfully", medicine });
    } catch (error) {
        console.error("Error updating medicine status:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const deleteMedicine = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const medicine = await Medicine.findByPk(Number(id));

        if (!medicine) {
            res.status(404).json({ error: "Medicine not found." });
            return;
        }

        await medicine.destroy();
        res.json({ message: "Medicine deleted successfully" });
    } catch (error) {
        console.error("Error deleting medicine:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

import { Request, Response } from "express";
import EmergencyContact from "../models/EmergencyContact";

export const getContacts = async (req: Request, res: Response): Promise<void> => {
    try {
        const contacts = await EmergencyContact.findAll();
        res.json(contacts);
    } catch (error) {
        console.error("Error fetching emergency contacts:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

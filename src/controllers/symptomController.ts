import { Request, Response } from "express";

export const checkSymptoms = async (req: Request, res: Response): Promise<void> => {
    try {
        const { symptoms } = req.body;
        
        if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
            res.status(400).json({ error: "Please provide an array of symptoms." });
            return;
        }

        const symptomsStr = symptoms.map(s => s.toLowerCase()).join(" ");

        let possibleIllness = "General Indisposition";
        let suggestions = ["Rest", "Drink plenty of water", "Monitor symptoms"];

        if (symptomsStr.includes("fever") && symptomsStr.includes("cough")) {
            possibleIllness = "Possible Flu or Viral Infection";
            suggestions = ["Get plenty of rest", "Stay hydrated", "Take antipyretics for fever", "Consult a doctor if symptoms worsen"];
        } else if (symptomsStr.includes("headache") && symptomsStr.includes("nausea")) {
            possibleIllness = "Possible Migraine or Food Poisoning";
            suggestions = ["Rest in a dark, quiet room", "Stay hydrated", "Avoid heavy meals"];
        } else if (symptomsStr.includes("chest pain")) {
            possibleIllness = "Possible Cardiac Issue or Severe Indigestion";
            suggestions = ["SEEK EMERGENCY MEDICAL ATTENTION IMMEDIATELY!"];
        } else if (symptomsStr.includes("sore throat")) {
            possibleIllness = "Possible Strep Throat or Cold";
            suggestions = ["Gargle with warm salt water", "Drink warm liquids", "Rest your voice"];
        } else if (symptomsStr.includes("fever")) {
            possibleIllness = "Fever / Mild Infection";
            suggestions = ["Monitor temperature", "Stay hydrated", "Rest"];
        } else if (symptomsStr.includes("headache")) {
            possibleIllness = "Tension Headache / Dehydration";
            suggestions = ["Drink water", "Rest", "Reduce screen time"];
        }

        res.json({
            illness: possibleIllness,
            suggestions
        });
    } catch (error) {
        console.error("Error in checkSymptoms:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

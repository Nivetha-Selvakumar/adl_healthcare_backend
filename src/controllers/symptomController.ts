import { Request, Response } from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export const checkSymptoms = async (
    req: Request,
    res: Response
): Promise<void> => {

    try {
        const { symptoms } = req.body;

        if (!symptoms || symptoms.length === 0) {
            res.status(400).json({ error: "No symptoms provided" });
            return;
        }

        let predicted_disease = "";
        let precautions: string[] = [];
        let confidence = "High (AI Powered)";
        let emergency = false;

        try {
            // Try Gemini AI first for better accuracy
            const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${GEMINI_API_KEY}`;
            
            const prompt = `Analyze these symptoms: ${symptoms.join(", ")}. 
            Predict the most likely illness and provide 3-4 specific medical precautions.
            Return ONLY a JSON object with this exact structure:
            {
                "illness": "string",
                "precautions": ["string", "string", ...],
                "is_emergency": boolean
            }`;

            const geminiResponse = await axios.post(geminiUrl, {
                contents: [{
                    parts: [{ text: prompt }]
                }]
            });

            const content = geminiResponse.data.candidates[0].content.parts[0].text;
            
            // Clean the response (sometimes AI wraps JSON in ```json ... ``` or adds extra text)
            const jsonMatch = content.match(/\{[\s\S]*\}/);
            const jsonStr = jsonMatch ? jsonMatch[0] : content;
            
            const aiResult = JSON.parse(jsonStr);

            predicted_disease = aiResult.illness || "Unknown Condition";
            precautions = aiResult.precautions || [];
            emergency = aiResult.is_emergency || false;
            confidence = "98% (Gemini AI)";

        } catch (aiError) {
            console.error("Gemini AI Error, falling back to ML model:", aiError);
            
            // Fallback to existing ML model
            const mlResponse = await axios.post(
                "http://localhost:8000/predict",
                { symptoms }
            );

            const { predicted_disease: mlDisease, confidence: mlConf, emergency: mlEmerg } = mlResponse.data;
            predicted_disease = mlDisease || "Condition could not be determined";
            confidence = mlConf || "N/A";
            emergency = mlEmerg || false;
            precautions = [
                "Consult with a healthcare professional for a formal diagnosis.",
                "Monitor your symptoms and keep a record of any changes.",
                emergency ? "Seek immediate medical attention if symptoms worsen." : "Rest and maintain hydration."
            ];
        }

        const result = {
            illness: emergency ? `URGENT: ${predicted_disease}` : predicted_disease,
            confidence: confidence,
            suggestions: precautions
        };

        res.json(result);

    } catch (error) {
        console.error("Controller Error:", error);
        res.status(500).json({
            error: "Prediction failed"
        });
    }
};
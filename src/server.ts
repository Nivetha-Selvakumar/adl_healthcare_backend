import dotenv from "dotenv";
import app from "./app";
import sequelize from "./config/database";

dotenv.config();

const PORT = process.env.PORT || 5000;

import EmergencyContact from "./models/EmergencyContact";

sequelize
    .sync({ alter: true })
    .then(async () => {
        console.log("✅ MySQL Connected & Models Synced");

        const contactCount = await EmergencyContact.count();
        if (contactCount === 0) {
            await EmergencyContact.bulkCreate([
                { name: "City General Hospital", phone: "911", category: "Hospital", distance: "2.4 km" },
                { name: "Metro Healthcare Center", phone: "911", category: "Hospital", distance: "4.1 km" },
                { name: "Sunrise Medical", phone: "911", category: "Hospital", distance: "5.5 km" }
            ]);
            console.log("✅ Seeded Emergency Contacts");
        }

        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log("❌ Database connection error:");
        console.log(error);
    });
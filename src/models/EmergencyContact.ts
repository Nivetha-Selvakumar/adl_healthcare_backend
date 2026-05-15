import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class EmergencyContact extends Model {
    public id!: number;
    public name!: string;
    public phone!: string;
    public category!: string; // e.g. 'Hospital', 'Ambulance'
    public distance!: string; // e.g. '2 km'
}

EmergencyContact.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        distance: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "emergency_contacts",
    }
);

export default EmergencyContact;

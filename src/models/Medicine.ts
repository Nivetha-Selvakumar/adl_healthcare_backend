import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Medicine extends Model {
    public id!: number;
    public name!: string;
    public dosage!: string;
    public time!: string;
    public status!: string; // 'Taken', 'Pending', 'Missed'
}

Medicine.init(
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
        dosage: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        time: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Pending",
        },
    },
    {
        sequelize,
        tableName: "medicines",
    }
);

export default Medicine;

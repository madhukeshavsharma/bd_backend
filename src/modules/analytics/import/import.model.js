import mongoose from 'mongoose';

const importSchema = new mongoose.Schema({
    Type: { type: String, default: "NA" },
    Port_of_Discharge: { type: String, default: "NA" },
    Mode_Of_Shipment: { type: String, default: "NA" },
    Shipment_ID: { type: String, default: "NA" },
    Date: { type: Date, default: null },
    BE_Type: { type: String, default: "NA" },
    AG: { type: String, default: "NA" },
    Month: { type: String, default: "NA" },
    HS_Code: { type: String, default: "NA" },
    Country: { type: String, default: "NA" },
    Country_of_Destination: { type: String, default: "NA" },
    Item_Description: { type: String, default: "NA" },
    Invoice_Currency: { type: String, default: "NA" },
    Invoice_Unit_Price_FC: { type: String, default: "NA" },
    Quantity: { type: Number, default: null },
    UQC: { type: String, default: "NA" },
    Unit_Price_in_INR: { type: Number, default: null },
    Total_Value_in_INR: { type: Number, default: null },
    Unit_Price_USD: { type: Number, default: null },
    Total_Value_USD: { type: Number, default: null },
    Total_Duty_USD: { type: Number, default: null },
    CHA_Name: { type: String, default: "NA" },
    IEC: { type: String, default: "NA" },
    Importer_Name: { type: String, default: "NA" },
    Port_of_Loading: { type: String, default: "NA" },
    Exporter_Name: { type: String, default: "NA" },
    Exporter_Address: { type: String, default: "NA" },
    Importer_Address: { type: String, default: "NA" },
    Importer_City_State: { type: String, default: "NA" },
    Importer_PIN: { type: String, default: "NA" },
    Importer_Phone: { type: String, default: "NA" },
    Importer_Mail: { type: String, default: "NA" },
    Importer_Contact_Person_1: { type: String, default: "NA" },
    Importer_Contact_Person_2: { type: String, default: "NA" },
},
    { timestamps: true }
);



export const Import13 = mongoose.model('Import13', importSchema);
export const Import21 = mongoose.model('Import21', importSchema);
export const Import25 = mongoose.model('Import25', importSchema);
export const Import27 = mongoose.model('Import27', importSchema);
export const Import28 = mongoose.model('Import28', importSchema);
export const Import29 = mongoose.model('Import29', importSchema);
export const Import30 = mongoose.model('Import30', importSchema);
export const Import31 = mongoose.model('Import31', importSchema);
export const Import32 = mongoose.model('Import32', importSchema);
export const Import33 = mongoose.model('Import33', importSchema);
export const Import34 = mongoose.model('Import34', importSchema);
export const Import38 = mongoose.model('Import38', importSchema);
export const Import39 = mongoose.model('Import39', importSchema);
export const Import40 = mongoose.model('Import40', importSchema);
export const Import90 = mongoose.model('Import90', importSchema);
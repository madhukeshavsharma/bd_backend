import mongoose from 'mongoose';

const exportSchema = new mongoose.Schema({
    Type: { type: String, default: "NA" },
    Shipment_ID: { type: String, default: null },
    Date: { type: Date, default: null },
    Port_of_Loading: { type: String, default: null },
    Mode_of_Shipment: { type: String, default: null },
    Month: { type: String, default: null },
    HS_Code: { type: String, default: null },
    Item_Description: { type: String, default: null },
    Quantity: { type: String, default: null },
    UQC: { type: String, default: null },
    Unit_Rate_In_FC: { type: Number, default: null },
    Currency: { type: String, default: null },
    Unit_Price_in_INR: { type: Number, default: null },
    Total_Value_in_INR: { type: Number, default: null },
    Unit_Value_USD: { type: Number, default: null },
    Total_Value_USD: { type: Number, default: null },
    Port_of_Discharge: { type: String, default: null },
    Country: { type: String, default: null },
    Country_of_Origin: { type: String, default: null },
    Importer_Name: { type: String, default: null },
    Importer_Address: { type: String, default: null },
    IEC: { type: String, default: null },
    Exporter_Name: { type: String, default: null },
    Exporter_Address: { type: String, default: null },
    Exporter_City_State: { type: String, default: null },
    Exporter_PIN: { type: String, default: null },
    Exporter_Phone: { type: String, default: null },
    Exporter_Mail: { type: String, default: null },
    Exporter_Contact_Person_1: { type: String, default: null },
    Exporter_Contact_Person_2: { type: String, default: null }
},
{timestamps: true},

);



export const Export13 = mongoose.model('Export13', exportSchema);
export const Export21 = mongoose.model('Export21', exportSchema);
export const Export25 = mongoose.model('Export25', exportSchema);
export const Export27 = mongoose.model('Export27', exportSchema);
export const Export28 = mongoose.model('Export28', exportSchema);
export const Export29 = mongoose.model('Export29', exportSchema);
export const Export30 = mongoose.model('Export30', exportSchema);
export const Export31 = mongoose.model('Export31', exportSchema);
export const Export32 = mongoose.model('Export32', exportSchema);
export const Export33 = mongoose.model('Export33', exportSchema);
export const Export34 = mongoose.model('Export34', exportSchema);
export const Export38 = mongoose.model('Export38', exportSchema);
export const Export39 = mongoose.model('Export39', exportSchema);
export const Export40 = mongoose.model('Export40', exportSchema);
export const Export90 = mongoose.model('Export90', exportSchema);


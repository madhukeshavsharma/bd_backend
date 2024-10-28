import mongoose from 'mongoose';

const importSchema = new mongoose.Schema({
    Type: { type: String, default: "NA" },
    Country_of_Destination: { type: String, default: "NA" },	
    Estimate_Arrival_Date: { type: String, default: "NA" },	
    Date: { type: Date, default: null },	
    Bill_of_Lading: { type: String, default: "NA" },	
    Master_Bill_of_Lading: { type: String, default: "NA" },	
    Carrier_SASC_Code: { type: String, default: "NA" },	
    Vessel_Code: { type: String, default: "NA" },	
    Vessel_Name: { type: String, default: "NA" },	
    Manifest_No: { type: String, default: "NA" },	
    Mode_of_Transportation: { type: String, default: "NA" },	
    Port_of_Loading: { type: String, default: "NA" },	
    Port_of_Discharge: { type: String, default: "NA" },	
    Place_of_Receipt: { type: String, default: "NA" },	
    Country: { type: String, default: "NA" },	
    Weight_in_KG: { type: String, default: "NA" },	
    Weight: { type: String, default: "NA" },	
    Weight_Unit: { type: String, default: "NA" },	
    TEU: { type: String, default: "NA" },	
    Quantity: { type: String, default: "NA" },	
    UQC: { type: String, default: "NA" },	
    Container_Id: { type: String, default: "NA" },	
    Container_Size: { type: String, default: "NA" },	
    Container_Type: { type: String, default: "NA" },	
    Container_Desc_Code: { type: String, default: "NA" },	
    Container_Load_Status: { type: String, default: "NA" },	
    Container_Type_of_Service: { type: String, default: "NA" },	
    Exporter_Name: { type: String, default: "NA" },	
    Exporter_Address: { type: String, default: "NA" },	
    Importer_Name: { type: String, default: "NA" },	
    Importer_Address: { type: String, default: "NA" },	
    Notify_Party_Name: { type: String, default: "NA" },
    Notify_Party_Address: { type: String, default: "NA" },
    Item_Description: { type: String, default: "NA" },
    Marks_And_Numbers: { type: String, default: "NA" },	
    HS_Code: { type: String, default: "NA" },	
    CIF: { type: String, default: "NA" }
}, { 
    timestamps: true 
});


export const USAImport13 = mongoose.model('USAImport13', importSchema);
export const USAImport21 = mongoose.model('USAImport21', importSchema);
export const USAImport25 = mongoose.model('USAImport25', importSchema);
export const USAImport27 = mongoose.model('USAImport27', importSchema);
export const USAImport28 = mongoose.model('USAImport28', importSchema);
export const USAImport29 = mongoose.model('USAImport29', importSchema);
export const USAImport30 = mongoose.model('USAImport30', importSchema);
export const USAImport31 = mongoose.model('USAImport31', importSchema);
export const USAImport32 = mongoose.model('USAImport32', importSchema);
export const USAImport33 = mongoose.model('USAImport33', importSchema);
export const USAImport34 = mongoose.model('USAImport34', importSchema);
export const USAImport38 = mongoose.model('USAImport38', importSchema);
export const USAImport39 = mongoose.model('USAImport39', importSchema);
export const USAImport40 = mongoose.model('USAImport40', importSchema);
export const USAImport90 = mongoose.model('USAImport90', importSchema);
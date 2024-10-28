import * as DB  from "../import.model.js";

export const whichDB = (hs_code) => {

    if(hs_code == 13) return DB.USAImport13;
    
    if(hs_code == 21) return DB.USAImport21;

    if(hs_code == 25) return DB.USAImport25;

    if(hs_code == 27) return DB.USAImport27;

    if(hs_code == 28) return DB.USAImport28;

    if(hs_code == 29) return DB.USAImport29;

    if(hs_code == 30) return DB.USAImport30;

    if(hs_code == 31) return DB.USAImport31;

    if(hs_code == 32) return DB.USAImport32;

    if(hs_code == 33) return DB.USAImport33;

    if(hs_code == 34) return DB.USAImport34;

    if(hs_code == 38) return DB.USAImport38;

    if(hs_code == 39) return DB.USAImport39;

    if(hs_code == 40) return DB.USAImport40;

    if(hs_code == 90) return DB.USAImport90;

    return null;
}
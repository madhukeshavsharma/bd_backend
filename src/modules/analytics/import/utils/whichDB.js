import  * as DB  from "../import.model.js";


export const whichDB = (hs_code) => {
    if(hs_code==13) return DB.Import13;
    
    if(hs_code==21)return DB.Import21;

    if(hs_code==25)return DB.Import25;

    if(hs_code==27)return DB.Import27;

    if(hs_code==28)return DB.Import28;

    if(hs_code==29)return DB.Import29;

    if(hs_code==30)return DB.Import30;

    if(hs_code==31)return DB.Import31;

    if(hs_code==32)return DB.Import32;

    if(hs_code==33)return DB.Import33;

    if(hs_code==34)return DB.Import34;

    if(hs_code==38)return DB.Import38;

    if(hs_code==39)return DB.Import39;

    if(hs_code==40)return DB.Import40;

    if(hs_code==90)return DB.Import90;

    return null;
}
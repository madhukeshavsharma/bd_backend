import * as DB from "../export.model.js";

export const whichDB = (hs_code) => {
    if(hs_code == 13) return DB.Export13;
    
    if(hs_code == 21) return DB.Export21;

    if(hs_code == 25) return DB.Export25;

    if(hs_code == 27) return DB.Export27;

    if(hs_code == 28) return DB.Export28;

    if(hs_code == 29) return DB.Export29;

    if(hs_code == 30) return DB.Export30;

    if(hs_code == 31) return DB.Export31;

    if(hs_code == 32) return DB.Export32;

    if(hs_code == 33) return DB.Export33;

    if(hs_code == 34) return DB.Export34;

    if(hs_code == 38) return DB.Export38;

    if(hs_code == 39) return DB.Export39;

    if(hs_code == 40) return DB.Export40;

    if(hs_code == 90) return DB.Export90;

    return null;
}

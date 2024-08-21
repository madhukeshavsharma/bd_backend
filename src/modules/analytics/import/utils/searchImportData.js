
import {importQuery} from "./importQuery.js";

export const fetchImportData = async (validated_req, all,DB) => {
    const { page_index, page_size } = validated_req.pagination;
    const skip = (page_index - 1) * page_size;
    const query = importQuery(validated_req)
    // const total_records = await DB.countDocuments(query);

    let searchResult;
    if(all) {
        searchResult = await DB.find(query).skip(skip).limit(parseInt(page_size)).lean();
    } else {
        searchResult = await DB.find(query)
            .select("Item_Description HS_Code Quantity UQC Country Date")
            .skip(skip).limit(parseInt(page_size)).lean();
    }
    return {
        searchResult, 
        subscription: false,
        pagination: { 
            page_index: parseInt(page_index), 
            page_size: parseInt(page_size),
            // total_pages: Math.ceil(total_records / page_size),
            // total_records
        }
    };
}
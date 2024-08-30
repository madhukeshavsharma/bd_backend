import {exportQuery} from "./exportQuery.js";

export const fetchExportData = async (validated_req, all,DB) => {
    const { page_index, page_size } = validated_req.pagination;
    const skip = (page_index - 1) * page_size;
    const query = exportQuery(validated_req)
    // const total_records = await DB.countDocuments(query);

   
    const searchResult = await DB.find(query)
            .select(!all?"Item_Description HS_Code Quantity UQC Country Date":"")
            .skip(skip).limit(parseInt(page_size)).lean();

    
    return {
        searchResult, 
        subscription: false,
        pagination: { 
            page_index: parseInt(page_index), 
            page_size: parseInt(page_size),
            // total_pages: Math.ceil(total_records / page_size),
            // total_records
        }
    }
}
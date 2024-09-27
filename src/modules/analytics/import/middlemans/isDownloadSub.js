import {HttpException} from "../../../../handlers/HttpException.js";
import {importQuery} from "../utils/importQuery.js";
import {HttpResponse} from "../../../../handlers/HttpResponse.js";
import { whichDB } from "../utils/whichDB.js";

export const isDownloadSub = async (req, res, next) => {

    const validated_req = req.validated_req;
    const DB = whichDB(validated_req.chapter_code);
    if(!DB) return HttpResponse(res, 400, 'Invalid Chapter Code', {});
    const customer = req.customer;
    if(!validated_req.download_sub) return next();

    if(customer.download_import_sub < 1) {
        return HttpException(res, 400, 'Download Subscription Expired');
    }

    const { page_index, page_size } = validated_req.pagination;
    const query = importQuery(validated_req)
    const total_records = await DB.countDocuments(query);
    const skip = (page_index - 1) * page_size;
    const searchResult = await DB.find(query).skip(skip).limit(parseInt(page_size)).lean();
    const fetchedDocuments = searchResult.length;
    
    if (fetchedDocuments > customer.download_import_sub) {
        return HttpException(res, 400, 'Download Subscription Not Enough');
    }
    
    if(!searchResult.length) {
        return HttpException(res, 400, 'No records found');
    }

    customer.download_import_sub -= fetchedDocuments;
    await customer.save();

    return HttpResponse(res, 200, 'records fetched successfully', {total_records, searchResult});

}
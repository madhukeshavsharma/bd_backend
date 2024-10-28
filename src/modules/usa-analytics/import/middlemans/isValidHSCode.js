import {fetchImportData} from "../utils/searchImportData.js";
import {HttpResponse} from "../../../../handlers/HttpResponse.js";
import { whichDB } from "../utils/whichDB.js";

export const isValidHSCode = async (req, res, next) => {

    const validated_req = req.validated_req;
    const DB = whichDB(validated_req.chapter_code);

    if(!DB) return HttpResponse(res, 400, 'Invalid Chapter Code', {});

    const customer = req.customer;

    // if (
    //     !( customer.usa_hsn_codes &&
    //         customer.usa_hsn_codes.length > 0 &&
    //         isSubscribedHSCode(customer, validated_req.search_text.hs_code) &&
    //         new Date(customer.usa_hsn_codes_valid_upto) >= new Date() )
    // ) {
    //     const searchResult = await fetchImportData(validated_req, false, DB);
    //     return HttpResponse(res, 200, 'records fetched successfully', searchResult);
    // }

    
    if(!(checkSubscription(validated_req.search_text.hs_code, customer.usa_hsn_codes) && new Date(customer.usa_hsn_codes_valid_upto) >= new Date())) {
        console.log(validated_req.search_text.hs_code, customer.usa_hsn_codes);
        const searchResult = await fetchImportData(validated_req, false, DB);
        return HttpResponse(res, 200, 'records fetched successfully', searchResult);
    }

    return next();
}

function isSubscribedHSCode(customer, hs_code) {
    for (let code of customer.usa_hsn_codes) {
        if (hs_code.startsWith(code)) {
            return true;
        }
    }
    return false;
}

function checkSubscription(A, B) {

    let subscription = false;

    for (let i = 0; i < A.length; i++) {
        subscription = false;

        for (let j = 0; j < B.length; j++) {
            if (A[i].startsWith(B[j])) {
                subscription = true;
            }
        }
        if (!subscription) {
            return subscription;
        }
    }
    return subscription;
}
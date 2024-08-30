import jwt from "jsonwebtoken";
import {HttpException} from "../../../../handlers/HttpException.js";
import {HttpResponse} from "../../../../handlers/HttpResponse.js";
import {fetchExportData} from "../utils/searchExportData.js";
import {Customer} from "../../../user/customer.model.js";
import { whichDB } from "../utils/whichDB.js";
export const isValidToken = async (req, res, next) => {
    const validated_req = req.validated_req;
    const DB = whichDB(validated_req.chapter_code);
    if(!DB) return HttpResponse(res, 400, 'Invalid Chapter Code');
    if(!validated_req.search_text.hs_code){
        validated_req.search_text.hs_code = [];
        validated_req.search_text.hs_code.push(validated_req.chapter_code);
    }
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        const searchResult = await fetchExportData(validated_req, false,DB);
        return HttpResponse(res, 200, 'records fetched successfully', searchResult);
    }

    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.JWT_ACCESS_PRIVATE_KEY);
    } catch (error) {
        return HttpException(res, 401, 'Invalid Token');
    }

    if (decodedToken.user_type !== 'customer') return HttpException(res, 401, 'Invalid Token');
    const customer = await Customer.findById(decodedToken.id).select('-password');

    if (!customer) return HttpException(res, 404, 'User not found');

    req.customer = customer;
    return next();
}
import { HttpException } from "../../../handlers/HttpException.js";
import { Customer } from "../../user/customer.model.js";
import { importQuery } from './utils/importQuery.js';
import { whichDB } from './utils/whichDB.js';

async function checkSubscription(id, validated_req) {
    const customer = await Customer.findById(id);

    if (!customer) return false;

    return (isSubscribed(validated_req.search_text.hs_code, customer.usa_hsn_codes) && new Date(customer.usa_hsn_codes_valid_upto) >= new Date())
}

function isSubscribed(A, B) {

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

const sortAnalysis = async (req, res) => {
    const validated_req = req.validated_req;

    const DB = whichDB(validated_req.chapter_code);
    if(!DB) return HttpException(res, 400, "Invalid Chapter Code");

    if(!validated_req.search_text.hs_code) {
        validated_req.search_text.hs_code = [];
        validated_req.search_text.hs_code.push(validated_req.chapter_code);
    }
    // const subscription = await checkSubscription(req.user.id, validated_req);
    // if (!subscription) return HttpException(res, 400, "Invalid Subscription");

    const query = importQuery(validated_req);

    try {
        const pipeline = [
            {
                $match: query,
            },
            {
                $group: {
                    _id: null,
                    Country: { $addToSet: '$Country' },
                    Importer_Name: { $addToSet: '$Importer_Name' },
                    Port_of_Loading: { $addToSet: '$Port_of_Loading' },
                    Port_of_Discharge: { $addToSet: '$Port_of_Discharge' },
                    Exporter_Name: { $addToSet: '$Exporter_Name' }
                },
            },
            {
                $project: {
                    _id: 0,
                    Country: { $size: '$Country' },
                    Importer: { $size: '$Importer_Name' },
                    Port_of_Loading: { $size: '$Port_of_Loading' },
                    Port_of_Discharge: { $size: '$Port_of_Discharge' },
                    Exporter: { $size: '$Exporter_Name' }
                },
            }
        ]

        // const totalShipments = await Import.estimatedDocumentCount(query);
        // const data = await Import.aggregate(pipeline);

        const [totalShipments, data] = await Promise.all([
            DB.countDocuments(query),
            DB.aggregate(pipeline).exec()
        ]);
        const responseData = {
            status:"true",
            status_code:200,
            message:"Record fetched successfully",
            result : {
                Shipments: totalShipments,
                ...data[0]
            }
        }
        res.status(200).json(responseData);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const detailAnalysis = async (req, res) => {
    const validated_req = req.validated_req;

    const DB = whichDB(validated_req.chapter_code);
    if(!DB) return HttpException(res, 400, "Invalid Chapter Code");

    if(!validated_req.search_text.hs_code) {
        validated_req.search_text.hs_code = [];
        validated_req.search_text.hs_code.push(validated_req.chapter_code);
    }

    const subscription = await checkSubscription(req.user.id, validated_req);
    if (!subscription) return HttpException(res, 400, "Invalid Subscription");

    const query = importQuery(validated_req);

    const pipeline = [
        {
            $match: query,
        },
        {
            $facet: {
                importers: [
                    { $group: { _id: "$Importer_Name", count: { $sum: 1 } } },
                    { $project: { _id: 0, data: "$_id", count: 1 } },
                    { $sort: { count: -1 } }
                ],
                countries: [
                    { $group: { _id: "$Country", count: { $sum: 1 } } },
                    { $project: { _id: 0, data: "$_id", count: 1 } },
                    { $sort: { count: -1 } }
                ],
                port_of_discharge: [
                    { $group: { _id: "$Port_of_Discharge", count: { $sum: 1 } } },
                    { $project: { _id: 0, data: "$_id", count: 1 } },
                    { $sort: { count: -1 } }
                ],
                port_of_loading: [
                    { $group: { _id: "$Port_of_Loading", count: { $sum: 1 } } },
                    { $project: { _id: 0, data: "$_id", count: 1 } },
                    { $sort: { count: -1 } }
                ],
                exporters: [
                    { $group: { _id: "$Exporter_Name", count: { $sum: 1 } } },
                    { $project: { _id: 0, data: "$_id", count: 1 } },
                    { $sort: { count: -1 } }
                ]
            }
        }
    ];

    try {
        const data = await DB.aggregate(pipeline);
        const responseData = {
            status: "true",
            status_code: 200,
            message: "Record fetched successfully",
            result : data[0]
        }
        res.json(responseData);
    } catch (error) {
        return HttpException(res, 404, error, {});
    }
}

const uniqueAnalysis = async (req, res) => {
    const validated_req = req.validated_req;

    const DB = whichDB(validated_req.chapter_code);
    if(!DB) return HttpException(res, 400, "Invalid Chapter Code");

    if(!validated_req.search_text.hs_code){
        validated_req.search_text.hs_code = [];
        validated_req.search_text.hs_code.push(validated_req.chapter_code);
    }
    // const subscription = await checkSubscription(req.user.id, validated_req);
    // if (!subscription) return HttpException(res, 400, "Invalid Subscription");

    const query = importQuery(validated_req);

    const pipeline = [
        {
            $match: query,
        },
        {
            $facet: {
                importers: [
                    { $group: { _id: "$Importer_Name" } },
                    { $project: { _id: 0, data: "$_id", count: 1 } },
                    { $sort: { data: 1} }
                ],
                countries: [
                    { $group: { _id: "$Country" } },
                    { $project: { _id: 0, data: "$_id", count: 1 } },
                    { $sort: { data: 1} }
                ],
                exporters: [
                    { $group: { _id: "$Exporter_Name" } },
                    { $project: { _id: 0, data: "$_id", count: 1 } },
                    { $sort: { data: 1} }
                ],
                Port_of_Loading: [
                    { $group: { _id: "$Port_of_Loading" } },
                    { $project: { _id: 0, data: "$_id", count: 1 } },
                    { $sort: { data: 1} }
                ],
                Port_of_Discharge: [
                    { $group: { _id: "$Port_of_Discharge" } },
                    { $project: { _id: 0, data: "$_id", count: 1 } },
                    { $sort: { data: 1} }
                ],
                Country_of_Destination: [
                    { $group: { _id: "$Country_of_Destination" } },
                    { $project: { _id: 0, data: "$_id", count: 1 } },
                    { $sort: { data: 1} }
                ],

            }
        }
    ];

    try {
        const data = await DB.aggregate(pipeline);
        const responseData = {
            status: "true",
            status_code: 200,
            message: "Record fetched successfully",
            result : data[0]
        }
        res.json(responseData);
    } catch (error) {
        return HttpException(res, 404, error, {});
    }
}

const detailAnalysisUSD = async (req, res) => {
    const validated_req = req.validated_req;

    const DB = whichDB(validated_req.chapter_code);
    if(!DB) return HttpException(res, 400, "Invalid Chapter Code");

    if(!validated_req.search_text.hs_code) {
        validated_req.search_text.hs_code = [];
        validated_req.search_text.hs_code.push(validated_req.chapter_code);
    }
    
    const subscription = await checkSubscription(req.user.id, validated_req);
    if (!subscription) return HttpException(res, 400, "Invalid Subscription");

    const query = importQuery(validated_req);

    const pipeline = [
        {
            $match: query,
        },
        {
            $facet: {
                importers: [
                    { $group: { _id: "$Importer_Name", count: { $sum: "$Total_Value_USD" } } },
                    { $project: { _id: 0, data: "$_id", count: 1 } },
                    { $sort: { count: -1 } }
                ],
                countries: [
                    { $group: { _id: "$Country", count: { $sum: "$Total_Value_USD" } } },
                    { $project: { _id: 0, data: "$_id", count: 1 } },
                    { $sort: { count: -1 } }
                ],
                port_of_discharge: [
                    { $group: { _id: "$Port_of_Discharge", count: { $sum: "$Total_Value_USD" } } },
                    { $project: { _id: 0, data: "$_id", count: 1 } },
                    { $sort: { count: -1 } }
                ],
                port_of_loading: [
                    { $group: { _id: "$Port_of_Loading", count: { $sum: "$Total_Value_USD" } } },
                    { $project: { _id: 0, data: "$_id", count: 1 } },
                    { $sort: { count: -1 } }
                ],
                exporters: [
                    { $group: { _id: "$Exporter_Name", count: { $sum: "$Total_Value_USD" } } },
                    { $project: { _id: 0, data: "$_id", count: 1 } },
                    { $sort: { count: -1 } }
                ]
            }
        }
    ];

    try {
        const data = await DB.aggregate(pipeline);
        const responseData = {
            status: "true",
            status_code: 200,
            message: "Record fetched successfully",
            result : data[0]
        }
        res.json(responseData);
    } catch (error) {
        return HttpException(res, 404, error, {});
    }
}

export { sortAnalysis, detailAnalysis, detailAnalysisUSD , uniqueAnalysis }
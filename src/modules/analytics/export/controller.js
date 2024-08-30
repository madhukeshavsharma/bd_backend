import { HttpResponse } from '../../../handlers/HttpResponse.js';
import { processExportData } from './utils/processor.js';
import InternalServerException from '../../../handlers/InternalServerException.js';
import { HttpException } from '../../../handlers/HttpException.js';
import { insertExportData } from './utils/insertExportData.js';
import fs from 'fs';

import { fetchExportData } from './utils/searchExportData.js';
import { whichDB } from './utils/whichDB.js';

export async function uploadExportData(req, res) {
  try {
    const filePath = req.file.path;
    const DB = whichDB(req.body.hs_code);
    if (!DB) return HttpResponse(res, 400, 'Invalid HS Code', {});
    const export_data = await processExportData(filePath);
    if (!export_data || !export_data.length) {
      return HttpResponse(res, 400, 'No data found in the Excel sheet.', {});
    }

    try {
      await insertExportData(export_data,DB);

      // delete the file after processing
      fs.unlinkSync(filePath);
    } catch (error) {
      // delete the file in case of error
      fs.unlinkSync(filePath);
      return HttpException(res, 500, 'Error Inserting Import Data', {});
    }

    return HttpResponse(
      res,
      200,
      `${export_data.length} records inserted`,
      {}
    );
  } catch (error) {
    return InternalServerException(res, error);
  }
}

export async function searchExportData(req, res) {
  try {
    const validated_req = req.validated_req;
    const DB = whichDB(validated_req.chapter_code);
    if (!DB) return HttpResponse(res, 400, 'Invalid Chapter Code', {});
    const searchResult = await fetchExportData(validated_req, true, DB);
    searchResult.subscription = true;

    return HttpResponse(res, 200, 'records fetched successfully', searchResult);
  } catch (error) {
    return InternalServerException(res, error);
  }
}
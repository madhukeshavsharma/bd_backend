
import path from 'path';
import excel from 'exceljs';







































export async function readExcel(fileName) {
  const workbook = new excel.Workbook();
  
  
  await workbook.xlsx.readFile(
    path.join(__dirname, '..', '..', '/public/', fileName)
  );
  console.info('Completed reading file from xlsx');
  const data = [];
  workbook.worksheets.forEach((sheet) => {
    
    const firstRow = sheet.getRow(1);
    if (!firstRow.cellCount) return;
    const keys = firstRow.values;
    sheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;
      const values = row.values;
      const obj = {};
      for (let i = 1; i < keys.length; i++) {
        obj[keys[i]] = values[i];
      }
      data.push(obj);
    });
  });
  console.info(`FOUND ${data.length} ROWS IN ${fileName}`);
  return data;
}

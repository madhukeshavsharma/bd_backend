import xlsx from 'xlsx';

export async function processImportData(filePath) {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const jsonData = xlsx.utils.sheet_to_json(sheet);
  console.log("I am here")
  if (!jsonData || !jsonData.length) {
    return res.status(400).send('No data found in the Excel sheet.');
  }
  console.log(jsonData)
  
  const jsonResult = jsonData.map(row => {
    const obj = {};
    Object.keys(row).forEach(key => {

      if (key === 'Date') {

        let dateStr = row[key]; 

        console.log("Date", dateStr);

        
        dateStr = dateStr.replace(/-/g, "/"); 
        
        let parts = dateStr.split("/"); 

        
        let dateObj = new Date(parts[2], parts[1] - 1, parts[0]);
        console.log(dateObj.toString());
        

        obj[key.trim()] = dateObj.toString();
      } else {
        obj[key.trim()] = row[key];
      }
    });
    return obj;
  });
  console.log(jsonResult)
  return jsonResult;
}
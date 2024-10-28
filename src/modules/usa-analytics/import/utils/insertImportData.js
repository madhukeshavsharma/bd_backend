async function insertImportData(importData,DB) {
    const chunkSize = 10000;
    for (let i = 0; i < importData.length; i += chunkSize) {
        const chunk = importData.slice(i, i + chunkSize);
        try {
            await DB.insertMany(chunk);
            console.log(`Inserted ${chunk.length} documents`);
            await new Promise(resolve => setTimeout(resolve,1000));
        } catch (error) {
            console.log(error);
        }
    }
}

export { insertImportData }

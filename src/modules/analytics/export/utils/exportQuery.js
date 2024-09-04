
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function exportQuery(validated_req) {

    const { search_text, filters, duration } = validated_req;
    const { hs_code, product_name } = search_text;
    const { start_date, end_date } = duration;

    const query = {
        HS_Code: hs_code && hs_code.length
            ? { $in: hs_code.map(hc => new RegExp('^'+hc, 'i')) }
            : '',
            
        Item_Description: product_name && product_name.length
            ? { $in: product_name.map(pn => new RegExp(escapeRegExp(pn), 'i')) }
            : '',

        Importer_Name: filters && filters.importer_name && filters.importer_name.length
            ? { $in: filters.importer_name.map(bn => new RegExp(escapeRegExp(bn), 'i')) }
            : '',
        Exporter_Name: filters && filters.exporter_name && filters.exporter_name.length
            ? { $in: filters.exporter_name.map(sn => new RegExp(escapeRegExp(sn), 'i')) }
            : '',
        Port_of_Loading: filters && filters.port_code && filters.port_code.length
            ? { $in: filters.port_code.map(pc => new RegExp(escapeRegExp(pc), 'i')) }
            : '',
        UQC: filters && filters.unit && filters.unit.length
            ? { $in: filters.unit.map(u => new RegExp(escapeRegExp(u), 'i')) }
            : '',
        Country: filters && filters.country && filters.country.length
            ? { $in: filters.country.map(c => new RegExp(escapeRegExp(c), 'i')) }
            : '',

        Date: { $gte: start_date, $lte: end_date }
    };

    Object.keys(query).forEach((key) => {
        if (!query[key] || (query[key].$regex && query[key].$regex.source === "(?:)")) {
            delete query[key];
        }
    });

    return query
}

export { exportQuery, escapeRegExp }
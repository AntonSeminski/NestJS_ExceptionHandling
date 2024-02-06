export class MapBy {
    /**
     * Returns an Object where keys are Ids and values are records.
     *
     * @param {Array<{_id: string)}>} records - array of records with _id string field.
     * @return {_id: Object} Object with keys as _ids and values as records.
     */
    public static id(records: Array<any>): Object {
        return records.reduce((recordById, record) => {
            recordById[record._id] = record;

            return recordById;
        }, {});
    }

    /**
     * Returns an Object where keys are Field Values and values are records.
     *
     * @param {string} fieldName - field name to map the records by.
     * @param {Array<any>} records - array of records with field.
     * @return {field: Object} Object with keys as field values (from fieldName's field) and values as records.
     */
    public static field(fieldName: string, records: Array<any>): any {
        if (!fieldName || !records || !Array.isArray(records)) return records;

        return records.reduce((state: any, record: any) => {
            state[record[fieldName]] = record;

            return state;
        }, {});
    }
}
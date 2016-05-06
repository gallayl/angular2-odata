"use strict";
const rx_1 = require('rxjs/rx');
const odataquery_1 = require("./odataquery");
class ODataService {
    constructor(_typeName, http, config) {
        this._typeName = _typeName;
        this.http = http;
        this.config = config;
    }
    get TypeName() {
        return this._typeName;
    }
    Get(typeUrl, key) {
        return this.http.get(this.config.baseUrl + "/" + typeUrl + "('" + key + "')")
            .map((r, i) => {
            return this.extractSingleData(r, i, typeUrl);
        })
            .catch((err, caught) => {
            this.config.handleError && this.config.handleError(err, caught);
            return rx_1.Observable.throw(err);
        });
    }
    Post(entity) {
        throw "Not implemented yet!";
    }
    Patch(entity) {
        throw "Not implemented yet!";
    }
    Put(entity) {
        throw "Not implemented yet!";
    }
    Delete(entity) {
        throw "Not implemented yet!";
    }
    Query() {
        return new odataquery_1.ODataQuery(this.TypeName, this.config, this.http);
    }
    extractSingleData(res, i, typeName) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();
        let entity = body;
        return entity || {};
    }
}
exports.ODataService = ODataService;
//# sourceMappingURL=odata.js.map
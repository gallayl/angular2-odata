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
    Get(key) {
        return this.handleResponse(this.http.get(this.getEntityUri(key), this.config.requestOptions));
    }
    Post(entity) {
        let body = JSON.stringify(entity);
        return this.handleResponse(this.http.post(this.config.baseUrl + "/" + this.TypeName, body, this.config.requestOptions));
    }
    CustomAction(key, actionName, postdata) {
        let body = JSON.stringify(postdata);
        return this.handleResponse(this.http.post(this.getEntityUri(key) + "/" + actionName, body, this.config.requestOptions));
    }
    Patch(entity, key) {
        let body = JSON.stringify(entity);
        return this.http.patch(this.getEntityUri(key), body, this.config.requestOptions);
    }
    Put(entity, key) {
        let body = JSON.stringify(entity);
        return this.handleResponse(this.http.put(this.getEntityUri(key), body, this.config.requestOptions));
    }
    Delete(key) {
        return this.http.delete(this.getEntityUri(key), this.config.requestOptions);
    }
    Query() {
        return new odataquery_1.ODataQuery(this.TypeName, this.config, this.http);
    }
    handleResponse(entity) {
        return entity.map(this.extractData)
            .catch((err, caught) => {
            this.config.handleError && this.config.handleError(err, caught);
            return rx_1.Observable.throw(err);
        });
    }
    extractData(res) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();
        let entity = body;
        return entity || {};
    }
    escapeKey() {
    }
    getEntityUri(entityKey) {
        //ToDo: Fix string based keys
        if (!parseInt(entityKey)) {
            return this.config.baseUrl + "/" + this.TypeName + "('" + entityKey + "')";
        }
        return this.config.baseUrl + "/" + this.TypeName + "(" + entityKey + ")";
    }
}
exports.ODataService = ODataService;
//# sourceMappingURL=odata.js.map
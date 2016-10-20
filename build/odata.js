"use strict";
const rx_1 = require('rxjs/rx');
const query_1 = require('./query');
const operation_1 = require('./operation');
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
        return new operation_1.GetOperation(this._typeName, this.config, this.http, key);
    }
    Post(entity) {
        let body = JSON.stringify(entity);
        return this.handleResponse(this.http.post(this.config.baseUrl + '/' + this.TypeName, body, this.config.postRequestOptions));
    }
    CustomAction(key, actionName, postdata) {
        let body = JSON.stringify(postdata);
        return this.http.post(this.getEntityUri(key) + '/' + actionName, body, this.config.requestOptions).map(resp => resp.json());
    }
    CustomFunction(key, actionName) {
        return this.http.get(this.getEntityUri(key) + '/' + actionName, this.config.requestOptions).map(resp => resp.json());
    }
    Patch(entity, key) {
        let body = JSON.stringify(entity);
        return this.http.patch(this.getEntityUri(key), body, this.config.postRequestOptions);
    }
    Put(entity, key) {
        let body = JSON.stringify(entity);
        return this.handleResponse(this.http.put(this.getEntityUri(key), body, this.config.postRequestOptions));
    }
    Delete(key) {
        return this.http.delete(this.getEntityUri(key), this.config.requestOptions);
    }
    Query() {
        return new query_1.ODataQuery(this.TypeName, this.config, this.http);
    }
    getEntityUri(entityKey) {
        return this.config.getEntityUri(entityKey, this._typeName);
    }
    handleResponse(entity) {
        return entity.map(this.extractData)
            .catch((err, caught) => {
            if (this.config.handleError)
                this.config.handleError(err, caught);
            return rx_1.Observable.throw(err);
        });
    }
    extractData(res) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();
        let entity = body;
        return entity || null;
    }
    escapeKey() {
    }
}
exports.ODataService = ODataService;
//# sourceMappingURL=odata.js.map
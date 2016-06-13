"use strict";
const rx_1 = require('rxjs/rx');
const operation_1 = require("./operation");
class ODataQuery extends operation_1.ODataOperation {
    constructor(_typeName, config, http) {
        super(_typeName, config, http);
    }
    Filter(filter) {
        this._filter = filter;
        return this;
    }
    ;
    Top(top) {
        this._top = top;
        return this;
    }
    ;
    Skip(skip) {
        this._skip = skip;
        return this;
    }
    OrderBy(orderBy) {
        this._orderBy = orderBy;
        return this;
    }
    getQueryParams() {
        let params = super.getParams();
        this._filter && params.set("$filter", this._filter);
        this._top && params.set("$top", this._top.toString());
        this._skip && params.set("$skip", this._skip.toString());
        this._orderBy && params.set("$orderby", this._orderBy);
        return params;
    }
    Exec() {
        let params = this.getQueryParams();
        return this.http.get(this.config.baseUrl + "/" + this._typeName + "/", { search: params })
            .map(this.extractArrayData)
            .catch((err, caught) => {
            this.config.handleError && this.config.handleError(err, caught);
            return rx_1.Observable.throw(err);
        });
    }
    extractArrayData(res) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();
        let entities = body.value;
        return entities;
    }
}
exports.ODataQuery = ODataQuery;
//# sourceMappingURL=query.js.map
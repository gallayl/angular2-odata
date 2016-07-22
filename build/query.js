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
        this._filter && params.set(this.config.Keys.Filter, this._filter);
        this._top && params.set(this.config.Keys.Top, this._top.toString());
        this._skip && params.set(this.config.Keys.Skip, this._skip.toString());
        this._orderBy && params.set(this.config.Keys.OrderBy, this._orderBy);
        return params;
    }
    Exec() {
        let params = this.getQueryParams();
        let config = this.config;
        return this.http.get(this.config.baseUrl + "/" + this._typeName + "/", { search: params })
            .map(res => this.extractArrayData(res, config))
            .catch((err, caught) => {
            this.config.handleError && this.config.handleError(err, caught);
            return rx_1.Observable.throw(err);
        });
    }
    extractArrayData(res, config) {
        return config.extractQueryResultData(res);
    }
}
exports.ODataQuery = ODataQuery;
//# sourceMappingURL=query.js.map
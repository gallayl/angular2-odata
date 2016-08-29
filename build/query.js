"use strict";
const rx_1 = require('rxjs/rx');
const operation_1 = require('./operation');
class PagedResult {
}
exports.PagedResult = PagedResult;
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
    Exec() {
        let params = this.getQueryParams();
        let config = this.config;
        return this.http.get(this.buildResourceURL(), { search: params })
            .map(res => this.extractArrayData(res, config))
            .catch((err, caught) => {
            if (this.config.handleError)
                this.config.handleError(err, caught);
            return rx_1.Observable.throw(err);
        });
    }
    ExecWithCount() {
        let params = this.getQueryParams();
        params.set('$count', 'true'); // OData v4 only
        let config = this.config;
        return this.http.get(this.buildResourceURL(), { search: params })
            .map(res => this.extractArrayDataWithCount(res, config))
            .catch((err, caught) => {
            if (this.config.handleError)
                this.config.handleError(err, caught);
            return rx_1.Observable.throw(err);
        });
    }
    buildResourceURL() {
        return this.config.baseUrl + '/' + this._typeName + '/';
    }
    getQueryParams() {
        let params = super.getParams();
        if (this._filter)
            params.set(this.config.keys.filter, this._filter);
        if (this._top)
            params.set(this.config.keys.top, this._top.toString());
        if (this._skip)
            params.set(this.config.keys.skip, this._skip.toString());
        if (this._orderBy)
            params.set(this.config.keys.orderBy, this._orderBy);
        return params;
    }
    extractArrayData(res, config) {
        return config.extractQueryResultData(res);
    }
    extractArrayDataWithCount(res, config) {
        return config.extractQueryResultDataWithCount(res);
    }
}
exports.ODataQuery = ODataQuery;
//# sourceMappingURL=query.js.map
"use strict";
const http_1 = require('@angular/http');
const rx_1 = require('rxjs/rx');
class ODataQuery {
    constructor(_typeName, config, http) {
        this._typeName = _typeName;
        this.config = config;
        this.http = http;
    }
    Filter(filter) {
        this._filter = filter;
        return this;
    }
    ;
    Select(filter) {
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
    Expand(expand) {
        this._expand = expand;
        return this;
    }
    OrderBy(orderBy) {
        this._orderBy = orderBy;
        return this;
    }
    Exec() {
        let params = new http_1.URLSearchParams();
        this._filter && params.set("$filter", this._filter);
        this._select && params.set("$select", this._select);
        this._top && params.set("$top", this._top.toString());
        this._skip && params.set("$skip", this._skip.toString());
        this._expand && params.set("$expand", this._expand);
        this._orderBy && params.set("$orderby", this._orderBy);
        return this.http.get(this.config.baseUrl + "/" + this._typeName + "/", { search: params })
            .map(this.extractData)
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
        let entities = body.value;
        return entities;
    }
}
exports.ODataQuery = ODataQuery;
//# sourceMappingURL=odataquery.js.map
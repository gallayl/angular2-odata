"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require('angular2/core');
const http_1 = require('angular2/http');
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
        return new ODataQuery(this.TypeName, this.config, this.http);
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
let ODataServiceFatory = class ODataServiceFatory {
    constructor(http, config) {
        this.http = http;
        this.config = config;
        var t = [0, 1, 2, 3, 4];
    }
    CreateService(typeName, handleError) {
        return new ODataService(typeName, this.http, this.config);
    }
};
ODataServiceFatory = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [http_1.Http, ODataConfiguration])
], ODataServiceFatory);
exports.ODataServiceFatory = ODataServiceFatory;
let ODataConfiguration = class ODataConfiguration {
    handleError(err, caught) { }
};
ODataConfiguration = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [])
], ODataConfiguration);
exports.ODataConfiguration = ODataConfiguration;
//# sourceMappingURL=odata.js.map
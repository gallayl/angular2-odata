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
const core_1 = require('@angular/core');
const http_1 = require('@angular/http');
class KeyConfigs {
    constructor() {
        this.Filter = "$filter";
        this.Top = "$top";
        this.Skip = "$skip";
        this.OrderBy = "$orderby";
    }
}
exports.KeyConfigs = KeyConfigs;
let ODataConfiguration = class ODataConfiguration {
    constructor() {
        this.baseUrl = window.location.origin + "/odata";
        this.Keys = new KeyConfigs();
    }
    getEntityUri(entityKey, _typeName) {
        //ToDo: Fix string based keys
        if (!parseInt(entityKey)) {
            return this.baseUrl + "/" + _typeName + "('" + entityKey + "')";
        }
        return this.baseUrl + "/" + _typeName + "(" + entityKey + ")";
    }
    handleError(err, caught) {
        console.warn("OData error: ", err, caught);
    }
    ;
    get requestOptions() {
        let headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        return new http_1.RequestOptions({ headers: headers });
    }
    ;
    extractQueryResultData(res) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();
        let entities = body.value;
        return entities;
    }
};
ODataConfiguration = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [])
], ODataConfiguration);
exports.ODataConfiguration = ODataConfiguration;
//# sourceMappingURL=config.js.map
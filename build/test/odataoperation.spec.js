"use strict";
require('zone.js');
require('reflect-metadata');
const chai_1 = require('chai');
const rx_1 = require('rxjs/rx');
const common_1 = require('@angular/common');
const testing_1 = require('@angular/core/testing');
const testbedHelper_1 = require('./testbedHelper');
const testing_2 = require('@angular/http/testing');
const http_1 = require('@angular/http');
const operation_1 = require('../operation');
const odataservicefactory_1 = require('../odataservicefactory');
const config_1 = require('../config');
class ODataOperationTest extends operation_1.ODataOperation {
    Exec() {
        return rx_1.Observable.of(new Array());
    }
}
exports.ODataOperationTest = ODataOperationTest;
describe('ODataOperation - ', () => {
    // before(() => TestBedHelper.Init());
    beforeEach(() => {
        testbedHelper_1.TestBedHelper.Init().configureTestingModule({
            providers: [
                http_1.BaseRequestOptions,
                testing_2.MockBackend,
                {
                    provide: http_1.Http, useFactory: (backend, defaultOptions) => {
                        return new http_1.Http(backend, defaultOptions);
                    },
                    deps: [testing_2.MockBackend, http_1.BaseRequestOptions]
                },
                {
                    provide: common_1.Location, useFactory: () => {
                        return {
                            path: 'http://localhost/test'
                        };
                    }
                },
                config_1.ODataConfiguration,
                odataservicefactory_1.ODataServiceFactory
            ],
            imports: [
                http_1.HttpModule
            ]
        });
    });
    it('Expand(string) via injection', testing_1.inject([http_1.Http, config_1.ODataConfiguration], (http, config) => {
        // Assign
        let test = new ODataOperationTest('Employees', config, http);
        // Act
        test.Expand('x');
        // Assert
        chai_1.assert.equal(test['_expand'], 'x');
    }));
    it('Expand(string)', () => {
        // Assign
        let test = new ODataOperationTest('Employees', null, null);
        // Act
        test.Expand('x, y');
        // Assert
        chai_1.assert.equal(test['_expand'], 'x, y');
    });
    it('Expand(string[])', () => {
        // Assign
        let test = new ODataOperationTest('Employees', null, null);
        // Act
        test.Expand(['a', 'b']);
        // Assert
        chai_1.assert.equal(test['_expand'], 'a,b');
    });
    it('Select(string)', () => {
        // Assign
        let test = new ODataOperationTest('Employees', null, null);
        // Act
        test.Select('x,y,z');
        // Assert
        chai_1.assert.equal(test['_select'], 'x,y,z');
    });
    it('Select(string[])', () => {
        // Assign
        let test = new ODataOperationTest('Employees', null, null);
        // Act
        test.Select(['a', 'b']);
        // Assert
        chai_1.assert.equal(test['_select'], 'a,b');
    });
});
//# sourceMappingURL=odataoperation.spec.js.map
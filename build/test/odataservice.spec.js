"use strict";
require('zone.js');
require('reflect-metadata');
const chai_1 = require('chai');
const common_1 = require('@angular/common');
const testing_1 = require('@angular/core/testing');
const testbedHelper_1 = require('./testbedHelper');
const testing_2 = require('@angular/http/testing');
const http_1 = require('@angular/http');
const odataservicefactory_1 = require('../odataservicefactory');
const config_1 = require('../config');
describe('ODataService - ', () => {
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
    it('Construct via injection', testing_1.inject([odataservicefactory_1.ODataServiceFactory], (factory) => {
        // Act
        let service = factory.CreateService('Employees');
        // Assert
        chai_1.assert.isNotNull(service);
    }));
});
//# sourceMappingURL=odataservice.spec.js.map
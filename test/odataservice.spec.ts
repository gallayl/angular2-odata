require('zone.js');
import 'reflect-metadata';
import { assert } from 'chai';
import { Observable, Operator } from 'rxjs/rx';
import { Location } from '@angular/common';
import { inject, addProviders, TestComponentBuilder, TestBed } from '@angular/core/testing';
import { TestBedHelper } from './testbedHelper';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions, Http, ConnectionBackend, HttpModule } from '@angular/http';
import { IEmployee } from './employee';
import { ODataOperation } from '../operation';
import { ODataServiceFactory } from '../odataservicefactory';
import { ODataConfiguration } from '../config';

describe('ODataService - ', () => {
    beforeEach(() => {
        TestBedHelper.Init().configureTestingModule({
            providers: [
                BaseRequestOptions,
                MockBackend,
                {
                    provide: Http, useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
                        return new Http(backend, defaultOptions);
                    },
                    deps: [MockBackend, BaseRequestOptions]
                },
                {
                    provide: Location, useFactory: () => {
                        return {
                            path: 'http://localhost/test'
                        };
                    }
                },
                ODataConfiguration,
                ODataServiceFactory
            ],
            imports: [
                HttpModule
            ]
        });
    });

    it('Construct via injection', inject([ ODataServiceFactory ], (factory: ODataServiceFactory) => {
        // Act
        let service = factory.CreateService<IEmployee>('Employees');

        // Assert
        assert.isNotNull(service);
    }));
});

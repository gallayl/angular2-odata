/// <reference path="../../node_modules/@types/jasmine/index.d.ts" />
import { assert } from 'chai';
import { Observable, Operator } from 'rxjs/rx';
import { Location } from '@angular/common';
import { inject, TestBed } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions, Http, ConnectionBackend, HttpModule } from '@angular/http';
import { IEmployee } from './helpers/employee';
import { ODataOperation } from '../operation';
import { ODataServiceFactory } from '../odataservicefactory';
import { ODataConfiguration } from '../config';

describe('ODataService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                BaseRequestOptions,
                MockBackend,
                {
                    provide: Http, useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
                        return new Http(backend, defaultOptions);
                    },
                    deps: [MockBackend, BaseRequestOptions]
                },
                // {
                //     provide: Location, useFactory: () => {
                //         return {
                //             path: 'http://localhost/test'
                //         };
                //     }
                // },
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

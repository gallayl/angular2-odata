import { Http } from '@angular/http';
import { ODataService } from "./odata";
import { ODataConfiguration } from "./config";
export declare class ODataServiceFactory {
    private http;
    private config;
    constructor(http: Http, config: ODataConfiguration);
    CreateService<T>(typeName: string, handleError?: (err: any) => any): ODataService<T>;
    CreateServiceWithOptions<T>(typeName: string, config: ODataConfiguration): ODataService<T>;
}

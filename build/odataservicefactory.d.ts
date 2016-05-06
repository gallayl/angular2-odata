import { Http } from 'angular2/http';
import { ODataService } from "./odata";
import { ODataConfiguration } from "./odataconfig";
export declare class ODataServiceFactory {
    private http;
    private config;
    constructor(http: Http, config: ODataConfiguration);
    CreateService<T>(typeName: string, handleError?: (err: any) => any): ODataService<T>;
}

import { Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/rx';
import { ODataConfiguration } from "./odataconfig";
import { ODataQuery } from "./odataquery";
export declare class ODataService<T> {
    private _typeName;
    private http;
    private config;
    constructor(_typeName: string, http: Http, config: ODataConfiguration);
    TypeName: string;
    Get(key: string): Observable<T>;
    Post(entity: T): Observable<T>;
    CustomAction(key: string, actionName: string, postdata: any): Observable<any>;
    Patch(entity: any, key: string): Observable<Response>;
    Put(entity: T, key: string): Observable<T>;
    Delete(key: string): Observable<Response>;
    Query(): ODataQuery<T>;
    private handleResponse(entity);
    private extractData(res);
    private escapeKey();
    private getEntityUri(entityKey);
}

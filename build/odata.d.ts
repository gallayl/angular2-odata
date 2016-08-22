import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/rx';
import { ODataConfiguration } from "./config";
import { ODataQuery } from "./query";
import { GetOperation } from "./operation";
export declare class ODataService<T> {
    private _typeName;
    private http;
    private config;
    constructor(_typeName: string, http: Http, config: ODataConfiguration);
    readonly TypeName: string;
    Get(key: string): GetOperation<T>;
    Post(entity: T): Observable<T>;
    CustomAction(key: string, actionName: string, postdata: any): Observable<T>;
    Patch(entity: any, key: string): Observable<Response>;
    Put(entity: T, key: string): Observable<T>;
    Delete(key: string): Observable<Response>;
    Query(): ODataQuery<T>;
    private extractData(res);
    protected getEntityUri(entityKey: string): string;
    protected handleResponse(entity: Observable<Response>): Observable<T>;
    private escapeKey();
}

import { Http } from 'angular2/http';
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
    Post(entity: T, key: string): Observable<T>;
    PostAction(key: string, actionName: string, postdata: any): Observable<any>;
    Patch(entity: T, key: string): Observable<T>;
    Put(entity: T): Observable<T>;
    Delete(key: string): Observable<any>;
    Query(): ODataQuery<T>;
    private handleResponse(entity);
    private extractData(res);
    private escapeKey();
    private getEntityUri(entityKey);
}

import { Http } from 'angular2/http';
import { Observable } from 'rxjs/rx';
import { ODataConfiguration } from "./odataconfig";
import { ODataQuery } from "./odataquery";
export declare class ODataService<T> {
    private _typeName;
    private http;
    private config;
    TypeName: string;
    Get(key: string): Observable<T>;
    Post(entity: T): Observable<T>;
    Patch(entity: T): Observable<T>;
    Put(entity: T): Observable<T>;
    Delete(entity: T): Observable<T>;
    Query(): ODataQuery<T>;
    constructor(_typeName: string, http: Http, config: ODataConfiguration);
    private extractSingleData(res);
}

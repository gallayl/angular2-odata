import { Http } from 'angular2/http';
import { Observable } from 'rxjs/rx';
export declare class ODataQuery<T> {
    private _typeName;
    private config;
    private http;
    constructor(_typeName: string, config: ODataConfiguration, http: Http);
    private _filter;
    Filter(filter: string): ODataQuery<T>;
    private _top;
    Top(top: number): ODataQuery<T>;
    private _skip;
    Skip(skip: number): ODataQuery<T>;
    _expand: string;
    Expand(expand: string): ODataQuery<T>;
    _orderBy: string;
    OrderBy(orderBy: string): ODataQuery<T>;
    Exec(): Observable<Array<T>>;
    private extractData(res);
}
export declare class ODataService<T> {
    private _typeName;
    private http;
    private config;
    TypeName: string;
    Get(typeUrl: string, key: string): Observable<T>;
    Post(entity: T): Observable<T>;
    Patch(entity: T): Observable<T>;
    Put(entity: T): Observable<T>;
    Delete(entity: T): Observable<T>;
    Query(): ODataQuery<T>;
    constructor(_typeName: string, http: Http, config: ODataConfiguration);
    private extractSingleData(res, i, typeName);
}
export declare class ODataServiceFatory {
    private http;
    private config;
    constructor(http: Http, config: ODataConfiguration);
    CreateService<T>(typeName: string, handleError: (err: any) => any): ODataService<T>;
}
export declare class ODataConfiguration {
    baseUrl: string;
    handleError(err: any, caught: any): void;
}

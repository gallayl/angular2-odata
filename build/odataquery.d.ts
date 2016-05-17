import { Http } from '@angular/http';
import { Observable } from 'rxjs/rx';
import { ODataConfiguration } from "./odataconfig";
export declare class ODataQuery<T> {
    private _typeName;
    private config;
    private http;
    constructor(_typeName: string, config: ODataConfiguration, http: Http);
    private _filter;
    Filter(filter: string): ODataQuery<T>;
    private _select;
    Select(filter: string): ODataQuery<T>;
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

import { Http } from '@angular/http';
import { Observable } from 'rxjs/rx';
import { ODataConfiguration } from "./config";
import { ODataOperation } from "./operation";
export declare class ODataQuery<T> extends ODataOperation<T> {
    constructor(_typeName: string, config: ODataConfiguration, http: Http);
    private _filter;
    Filter(filter: string): ODataQuery<T>;
    private _top;
    Top(top: number): ODataQuery<T>;
    private _skip;
    Skip(skip: number): ODataQuery<T>;
    _orderBy: string;
    OrderBy(orderBy: string): ODataQuery<T>;
    private getQueryParams();
    Exec(): Observable<Array<T>>;
    private extractArrayData(res, config);
}

import { Http } from '@angular/http';
import { Observable } from 'rxjs/rx';
import { ODataConfiguration } from './config';
import { ODataOperation } from './operation';
export declare class PagedResult<T> {
    data: T[];
    count: number;
}
export declare class ODataQuery<T> extends ODataOperation<T> {
    private _filter;
    private _top;
    private _skip;
    private _orderBy;
    constructor(_typeName: string, config: ODataConfiguration, http: Http);
    Filter(filter: string): ODataQuery<T>;
    Top(top: number): ODataQuery<T>;
    Skip(skip: number): ODataQuery<T>;
    OrderBy(orderBy: string): ODataQuery<T>;
    Exec(): Observable<Array<T>>;
    ExecWithCount(): Observable<PagedResult<T>>;
    private buildResourceURL();
    private getQueryParams();
    private extractArrayData(res, config);
    private extractArrayDataWithCount(res, config);
}

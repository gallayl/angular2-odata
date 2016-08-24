import { Injectable } from '@angular/core';
import { URLSearchParams, Http, Response } from '@angular/http';
import { Observable, Operator, Subject } from 'rxjs/rx';
import { ODataConfiguration } from "./config";
import { ODataOperation } from "./operation";

export class PagedResult<T>{
    public data: T[];
    public count: number;
}

export class ODataQuery<T> extends ODataOperation<T>{
    constructor(_typeName:string, config:ODataConfiguration, http:Http) {
        super(_typeName, config, http);
    }
    private _filter: string;
    public Filter(filter: string): ODataQuery<T> {
        this._filter = filter;
        return this;
    };
    
    private _top:number;
    public Top(top: number):ODataQuery<T>{
        this._top = top;
        return this;
    };
    
    private _skip:number;
    public Skip(skip:number):ODataQuery<T>{
        this._skip = skip;
        return this;
    }
    
    _orderBy: string;
    public OrderBy(orderBy:string):ODataQuery<T>{
        this._orderBy = orderBy;
        return this;
    }
    
    private getQueryParams():URLSearchParams{
        let params = super.getParams();
        this._filter && params.set(this.config.Keys.Filter, this._filter);
        this._top && params.set(this.config.Keys.Top, this._top.toString());
        this._skip && params.set(this.config.Keys.Skip, this._skip.toString());
        this._orderBy && params.set(this.config.Keys.OrderBy, this._orderBy);
        return params;
    }
    
    public Exec():Observable<Array<T>>{
        let params = this.getQueryParams();
        let config = this.config;
        return this.http.get(this.config.baseUrl + "/"+this._typeName+"/", {search: params})
           .map(res=>this.extractArrayData(res,config))
           .catch((err:any,caught:Observable<Array<T>>)=>{
               this.config.handleError && this.config.handleError(err,caught);
               return Observable.throw(err);
           });
    }

    public ExecWithCount():Observable<PagedResult<T>>{
        let params = this.getQueryParams();
        params.set("$count",'true');    // OData v4 only
        let config = this.config;

        return this.http.get(this.config.baseUrl + "/"+this._typeName+"/", {search: params})
            .map(res=>this.extractArrayDataWithCount(res,config))
            .catch((err:any,caught:Observable<PagedResult<T>>)=>{
               this.config.handleError && this.config.handleError(err,caught);
               return Observable.throw(err);
           });

    }
    
    private extractArrayData(res: Response, config:ODataConfiguration):Array<T> {
        return config.extractQueryResultData<T>(res);
    }

    private extractArrayDataWithCount(res:Response, config: ODataConfiguration):PagedResult<T>{
        return config.extractQueryResultDataWidhCount<T>(res);
    }
}
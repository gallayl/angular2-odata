import { Injectable } from '@angular/core';
import { URLSearchParams, Http, Response } from '@angular/http';
import { Observable, Operator } from 'rxjs/rx';
import { ODataConfiguration } from "./config";
import { ODataOperation } from "./operation";

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
        return this.http.get(this.config.baseUrl + "/"+this._typeName+"/", {search: params})
           .map(this.extractArrayData)
           .catch((err:any,caught:Observable<Array<T>>)=>{
               this.config.handleError && this.config.handleError(err,caught);
               return Observable.throw(err);
           });
    }
    
    private extractArrayData(res: Response):Array<T> {
        return this.config.extractQueryResultData<T>(res);
    }
}
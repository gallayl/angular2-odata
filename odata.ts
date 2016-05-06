import { Injectable } from 'angular2/core';
import { URLSearchParams, Http, Response } from 'angular2/http';
import { Observable, Operator } from 'rxjs/rx';

export class ODataQuery<T>{
    constructor(private _typeName:string, private config:ODataConfiguration, private http:Http) { }
    
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
    
    _expand: string;
    public Expand(expand:string):ODataQuery<T>{
        this._expand = expand;
        return this;
    }
    
    _orderBy: string;
    public OrderBy(orderBy:string):ODataQuery<T>{
        this._orderBy = orderBy;
        return this;
    }
    
    public Exec():Observable<Array<T>>{
        let params = new URLSearchParams();
        this._filter && params.set("$filter", this._filter);
        this._top && params.set("$top", this._top.toString());
        this._skip && params.set("$skip", this._skip.toString());
        this._expand && params.set("$expand", this._expand);
        this._orderBy && params.set("$orderby", this._orderBy);
        
        return this.http.get(this.config.baseUrl + "/"+this._typeName+"/", {search: params})
           .map(this.extractData)
           .catch((err:any,caught:Observable<Array<T>>)=>{
               this.config.handleError && this.config.handleError(err,caught);
               return Observable.throw(err);
           });
    }
    
    private extractData(res: Response):Array<T> {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();
        let entities:Array<T> = body.value;
        return entities;
    }
}

export class ODataService<T>{

    public get TypeName(){
        return this._typeName;
    }
        
    public Get(typeUrl:string, key:string):Observable<T>{
        return this.http.get(this.config.baseUrl + "/"+typeUrl+"('"+key+"')")
           .map((r,i)=>{
               return this.extractSingleData(r,i,typeUrl);
           })
           .catch((err:any,caught:Observable<T>)=>{
               this.config.handleError && this.config.handleError(err,caught);
               return Observable.throw(err);
           });
    }
    
    public Post(entity:T):Observable<T>{
        throw "Not implemented yet!";
    }
    
    public Patch(entity:T):Observable<T>{
        throw "Not implemented yet!";
    }
    
    public Put(entity:T):Observable<T>{
        throw "Not implemented yet!";
    }
    
    public Delete(entity:T):Observable<T>{
        throw "Not implemented yet!";
    }
    
    public Query():ODataQuery<T>{
        return new ODataQuery<T>(this.TypeName, this.config, this.http);
    }
    
    
    constructor(private _typeName:string, private http:Http, private config:ODataConfiguration) { }

    private extractSingleData(res: Response, i:number, typeName:string){
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();
        let entity:T = body;
        return entity || {};
    }
}

@Injectable()
export class ODataServiceFatory{
    
    constructor(private http:Http, private config : ODataConfiguration) {
        var t = [0,1,2,3,4];
    }
    
    public CreateService<T>(typeName:string,handleError:(err:any)=>any):ODataService<T>{
        return new ODataService<T>(typeName, this.http, this.config);
    }
}

@Injectable()
export class ODataConfiguration{
    baseUrl:string;
    handleError(err:any, caught:any):void{ }
}

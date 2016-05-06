import { URLSearchParams, Http, Response } from 'angular2/http';
import { Observable, Operator } from 'rxjs/rx';
import { ODataConfiguration } from "./odataconfig";
import { ODataQuery } from "./odataquery";

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

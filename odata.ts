import { URLSearchParams, Http, Response, Headers, RequestOptions } from 'angular2/http';
import { Observable, Operator } from 'rxjs/rx';
import { ODataConfiguration } from "./odataconfig";
import { ODataQuery } from "./odataquery";

export class ODataService<T> {
    
    constructor(private _typeName:string, private http:Http, private config:ODataConfiguration) { }

    public get TypeName(){
        return this._typeName;
    }
        
    public Get(key:string):Observable<T>{
        return this.handleResponse(this.http.get(this.getEntityUri(key),this.config.requestOptions));
    }
    
    public Post(entity:T):Observable<T>{
        let body = JSON.stringify(entity);
        return this.handleResponse(this.http.post(this.config.baseUrl + "/"+this.TypeName,body,this.config.requestOptions));
    }
    
    public CustomAction(key:string, actionName:string, postdata:any){
        let body = JSON.stringify(postdata);
        return this.handleResponse(this.http.post(this.getEntityUri(key)+"/"+actionName,body, this.config.requestOptions));
    }
    
    public Patch(entity:any, key:string):Observable<Response>{
        let body = JSON.stringify(entity);
        return this.http.patch(this.getEntityUri(key),body,this.config.requestOptions);
    }
    
    public Put(entity:T,  key:string):Observable<T>{
        let body = JSON.stringify(entity);
        return this.handleResponse(this.http.put(this.getEntityUri(key),body,this.config.requestOptions));
    }
    
    public Delete(key:string):Observable<Response>{
        return this.http.delete(this.getEntityUri(key),this.config.requestOptions);
    }
    
    public Query():ODataQuery<T>{
        return new ODataQuery<T>(this.TypeName, this.config, this.http);
    }

    private handleResponse(entity:Observable<Response>){
        
        return entity.map(this.extractData)
           .catch((err:any,caught:Observable<T>)=>{
               this.config.handleError && this.config.handleError(err,caught);
               return Observable.throw(err);
           });
    }

    private extractData(res: Response){
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();
        let entity:T = body;
        return entity || {};
    }
    
    private escapeKey(){
        
    }
    
    private getEntityUri(entityKey:string){
        //ToDo: Fix string based keys
        if ( !parseInt(entityKey) ){
            return this.config.baseUrl + "/"+this.TypeName+"('"+entityKey+"')";
        }
        
        return this.config.baseUrl + "/"+this.TypeName+"("+entityKey+")";
    }
}

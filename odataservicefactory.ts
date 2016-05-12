import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { ODataService } from "./odata";
import { ODataConfiguration } from "./odataconfig";

@Injectable()
export class ODataServiceFactory{
    
    constructor(private http:Http, private config : ODataConfiguration) {
    }
    
    public CreateService<T>(typeName:string,handleError?:(err:any)=>any):ODataService<T>{
        return new ODataService<T>(typeName, this.http, this.config);
    }
}
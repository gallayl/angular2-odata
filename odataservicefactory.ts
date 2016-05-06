import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';
import { ODataService } from "./odata";
import { ODataConfiguration } from "./odataconfig";

@Injectable()
export class ODataServiceFatory{
    
    constructor(private http:Http, private config : ODataConfiguration) {
        var t = [0,1,2,3,4];
    }
    
    public CreateService<T>(typeName:string,handleError:(err:any)=>any):ODataService<T>{
        return new ODataService<T>(typeName, this.http, this.config);
    }
}
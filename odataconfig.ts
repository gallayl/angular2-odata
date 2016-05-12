import { Injectable } from '@angular/core';
import { RequestOptions, Headers } from '@angular/http';


@Injectable()
export class ODataConfiguration{
    baseUrl:string  = window.location.origin + "/odata";
    
    handleError(err:any, caught:any):void{
        console.warn("OData error: ", err,caught);
    };
    
    get requestOptions(): RequestOptions{
        let headers = new Headers({ 'Content-Type': 'application/json' });
        return new RequestOptions({ headers: headers });
    };
 }
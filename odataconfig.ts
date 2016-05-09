import { Injectable } from 'angular2/core';

@Injectable()
export class ODataConfiguration{
    baseUrl:string  = window.location.origin + "/odata";
    
    handleError(err:any, caught:any):void{
        console.warn("OData error: ", err,caught);
    };
 }
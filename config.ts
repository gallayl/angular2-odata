import { Injectable } from '@angular/core';
import { RequestOptions, Headers } from '@angular/http';

export class KeyConfigs{
    public Filter:string = "$filter";
    public Top:string = "$top";
    public Skip:string = "$skip";
    public OrderBy:string = "$orderby";
}

@Injectable()
export class ODataConfiguration{
    baseUrl:string  = window.location.origin + "/odata";

    public getEntityUri(entityKey:string, _typeName:string){
        //ToDo: Fix string based keys
        if ( !parseInt(entityKey) ){
            return this.baseUrl + "/"+_typeName+"('"+entityKey+"')";
        }
        
        return this.baseUrl + "/"+_typeName+"("+entityKey+")";
    }

    public Keys:KeyConfigs = new KeyConfigs();
    
    handleError(err:any, caught:any):void{
        console.warn("OData error: ", err,caught);
    };
    
    get requestOptions(): RequestOptions{
        let headers = new Headers({ 'Content-Type': 'application/json' });
        return new RequestOptions({ headers: headers });
    };
 }
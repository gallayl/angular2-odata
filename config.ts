import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Response } from '@angular/http';

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
        return new RequestOptions({body: ''});
    };

    get postRequestOptions():RequestOptions{
        let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
        return new RequestOptions({ headers: headers });
    }

    public extractQueryResultData<T>(res: Response):Array<T> {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();
        let entities:Array<T> = body.value;
        return entities;
    }
 }
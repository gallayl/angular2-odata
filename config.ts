import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Response } from '@angular/http';
import { PagedResult } from "./query";

export class KeyConfigs {
    public Filter: string = "$filter";
    public Top: string = "$top";
    public Skip: string = "$skip";
    public OrderBy: string = "$orderby";
}

@Injectable()
export class ODataConfiguration {
    baseUrl: string = window.location.origin + "/odata";

    public getEntityUri(entityKey: string, _typeName: string) {
        //ToDo: Fix string based keys
        if (!parseInt(entityKey)) {
            return this.baseUrl + "/" + _typeName + "('" + entityKey + "')";
        }

        return this.baseUrl + "/" + _typeName + "(" + entityKey + ")";
    }

    public Keys: KeyConfigs = new KeyConfigs();

    handleError(err: any, caught: any): void {
        console.warn("OData error: ", err, caught);
    };

    get requestOptions(): RequestOptions {
        return new RequestOptions({ body: '' });
    };

    get postRequestOptions(): RequestOptions {
        let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
        return new RequestOptions({ headers: headers });
    }

    public extractQueryResultData<T>(res: Response): T[] {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();
        let entities: T[] = body.value;
        return entities;
    }

    public extractQueryResultDataWidhCount<T>(res: Response): PagedResult<T> {
        let r = new PagedResult<T>();

        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();
        let entities: T[] = body.value;

        r.data = entities;

        try {
            let count = parseInt(body["@odata.count"]) || entities.length; 
            r.count = count;
        } catch (error) {
            console.warn("Cannot determine OData entities count. Falling back to collection length...");
            r.count = entities.length;
        }
        return r;

    }
}
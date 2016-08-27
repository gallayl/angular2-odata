import { Injectable } from '@angular/core';
import { URLSearchParams, Http, Response, RequestOptions } from '@angular/http';
import { Observable, Operator } from 'rxjs/rx';
import { ODataConfiguration } from './config';

export abstract class ODataOperation<T> {
    private _expand: string;
    private _select: string;

    constructor(protected _typeName: string,
                protected config: ODataConfiguration,
                protected http: Http) { }

    public Expand(expand: string) {
        this._expand = expand;
        return this;
    }

    public Select(select: string) {
        this._select = select;
        return this;
    }

    protected getParams(): URLSearchParams {
        let params = new URLSearchParams();
        if (this._select) params.set('$select', this._select);
        if (this._expand) params.set('$expand', this._expand);
        return params;
    }

    protected handleResponse(entity: Observable<Response>) {
        return entity.map(this.extractData)
           .catch((err: any, caught: Observable<T>) => {
               if (this.config.handleError) this.config.handleError(err, caught);
               return Observable.throw(err);
           });
    }

    protected getEntityUri(entityKey: string) {
        return this.config.getEntityUri(entityKey, this._typeName);
    }

    protected getRequestOptions(): RequestOptions {
        let options = this.config.requestOptions;
        options.search = this.getParams();
        return options;
    }

    abstract Exec(...args): Observable<any>;

    private extractData(res: Response): T {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();
        let entity: T = body;
        return entity || null;
    }
}

export abstract class OperationWithKey<T> extends ODataOperation<T> {
    constructor(protected _typeName: string,
                protected config: ODataConfiguration,
                protected http: Http,
                protected key: string) {
                    super(_typeName, config, http);
                }
    abstract Exec(...args): Observable<any>;
}

export abstract class OperationWithEntity<T> extends ODataOperation<T> {
    constructor(protected _typeName: string,
                protected config: ODataConfiguration,
                protected http: Http,
                protected entity: T) {
                    super(_typeName, config, http);
                }
    abstract Exec(...args): Observable<any>;
}

export abstract class OperationWithKeyAndEntity<T> extends ODataOperation<T> {
    constructor(protected _typeName: string,
                protected config: ODataConfiguration,
                protected http: Http,
                protected key: string,
                protected entity: T) {
                    super(_typeName, config, http);
                }
    abstract Exec(...args): Observable<any>;
}


export class GetOperation<T> extends OperationWithKey<T> {

    public Exec(): Observable<T> {
        return super.handleResponse(this.http.get(this.getEntityUri(this.key), this.getRequestOptions()));
    }
}

// export class PostOperation<T> extends OperationWithEntity<T>{
//     public Exec():Observable<T>{    //ToDo: Check ODataV4
//         let body = JSON.stringify(this.entity);
//         return this.handleResponse(this.http.post(this.config.baseUrl + "/"+this._typeName, body, this.getRequestOptions()));
//     }
// }

// export class PatchOperation<T> extends OperationWithKeyAndEntity<T>{
//     public Exec():Observable<Response>{    //ToDo: Check ODataV4
//         let body = JSON.stringify(this.entity);
//         return this.http.patch(this.getEntityUri(this.key),body,this.getRequestOptions());
//     }
// }

// export class PutOperation<T> extends OperationWithKeyAndEntity<T>{
//     public Exec(){
//         let body = JSON.stringify(this.entity);
//         return this.handleResponse(this.http.put(this.getEntityUri(this.key),body,this.getRequestOptions()));
//     }
// }

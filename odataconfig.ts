import { Injectable } from 'angular2/core';

@Injectable()
export class ODataConfiguration{
    baseUrl:string;
    handleError(err:any, caught:any):void{ }
}
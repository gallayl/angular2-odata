import { RequestOptions } from 'angular2/http';
export declare class ODataConfiguration {
    baseUrl: string;
    handleError(err: any, caught: any): void;
    requestOptions: RequestOptions;
}

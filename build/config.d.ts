import { RequestOptions, Response } from '@angular/http';
export declare class KeyConfigs {
    Filter: string;
    Top: string;
    Skip: string;
    OrderBy: string;
}
export declare class ODataConfiguration {
    baseUrl: string;
    getEntityUri(entityKey: string, _typeName: string): string;
    Keys: KeyConfigs;
    handleError(err: any, caught: any): void;
    requestOptions: RequestOptions;
    extractQueryResultData<T>(res: Response): Array<T>;
}

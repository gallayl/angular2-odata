import { RequestOptions, Response } from '@angular/http';
import { PagedResult } from './query';
export declare class KeyConfigs {
    filter: string;
    top: string;
    skip: string;
    orderBy: string;
}
export declare class ODataConfiguration {
    baseUrl: string;
    keys: KeyConfigs;
    getEntityUri(entityKey: string, _typeName: string): string;
    handleError(err: any, caught: any): void;
    requestOptions: RequestOptions;
    postRequestOptions: RequestOptions;
    extractQueryResultData<T>(res: Response): T[];
    extractQueryResultDataWithCount<T>(res: Response): PagedResult<T>;
}

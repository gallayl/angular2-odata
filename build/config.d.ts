import { RequestOptions, Response } from '@angular/http';
import { PagedResult } from './query';
export declare class KeyConfigs {
    filter: string;
    top: string;
    skip: string;
    orderBy: string;
    select: string;
    expand: string;
}
export declare class ODataConfiguration {
    keys: KeyConfigs;
    baseUrl: string;
    getEntityUri(entityKey: string, _typeName: string): string;
    handleError(err: any, caught: any): void;
    requestOptions: RequestOptions;
    postRequestOptions: RequestOptions;
    extractQueryResultData<T>(res: Response): T[];
    extractQueryResultDataWithCount<T>(res: Response): PagedResult<T>;
}

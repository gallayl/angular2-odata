export declare class ODataConfiguration {
    baseUrl: string;
    handleError(err: any, caught: any): void;
    constructor(baseUrl: string, errorCallback?: (err: any, caught: any) => any);
}

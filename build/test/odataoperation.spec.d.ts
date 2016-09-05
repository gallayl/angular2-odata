import 'reflect-metadata';
import { Observable } from 'rxjs/rx';
import { ODataOperation } from '../operation';
export declare class ODataOperationTest<IEmployee> extends ODataOperation<IEmployee> {
    Exec(): Observable<Array<IEmployee>>;
}

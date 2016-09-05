import { TestBed } from '@angular/core/testing/test_bed';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

export class TestBedHelper {
    private static _tb: TestBed = null;

    /**
     * InitTestEnvironment, see also https://github.com/angular/angular/issues/11165
     * 
     * @static
     * @returns {TestBed}
     */
    public static Init(): TestBed {
        if (this._tb == null) {
            this._tb = TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
        }

        return this._tb;
    }
}

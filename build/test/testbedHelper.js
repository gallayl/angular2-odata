"use strict";
const test_bed_1 = require('@angular/core/testing/test_bed');
const testing_1 = require('@angular/platform-browser-dynamic/testing');
class TestBedHelper {
    /**
     * InitTestEnvironment, see also https://github.com/angular/angular/issues/11165
     *
     * @static
     * @returns {TestBed}
     */
    static Init() {
        if (this._tb == null) {
            this._tb = test_bed_1.TestBed.initTestEnvironment(testing_1.BrowserDynamicTestingModule, testing_1.platformBrowserDynamicTesting());
        }
        return this._tb;
    }
}
TestBedHelper._tb = null;
exports.TestBedHelper = TestBedHelper;
//# sourceMappingURL=testbedHelper.js.map
import { expect } from 'chai';
import _ from 'lodash';

describe('lodash tests', function() {
    it('test lodash', function() {
        // Returns values in first array but not second
        let diff = _.difference([1, 2, 3, 4, 5], [5, 2, 10]);
        expect(diff).to.eql([1, 3, 4]);
    });
});
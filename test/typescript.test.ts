import { expect } from 'chai';

describe('TypeScript tests for functionality different to JavaScript', function() {
    it('test arrays', function() {
        var newArr: any[] = [];
        const len = newArr.length
        expect(len).to.equal(0);
    });
});
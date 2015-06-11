var expect = require('expect.js');

var add = require('../src/test.js').add;

describe('addメソッド', function () {
  it('関数であること', function () {
    expect(add).to.be.a('function');
  });

  it('1と3を渡すと4が返ること', function () {
    expect(add(1, 3)).to.equal(4);
  });
});

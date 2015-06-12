var expect = require('expect.js');
var _ = require('underscore');
var bingo = require('../src/bingo.js');

var client = require('redis').createClient(6379, '127.0.0.1', {});

after(function(done) {
  client.del('bingo', function(err) { if(err) { console.error(err); }});
  done();
});

describe('resetメソッド', function() {
  it('関数であること', function(done) {
    expect(bingo.reset).to.be.a('function');
    done();
  });

  it('リセットすると結果が1になること', function(done) {
    client.sadd('bingo', 1, function(err) { if(err) console.error(err); });
    bingo.reset(function(err, val) {
      expect(val).to.be(1);
      done();
    });
  });

  it('既にリセット済みなら結果が0になること', function(done) {
    bingo.reset(function(err, val) {
      if(err) {
        console.error(err);
      }
      expect(val).to.be(0);
      done();
    });
  });
});

describe('listメソッド', function() {
  it('関数であること', function(done) {
    expect(bingo.list).to.be.a('function');
    done();
  });

  it('結果が配列であること', function(done) {
    bingo.list(function(err, val) {
      expect(val).to.be.a('array');
      done();
    });
  });

  it('要素数が2であること', function(done) {
    client.sadd('bingo', 1, function(err) { if(err) console.error(err); });
    client.sadd('bingo', 2, function(err) { if(err) console.error(err); });
    bingo.list(function(err, val) {
      expect(val).to.have.length(2);
      done();
    });
  });

  it('要素が文字列であること', function(done) {
    bingo.list(function(err, val) {
      expect(val[0]).to.be.a('string');
      done();
    });
  });

  it('要素が[1, 2]であること', function(done) {
    bingo.list(function(err, val) {
      expect(val).to.eql(['1', '2']);
      done();
    });
  });

  it('keyを削除すると要素数が0になること', function(done) {
    client.del('bingo', function(err) { if(err) { console.error(err); }});
    bingo.list(function(err, val) {
      expect(val).to.be.empty();
      done();
    });
  });
});

describe('nextメソッド', function() {
  it('関数であること', function(done) {
    expect(bingo.next).to.be.a('function');
    done();
  });

  it('numberであること', function(done) {
    bingo.next(function(err, nextNumber) {
      expect(nextNumber).to.be.a('number');
      done();
    });
  });

  it('整数であること', function(done) {
    bingo.next(function(err, nextNumber) {
      expect(nextNumber).to.be.equal(Math.floor(nextNumber));
      done();
    });
  });

  it('1以上75以下の数であること', function(done) {
    bingo.next(function(err, nextNumber) {
      expect(nextNumber).to.be.within(1, 75);
      done();
    });
  });
});

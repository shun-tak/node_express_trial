var expect = require('expect.js');
var client = require('redis').createClient(6379, '127.0.0.1', {});
var sadd = require('../src/redis').sadd;
var smembers = require('../src/redis').smembers;

var setKey = 'test';

before(function(done) {
  // テスト用キーを削除
  deleteKey(setKey);
  done();
});

after(function(done) {
  // テスト用キーを削除
  deleteKey(setKey);
  done();
});

describe('saddメソッド', function() {
  it('関数であること', function(done) {
    expect(sadd).to.be.a('function');
    done();
  });

  it('1を追加したときの返り値がnumberであること', function(done) {
    sadd(setKey, 1, function(err, val) {
      expect(val).to.be.a('number');
      done();
    });
  });

  it('2が追加できること', function(done) {
    sadd(setKey, 2, function(err, val) {
      expect(val).to.be(1);
      done();
    });
  });

  it('2回目は2が追加できないこと', function(done) {
    sadd(setKey, 2, function(err, val) {
      expect(val).to.be(0);
      done();
    });
  });
});

describe('smembersメソッド', function() {
  it('関数であること', function(done) {
    expect(smembers).to.be.a('function');
    done();
  });

  it('結果が配列であること', function(done) {
    smembers(setKey, function(err, val) {
      expect(val).to.be.a('array');
      done();
    });
  });

  it('要素数が2であること', function(done) {
    smembers(setKey, function(err, val) {
      expect(val).to.have.length(2);
      done();
    });
  });

  it('要素が文字列であること', function(done) {
    smembers(setKey, function(err, val) {
      expect(val[0]).to.be.a('string');
      done();
    });
  });

  it('要素が[1, 2]であること', function(done) {
    smembers(setKey, function(err, val) {
      expect(val).to.eql(['1', '2']);
      done();
    });
  });

  it('keyを削除すると要素数が0になること', function(done) {
    deleteKey(setKey);
    smembers(setKey, function(err, val) {
      expect(val).to.be.empty();
      done();
    });
  });
});

function deleteKey(key) {
  client.del(key, function(err, val) {
    if (err) {
      return console.error(err);
    }
  });
}

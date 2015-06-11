var expect = require('expect.js');
var client = require('redis').createClient(6379, '127.0.0.1', {});
var sadd = require('../src/redis').sadd;
var setKey = 'test';

before(function() {
  // テスト用キーを削除
  deleteKey(setKey);
});

after(function() {
  // テスト用キーを削除
  deleteKey(setKey);
});

describe('redisクライアント', function() {
  it('セット' + setKey + 'の要素数が0であること', function() {
    client.scard(setKey, function(err, val) {
      expect(val).to.equal(0);
    });
  });
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

function deleteKey(key) {
  client.del(key, function(err, val) {
    if (err) {
      return console.error(err);
    }
  });
}

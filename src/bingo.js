'use strict';
var _ = require('underscore');
var client = require('redis').createClient(6379, '127.0.0.1', {});

var setKey = 'bingo';

/**
 * 今まで出現した数リストを削除する
 * @param callback (err, val)を渡し、削除が成功すればvalが1を、削除が失敗すればvalが0を返す
 */
exports.reset = function reset(callback) {
  client.del(setKey, function(err, val) {
    callback(err, val);
  });
};

/**
 * 今まで出現した数リストを取得する
 * @param callback (err, val)を渡し、valに出現した数リストが返る
 */
exports.list = function list(callback) {
  client.smembers(setKey, function(err, val) {
    callback(err, val);
  });
};

/**
 * 1から75までの整数で、今までに出現していない整数を取得する
 * @param callback (err, nextNumber)を渡し、nextNumberに今までに出現していない整数が返る
 */
exports.next = function next(callback) {
  this.list(function(err, val) {
    if (err) {
      console.error(err);
      callback(err, null);
      return;
    }
    // 出現済みの数
    var list = _.map(val, function(str) { return parseInt(str, 10); });

    // すでに全ての数が出現していたらエラーを返す
    if(list.length >= 75) {
      callback(new Error('全ての数が出現済みです!'), null);
      return;
    }

    // 1から75の整数
    var numbers = _.range(1, 76);
    var nextNumber = _.first(_.shuffle(_.difference(numbers, list)));
    // redisに登録
    client.sadd(setKey, nextNumber, function(err) {
      callback(err, nextNumber);
    });
  });
};

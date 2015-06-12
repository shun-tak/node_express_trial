'use strict';
var client = require('redis').createClient(6379, '127.0.0.1', {});

/**
 * セット型に値を追加する
 * @param setKey 追加したいセット型のキー
 * @param num セット型に追加する値
 * @param callback (err, val)を渡し、追加が成功すればvalが1を、追加が失敗すればvalが0を返す
 */
exports.sadd = function sadd(setKey, num, callback) {
  client.sadd(setKey, num, function(err, val) {
    callback(err, val);
  });
};

/**
 * セット型の全ての要素を取得する
 * @param setKey セット型のキー
 * @param callback (err, val)を渡し、valに配列が返る
 */
exports.smembers = function smembers(setKey, callback) {
  client.smembers(setKey, function(err, val) {
    callback(err, val);
  });
};

/**
 * キーを削除する
 * @param setKey 削除したいキー
 * @param callback (err, val)を渡し、削除が成功すればvalが1を、削除が失敗すればvalが0を返す
 */
exports.del = function del(setKey, callback) {
  client.del(setKey, function(err, val) {
    callback(err, val);
  });
};

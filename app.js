'use strict';
var express = require('express');
var app = express();
var bingo = require('./src/bingo.js');

app.get('/', function (req, res) {
  var body = {
    'abstract': 'ビンゴアプリです。APIの結果は全てJSONで返されます。',
    'commands': {
      '/next': '1~75の範囲の整数を返します（/listに記録された数は除く）。出現した数は/listに記録されます。',
      '/list': '今まで出現した数のリストを返します。',
      '/reset': '今まで出現した数のリストをリセットします。'
    }
  };
  res.json(body);
});

app.get('/next', function(req, res) {
  bingo.next(function(err, nextNumber) {
    if(err) {
      res.status(403).json({ 'error': err.message });
      return;
    }
    res.json({ 'nextNumber': nextNumber });
  });
});

app.get('/list', function(req, res) {
  bingo.list(function(err, val) {
    if(err) {
      res.status(500).json({ 'error': err.message });
      return;
    }
    res.json({ 'list': val });
  });
});

app.get('/reset', function(req, res) {
  bingo.reset(function(err, val) {
    if(err) {
      res.status(500).json({ 'error': err.message });
      return;
    }

    if(val === 0) {
      res.json({ 'message': '既にリセット済みです' });
      return;
    }
    if(val === 1) {
      res.json({ 'message': 'リセットしました' });
      return;
    }
    res.status(500).json({ 'error': '結果が0,1以外になりました' });
  });
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});

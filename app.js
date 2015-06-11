var express = require('express');
var app = express();

app.get('/', function (req, res) {
  var body = {
    abstract: 'ビンゴアプリです。APIの結果は全てJSONで返されます。',
    commands: {
      '/next': '1~75の範囲の整数を返します（/listに記録された数は除く）。出現した数は/listに記録されます。',
      '/list': '今まで出現した数のリストを返します。',
      '/reset': '今まで出現した数のリストをリセットします。'
    }
  };
  res.json(body);
});

app.get('/next', function(req, res) {
  res.json(null);
});

app.get('/list', function(req, res) {
  res.json(null);
});

app.get('/reset', function(req, res) {
  res.json(null);
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});

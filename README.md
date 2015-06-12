# node_express_trial

node.jsのexpressを使ったAPIサーバーを作ってみる


## 実行環境

- node 0.10.38
- redis 2.8.19

```
# redisインストール (Mac)
brew install redis
# redis起動 (ポート: 6379)
redis-server
```


## API

基本：JSONでレスポンスする


### /next

1~75の範囲の整数を返します（/listに記録された数は除く）。出現した数は/listに記録されます。


### /list

今まで出現した数のリストを返します。


### /reset

今まで出現した数のリストをリセットします。


## 使ってるモジュール・ライブラリ・フレームワークのドキュメント

- [express](http://hideyukisaito.github.io/expressjs-doc_ja/guide/)
- [expect.js 0.3.1](https://github.com/Automattic/expect.js/blob/0.3.1/README.md)
- [mocha](http://mochajs.org/)
- [underscore](http://underscorejs.org/)

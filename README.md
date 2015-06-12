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
# アプリ起動
npm start
```


## API

基本：JSONでレスポンスする


### /next

1~75の範囲の整数を返します（/listに記録された数は除く）。出現した数は/listに記録されます。

```
curl localhost:3000/next
# => {"nextNumber":32}
```


### /list

今まで出現した数のリストを返します。

```
curl localhost:3000/list
# => {"list":["32","34","58"]}
```


### /reset

今まで出現した数のリストをリセットします。

```
curl localhost:3000/reset
# => {"message":"リセットしました"}
```


## 使ってるモジュール・ライブラリ・フレームワークのドキュメント

- [express](http://hideyukisaito.github.io/expressjs-doc_ja/guide/)
- [expect.js 0.3.1](https://github.com/Automattic/expect.js/blob/0.3.1/README.md)
- [mocha](http://mochajs.org/)
- [underscore](http://underscorejs.org/)

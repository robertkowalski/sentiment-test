'use strict'

const conf = require('./config/twitter.conf.json')
const Twitter = require('twitter')
const Sentiment = require('sentiment')
const sentiment = new Sentiment()

const client = new Twitter(conf)
const stream = client.stream('statuses/filter', { track: 'btc,bitcoin' })

const options = {
  extras: {
    'amazing': 2,
    'up': 2,
    'moon': 2,
    'down': -2,
    'bullish': 2,
    'bearish': -2,
    'descending': -2,
    'ascending': 2
  }
}
stream.on('data', function (event) {
  if (!event || !event.text) return

  const res = sentiment.analyze(event.text)
  if (!res.words.length) return

  console.log(event.text)
  console.log(res.words)

  console.log('----------')
}).on('error', (err) => {
  console.log(err)
})

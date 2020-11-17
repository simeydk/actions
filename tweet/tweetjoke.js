const fetch = require('node-fetch');
const Twit = require('twit')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const {consumer_key, consumer_secret, access_token, access_token_secret} = process.env
const T = new Twit({
    consumer_key, consumer_secret, access_token, access_token_secret,
    timeout_ms: 60 * 1000,
    strictSSL: true,
})

async function postTweet(text) {
    return await new Promise((resolve, reject) => {
        T.post('statuses/update', { status: text }, (err, data, response) => {
            err ? reject(err) : resolve({ data, response })
        })
    })
}

async function getJoke() {
    const OPTIONS = { headers: { accept: "application/json" } };
    const response = await fetch("https://icanhazdadjoke.com", OPTIONS);
    const data = await response.json();
    return data;
}

async function tweetJoke() {
    const {joke} = await getJoke()
    const response = await postTweet(joke) 
    console.log(response)
}

tweetJoke()

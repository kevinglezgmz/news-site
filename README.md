# news-site
Site where you can search for an specific topic and retrieve news related to that topic in the last 24 hours.

## Private Key Usage
To get the site working you need a private key from https://newsapi.org/ and create a file under assets/scripts/ with the name privateKey.js, inside that file place the following code:
```js
const PRIVATE_KEY = "your_key";

export { PRIVATE_KEY };
```

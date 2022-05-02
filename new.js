const axios = require('axios');
const cheerio = require('cheerio');

const main = async () => {
  try {
    let req = await axios.get('https://looksrare.org/collections/0xF661D58cfE893993b11D53d11148c4650590C692?queryID=f6aea3196be40bd140f94730dc1fb106&queryIndex=prod_tokens');
    let tree = cheerio.load(req.data);

    console.log(tree);
  } catch (err) {
    console.log(JSON.stringify(err));
  }
}

main()
.then('-----');

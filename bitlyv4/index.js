const axios = require('axios');

const BITLY_ACCESS_TOKEN = process.env.BITLY_KEY || "";

(async () => {
  try {
    const endpoint = 'https://api-ssl.bitly.com/v4';
    const url = `${endpoint}/shorten`;

    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${BITLY_ACCESS_TOKEN}`
      }
    };

    const params = {
      long_url: 'https://www.meganii.com/'
    };

    const res = await axios.post(url, params, options);
    console.log(res.data.link);

  } catch (error) {
    console.log(error.response.body);
  }
})();



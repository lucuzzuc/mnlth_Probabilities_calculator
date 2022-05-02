const axios = require('axios');

// axios.get('https://api.opensea.io/api/v1/collection/rtfkt-mnlth?format=json')
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   })
//   .then(() => {
//     console.log(`ok.`);
//   })

let items = {
  mnlth: {
    slug: 'rtfkt-mnlth',
    floorPrice: 0,
  },
  mnlth2: {
    slug: 'rtfktmonolith',
    floorPrice: 0,
  },
  dunkGenesis: {
    slug: '',
    floorPrice: 0,
    traits: {
      human: {
        supply: 0,
        floorPrice: 0
      },
      robot: {
        supply: 0,
        floorPrice: 0
      },
      demon: {
        supply: 0,
        floorPrice: 0
      },
      angel: {
        supply: 0,
        floorPrice: 0
      },
      reptile: {
        supply: 0,
        floorPrice: 0
      },
      undead: {
        supply: 0,
        floorPrice: 0
      },
      murakami: {
        supply: 0,
        floorPrice: 0
      },
      alien: {
        supply: 0,
        floorPrice: 0
      }
    }
  },
  skinVial: {
    slug: '',
    floorPrice: 0,
    traits: {
      human: {
        supply: 0,
        floorPrice: 0
      },
      robot: {
        supply: 0,
        floorPrice: 0
      },
      demon: {
        supply: 0,
        floorPrice: 0
      },
      angel: {
        supply: 0,
        floorPrice: 0
      },
      reptile: {
        supply: 0,
        floorPrice: 0
      },
      undead: {
        supply: 0,
        floorPrice: 0
      },
      murakami: {
        supply: 0,
        floorPrice: 0
      },
      alien: {
        supply: 0,
        floorPrice: 0
      }
    }
  }
}

const updateMnlth = (data) => {
  items.mnlth.floorPrice = data.collection.stats.floor_price;
};

const updateMnlth2 = (data) => {
  items.mnlth2.floorPrice = data.collection.stats.floor_price;
};

const updateGenesisDunk= (data) => {
  // console.log(JSON.stringify(data));
  items.dunkGenesis.floorPrice = data.collection.stats.floor_price;
  items.dunkGenesis.traits = data.collection.traits.DNA;
};

const updateSkinVial= (data) => {
  // console.log(JSON.stringify(data));
  items.skinVial.floorPrice = data.collection.stats.floor_price;
  items.skinVial.traits = data.collection.traits.DNA;
};

const updateItems = async () => {
  try {
    let mnlthData = (await axios.get('https://api.opensea.io/api/v1/collection/rtfkt-mnlth?format=json')).data;
    let mnlth2Data = (await axios.get('https://api.opensea.io/api/v1/collection/rtfktmonolith?format=json')).data;
    let dunkGenesisData = (await axios.get('https://api.opensea.io/api/v1/collection/rtfkt-nike-cryptokicks?format=json')).data;
    let skinVialData = (await axios.get('https://api.opensea.io/api/v1/collection/skinvial-evox?format=json')).data;

    updateMnlth(mnlthData);
    updateMnlth2(mnlth2Data);
    updateGenesisDunk(dunkGenesisData);
    updateSkinVial(skinVialData);
    console.log(items);
  } catch (err) {
    console.log(err);
  }
}

updateItems()
  .then(() => console.log('END'));

return ;

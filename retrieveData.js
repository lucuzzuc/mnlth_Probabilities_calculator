const puppeteer = require('puppeteer');
const { performance } = require('perf_hooks');

const selectors = {
  floorPrice: '#main > div > div > div.CollectionHeaderreact__DivContainer-sc-1woywpk-0.jgfqaE > div.Blockreact__Block-sc-1xf18x6-0.Flexreact__Flex-sc-1twd32i-0.fZLRIh.jYqxGr > div:nth-child(5) > div > div:nth-child(3) > a > div > div.Blockreact__Block-sc-1xf18x6-0.Flexreact__Flex-sc-1twd32i-0.elqhCm.jYqxGr.Info--icon > div > span > div',
  supply: '#main > div > div > div.Blockreact__Block-sc-1xf18x6-0.elqhCm > div > div > div > div.AssetSearchView--results.collection--results > div.Blockreact__Block-sc-1xf18x6-0.fbumkB > div > p',
  firstListingPrice: '#main > div > div > div.Blockreact__Block-sc-1xf18x6-0.elqhCm > div > div > div > div.AssetSearchView--results.collection--results > div.Blockreact__Block-sc-1xf18x6-0.elqhCm.AssetsSearchView--assets > div.fresnel-container.fresnel-greaterThanOrEqual-sm > div > div > div:nth-child(1) > div > article > a > div.Blockreact__Block-sc-1xf18x6-0.Flexreact__Flex-sc-1twd32i-0.SpaceBetweenreact__SpaceBetween-sc-jjxyhg-0.AssetCardFooterreact__StyledContainer-sc-nedjig-0.kLMBbO.jYqxGr.gJwgfT.cBTfDg > div > div.Blockreact__Block-sc-1xf18x6-0.Flexreact__Flex-sc-1twd32i-0.FlexColumnreact__FlexColumn-sc-1wwz3hp-0.hrRSNm.jYqxGr.ksFzlZ > div.AssetCardFooter--price > div',
  buyNow: '#Body\\ react-aria-2 > div > div > button:nth-child(1)',
  dunkGenesis: {
    humanBox: '#Body\\ react-aria-12 > div > div > div.Scrollboxreact__DivContainer-sc-1b04elr-0.gUuGNP.StringTraitFilter--results > div > button:nth-child(1)',
    robotBox: '#Body\\ react-aria-12 > div > div > div.Scrollboxreact__DivContainer-sc-1b04elr-0.gUuGNP.StringTraitFilter--results > div > button:nth-child(2)',
    angelBox: '#Body\\ react-aria-12 > div > div > div.Scrollboxreact__DivContainer-sc-1b04elr-0.gUuGNP.StringTraitFilter--results > div > button:nth-child(3)',
    demonBox: '#Body\\ react-aria-12 > div > div > div.Scrollboxreact__DivContainer-sc-1b04elr-0.gUuGNP.StringTraitFilter--results > div > button:nth-child(4)',
    reptileBox: '#Body\\ react-aria-12 > div > div > div.Scrollboxreact__DivContainer-sc-1b04elr-0.gUuGNP.StringTraitFilter--results > div > button:nth-child(5)',
    undeadBox: '#Body\\ react-aria-12 > div > div > div.Scrollboxreact__DivContainer-sc-1b04elr-0.gUuGNP.StringTraitFilter--results > div > button:nth-child(6)',
    murakamiBox: '#Body\\ react-aria-12 > div > div > div.Scrollboxreact__DivContainer-sc-1b04elr-0.gUuGNP.StringTraitFilter--results > div > button:nth-child(7)',
    alienBox: '#Body\\ react-aria-12 > div > div > div.Scrollboxreact__DivContainer-sc-1b04elr-0.gUuGNP.StringTraitFilter--results > div > button:nth-child(8)'
  }
}

let mnlth = {
  floorPrice: 0
};

let mnlth2 = {
  floorPrice: 0
};

let dunkGenesis = {
  floorPrice: 0,
  supply: 0,
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
    },
  }
};

let skinVial = {
  floorPrice: 0,
  supply: 0,
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
    },
  }
};

const delay = (time) => {
  return new Promise(function(resolve) {
    setTimeout(resolve, time)
  });
}

const retrieveMnlthData = async (page) => {
  await page.goto('https://opensea.io/collection/rtfkt-mnlth');

  mnlth.floorPrice = await page.$eval(selectors.floorPrice, e => parseFloat(e.textContent));
}

const retrieveMnlth2Data = async (page) => {
  await page.goto('https://opensea.io/collection/rtfktmonolith');

  mnlth2.floorPrice = await page.$eval(selectors.floorPrice, e => parseFloat(e.textContent));
}

const retrieveSupply = async (page) => await page.$eval(selectors.supply, e => e.textContent);

const retrieveFirstListingPrice = async (page) =>
  await page.$eval(selectors.firstListingPrice, e => e.textContent);

const retrieveTraitsData = async (page, collectionSlug, itemToUpdate, traitKey, traitValue) => {
  const url = `https://opensea.io/collection/${collectionSlug}?search[sortAscending]=true&search[sortBy]=PRICE&search[stringTraits][0][name]=${traitKey}&search[stringTraits][0][values][0]=${traitValue}`;

  try {
    await page.goto(url);
    const totalSupply = await retrieveSupply(page);
    await page.$eval(selectors.buyNow, button => button.click());
    await delay(1500);
    const floorPrice = await retrieveFirstListingPrice(page);

    itemToUpdate.supply = totalSupply;
    itemToUpdate.floorPrice = floorPrice;
  } catch (err) {
    console.log(err);
  }
}

const retrieveDunkGenesisData = async (page) => {
  try {
    const collectionSlug = 'rtfkt-nike-cryptokicks';
    const url = `https://opensea.io/collection/${collectionSlug}`;
    await page.goto(url);

    dunkGenesis.floorPrice = await page.$eval(selectors.floorPrice, e => e.textContent);
    dunkGenesis.supply = await page.$eval(selectors.supply, e => e.textContent);

    await retrieveTraitsData(page, collectionSlug, dunkGenesis.traits.human, "DNA", "HUMAN");
    await retrieveTraitsData(page, collectionSlug, dunkGenesis.traits.robot, "DNA", "ROBOT");
    await retrieveTraitsData(page, collectionSlug, dunkGenesis.traits.demon, "DNA", "DEMON");
    await retrieveTraitsData(page, collectionSlug, dunkGenesis.traits.angel, "DNA", "ANGEL");
    await retrieveTraitsData(page, collectionSlug, dunkGenesis.traits.reptile, "DNA", "REPTILE");
    await retrieveTraitsData(page, collectionSlug, dunkGenesis.traits.undead, "DNA", "UNDEAD");
    await retrieveTraitsData(page, collectionSlug, dunkGenesis.traits.murakami, "DNA", "MURAKAMI");
    await retrieveTraitsData(page, collectionSlug, dunkGenesis.traits.alien, "DNA", "ALIEN");
  } catch (err) {
    console.log(err);
  }
}

const retrieveSkinVialData = async (page) => {
  try {
    const collectionSlug = 'skinvial-evox';
    const url = `https://opensea.io/collection/${collectionSlug}`;
    await page.goto(url);

    skinVial.floorPrice = await page.$eval(selectors.floorPrice, e => e.textContent);
    skinVial.supply = await page.$eval(selectors.supply, e => e.textContent);

    await retrieveTraitsData(page, collectionSlug, skinVial.traits.human, "DNA", "HUMAN");
    await retrieveTraitsData(page, collectionSlug, skinVial.traits.robot, "DNA", "ROBOT");
    await retrieveTraitsData(page, collectionSlug, skinVial.traits.demon, "DNA", "DEMON");
    await retrieveTraitsData(page, collectionSlug, skinVial.traits.angel, "DNA", "ANGEL");
    await retrieveTraitsData(page, collectionSlug, skinVial.traits.reptile, "DNA", "REPTILE");
    await retrieveTraitsData(page, collectionSlug, skinVial.traits.undead, "DNA", "UNDEAD");
    await retrieveTraitsData(page, collectionSlug, skinVial.traits.murakami, "DNA", "MURAKAMI");
    await retrieveTraitsData(page, collectionSlug, skinVial.traits.alien, "DNA", "ALIEN");
  } catch (err) {
    console.log(err);
  }
}
(async () => {
  const start = performance.now();

  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();

  await retrieveMnlthData(page);
  await retrieveMnlth2Data(page);
  await retrieveDunkGenesisData(page);
  await retrieveSkinVialData(page);

  await browser.close();
  const data = {
    mnlth,
    mnlth2,
    dunkGenesis,
    skinVial
  }
  console.log(JSON.stringify(data));

  const duration = performance.now() - start;
  console.log(duration);
})();

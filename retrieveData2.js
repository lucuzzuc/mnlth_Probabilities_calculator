const puppeteer = require('puppeteer');
const { performance } = require('perf_hooks');

const selectors = {
  buyNow: '#Body\\ react-aria-2 > div > div > button:nth-child(1)',
  clearFilter: '#main > div > div > div.Blockreact__Block-sc-1xf18x6-0.elqhCm > div > div > div > div.AssetSearchView--results.collection--results > div.AssetSearchView--results-header-pills > div > button',
  dunkGenesis: {
    humanBox: '#Body\\ react-aria-12 > div > div > div.Scrollboxreact__DivContainer-sc-1b04elr-0.gUuGNP.StringTraitFilter--results > div > button:nth-child(1)',
    robotBox: '#Body\\ react-aria-12 > div > div > div.Scrollboxreact__DivContainer-sc-1b04elr-0.gUuGNP.StringTraitFilter--results > div > button:nth-child(2)',
    angelBox: '#Body\\ react-aria-12 > div > div > div.Scrollboxreact__DivContainer-sc-1b04elr-0.gUuGNP.StringTraitFilter--results > div > button:nth-child(3)',
    demonBox: '#Body\\ react-aria-12 > div > div > div.Scrollboxreact__DivContainer-sc-1b04elr-0.gUuGNP.StringTraitFilter--results > div > button:nth-child(4)',
    reptileBox: '#Body\\ react-aria-12 > div > div > div.Scrollboxreact__DivContainer-sc-1b04elr-0.gUuGNP.StringTraitFilter--results > div > button:nth-child(5)',
    undeadBox: '#Body\\ react-aria-12 > div > div > div.Scrollboxreact__DivContainer-sc-1b04elr-0.gUuGNP.StringTraitFilter--results > div > button:nth-child(6)',
    murakamiBox: '#Body\\ react-aria-12 > div > div > div.Scrollboxreact__DivContainer-sc-1b04elr-0.gUuGNP.StringTraitFilter--results > div > button:nth-child(7)',
    alienBox: '#Body\\ react-aria-12 > div > div > div.Scrollboxreact__DivContainer-sc-1b04elr-0.gUuGNP.StringTraitFilter--results > div > button:nth-child(8)'
  },
  firstListingPrice: '#main > div > div > div.Blockreact__Block-sc-1xf18x6-0.elqhCm > div > div > div > div.AssetSearchView--results.collection--results > div.Blockreact__Block-sc-1xf18x6-0.elqhCm.AssetsSearchView--assets > div.fresnel-container.fresnel-greaterThanOrEqual-sm > div > div > div:nth-child(1) > div > article > a > div.Blockreact__Block-sc-1xf18x6-0.Flexreact__Flex-sc-1twd32i-0.SpaceBetweenreact__SpaceBetween-sc-jjxyhg-0.AssetCardFooterreact__StyledContainer-sc-nedjig-0.kLMBbO.jYqxGr.gJwgfT.cBTfDg > div > div.Blockreact__Block-sc-1xf18x6-0.Flexreact__Flex-sc-1twd32i-0.FlexColumnreact__FlexColumn-sc-1wwz3hp-0.hrRSNm.jYqxGr.ksFzlZ > div.AssetCardFooter--price > div',
  floorPrice: '#main > div > div > div.CollectionHeaderreact__DivContainer-sc-1woywpk-0.jgfqaE > div.Blockreact__Block-sc-1xf18x6-0.Flexreact__Flex-sc-1twd32i-0.fZLRIh.jYqxGr > div:nth-child(5) > div > div:nth-child(3) > a > div > div.Blockreact__Block-sc-1xf18x6-0.Flexreact__Flex-sc-1twd32i-0.elqhCm.jYqxGr.Info--icon > div > span > div',
  skinVial: {
    humanBox: '#Body\\ react-aria-10 > div > div > div.Scrollboxreact__DivContainer-sc-1b04elr-0.gUuGNP.StringTraitFilter--results > div > button:nth-child(1)',
    robotBox: '#Body\\ react-aria-10 > div > div > div.Scrollboxreact__DivContainer-sc-1b04elr-0.gUuGNP.StringTraitFilter--results > div > button:nth-child(2)',
    angelBox: '#Body\\ react-aria-10 > div > div > div.Scrollboxreact__DivContainer-sc-1b04elr-0.gUuGNP.StringTraitFilter--results > div > button:nth-child(3)',
    demonBox: '#Body\\ react-aria-10 > div > div > div.Scrollboxreact__DivContainer-sc-1b04elr-0.gUuGNP.StringTraitFilter--results > div > button:nth-child(4)',
    reptileBox: '#Body\\ react-aria-10 > div > div > div.Scrollboxreact__DivContainer-sc-1b04elr-0.gUuGNP.StringTraitFilter--results > div > button:nth-child(5)',
    undeadBox: '#Body\\ react-aria-10 > div > div > div.Scrollboxreact__DivContainer-sc-1b04elr-0.gUuGNP.StringTraitFilter--results > div > button:nth-child(6)',
    murakamiBox: '#Body\\ react-aria-10 > div > div > div.Scrollboxreact__DivContainer-sc-1b04elr-0.gUuGNP.StringTraitFilter--results > div > button:nth-child(7)',
    alienBox: '#Body\\ react-aria-10 > div > div > div.Scrollboxreact__DivContainer-sc-1b04elr-0.gUuGNP.StringTraitFilter--results > div > button:nth-child(8)'
  },
  supply: '#main > div > div > div.Blockreact__Block-sc-1xf18x6-0.elqhCm > div > div > div > div.AssetSearchView--results.collection--results > div.Blockreact__Block-sc-1xf18x6-0.fbumkB > div > p',
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
      floorPrice: 0,
      supply: 0,
      supplyListed: 0
    },
    robot: {
      floorPrice: 0,
      supply: 0,
      supplyListed: 0
    },
    demon: {
      floorPrice: 0,
      supply: 0,
      supplyListed: 0
    },
    angel: {
      floorPrice: 0,
      supply: 0,
      supplyListed: 0
    },
    reptile: {
      floorPrice: 0,
      supply: 0,
      supplyListed: 0
    },
    undead: {
      floorPrice: 0,
      supply: 0,
      supplyListed: 0
    },
    murakami: {
      floorPrice: 0,
      supply: 0,
      supplyListed: 0
    },
    alien: {
      floorPrice: 0,
      supply: 0,
      supplyListed: 0
    },
  }
};

let skinVial = {
  floorPrice: 0,
  supply: 0,
  traits: {
    human: {
      floorPrice: 0,
      supply: 0,
      supplyListed: 0
    },
    robot: {
      floorPrice: 0,
      supply: 0,
      supplyListed: 0
    },
    demon: {
      floorPrice: 0,
      supply: 0,
      supplyListed: 0
    },
    angel: {
      floorPrice: 0,
      supply: 0,
      supplyListed: 0
    },
    reptile: {
      floorPrice: 0,
      supply: 0,
      supplyListed: 0
    },
    undead: {
      floorPrice: 0,
      supply: 0,
      supplyListed: 0
    },
    murakami: {
      floorPrice: 0,
      supply: 0,
      supplyListed: 0
    },
    alien: {
      floorPrice: 0,
      supply: 0,
      supplyListed: 0
    },
  }
};

const retrieveMnlthData = async (page) => {
  await page.goto('https://opensea.io/collection/rtfkt-mnlth');

  mnlth.floorPrice = await page.$eval(selectors.floorPrice, e => parseFloat(e.textContent));
}

const retrieveMnlth2Data = async (page) => {
  await page.goto('https://opensea.io/collection/rtfktmonolith');

  mnlth2.floorPrice = await page.$eval(selectors.floorPrice, e => parseFloat(e.textContent));
}

const retrieveSupply = async (page) => {
  await page.waitForSelector(selectors.supply, {timeout: 5000});
  return await page.$eval(selectors.supply, e => e.textContent);
}

const retrieveFirstListingPrice = async (page) => {
  await page.waitForSelector(selectors.firstListingPrice, {timeout: 5000});
  return await page.$eval(selectors.firstListingPrice, e => e.textContent);
}

const clickSafe = async (page, button) => {
 await page.$eval(button, button => button.click());
 await page.waitFor(1000);
}

const retrieveTraitsData = async (page, selector, data) => {
  try {
    await clickSafe(page, selector);
    data.supply = await retrieveSupply(page);
    await clickSafe(page, selectors.buyNow);
    data.floorPrice = await retrieveFirstListingPrice(page);
    // data.supplyListed = await retrieveSupply(page);
    await clickSafe(page, selectors.clearFilter);
  } catch (err) {
    console.log(err);
  }
}

const retrieveDunkGenesisData = async (page) => {
  try {
    const collectionSlug = 'rtfkt-nike-cryptokicks';
    const url = `https://opensea.io/collection/${collectionSlug}?search[sortAscending]=true&search[sortBy]=PRICE`;
    await page.goto(url);

    dunkGenesis.floorPrice = await page.$eval(selectors.floorPrice, e => e.textContent);
    dunkGenesis.supply = await page.$eval(selectors.supply, e => e.textContent);

    await retrieveTraitsData(page, selectors.dunkGenesis.humanBox, dunkGenesis.traits.human);
    await retrieveTraitsData(page, selectors.dunkGenesis.robotBox, dunkGenesis.traits.robot);
    await retrieveTraitsData(page, selectors.dunkGenesis.demonBox, dunkGenesis.traits.demon);
    await retrieveTraitsData(page, selectors.dunkGenesis.angelBox, dunkGenesis.traits.angel);
    await retrieveTraitsData(page, selectors.dunkGenesis.reptileBox, dunkGenesis.traits.reptile);
    await retrieveTraitsData(page, selectors.dunkGenesis.undeadBox, dunkGenesis.traits.undead);
    await retrieveTraitsData(page, selectors.dunkGenesis.murakamiBox, dunkGenesis.traits.murakami);
    await retrieveTraitsData(page, selectors.dunkGenesis.alienBox, dunkGenesis.traits.alien);
  } catch (err) {
    console.log(err);
  }
}

const retrieveSkinVialData = async (page) => {
  try {
    const collectionSlug = 'skinvial-evox';
    const url = `https://opensea.io/collection/${collectionSlug}?search[sortAscending]=true&search[sortBy]=PRICE`;
    await page.goto(url);

    skinVial.floorPrice = await page.$eval(selectors.floorPrice, e => e.textContent);
    skinVial.supply = await page.$eval(selectors.supply, e => e.textContent);

    await retrieveTraitsData(page, selectors.skinVial.humanBox, skinVial.traits.human);
    await retrieveTraitsData(page, selectors.skinVial.robotBox, skinVial.traits.robot);
    await retrieveTraitsData(page, selectors.skinVial.demonBox, skinVial.traits.demon);
    await retrieveTraitsData(page, selectors.skinVial.angelBox, skinVial.traits.angel);
    await retrieveTraitsData(page, selectors.skinVial.reptileBox, skinVial.traits.reptile);
    await retrieveTraitsData(page, selectors.skinVial.undeadBox, skinVial.traits.undead);
    await retrieveTraitsData(page, selectors.skinVial.murakamiBox, skinVial.traits.murakami);
    await retrieveTraitsData(page, selectors.skinVial.alienBox, skinVial.traits.alien);
  } catch (err) {
    console.log(err);
  }
}

const retrieveData = async () => {
  const start = performance.now();
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();

  await retrieveMnlthData(page);
  await retrieveMnlth2Data(page);
  await retrieveSkinVialData(page);
  await retrieveDunkGenesisData(page);
  await browser.close();

  console.log(performance.now() - start);
  return ({
    mnlth,
    mnlth2,
    skinVial,
    dunkGenesis,
  });
}

(async () => {
  const data = await retrieveData();
  console.log(data);
  console.log(JSON.stringify(data));
  return ;
})();

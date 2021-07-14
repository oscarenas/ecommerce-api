const COMMA_SPLIT = new RegExp("[,]", "g");

const isPublished = (prod) => (prod === "TRUE" ? true : false);

const capitalizeString = (value) => value.charAt(0).toUpperCase() + value.slice(1);

const priceToNumber = (price) => Number(price.replace(/[^0-9-]+/g, ""));

const valueToBool = (value) =>
  value === "TRUE" || value === "FALSE" ? JSON.parse(value.toLowerCase()) : value;

const validateValue = (value, key) => {
  let tmpValue;
  if (value !== "") {
    switch (key) {
      case "gsx$categoria":
        tmpValue = valueToArray(value);

        break;
      case "gsx$valor-atributo-1":
        tmpValue = valueToArray(value);

        break;
      case "gsx$valor-atributo-2":
        tmpValue = valueToArray(value);

        break;

      case "gsx$precio-venta":
      case "gsx$precio-promo":
        tmpValue = priceToNumber(value);

        break;

      default:
        tmpValue = valueToBool(value);

        break;
    }

    return tmpValue;
  } else {
    return false;
  }
};

const setInfo = (obj) => {
  const skipValues = [
    "id",
    "updated",
    "title",
    "category",
    "content",
    "link",
    "link",
    "xmlns"
  ];

  let item = {};

  for (const [key, value] of Object.entries(obj)) {
    if (key === "gsx$publicado") {
      console.log("🚲");
    }
    if (!skipValues.includes(key)) {
      item[`${formatKeyName(key)}`] = validateValue(value.$t, key);
    }

  }
  return item;
};

const valueToArray = (value) =>
  value.split(COMMA_SPLIT).map((item) => item.toLowerCase().trim());

const formatKeyName = (key) => {
  const destructuredKey = key.split("gsx$")[1].split("-");
  let arr = destructuredKey.map((value, index) => {
    if (index) {
      return capitalizeString(value);
    }
    return value;
  });

  return arr.join("");
};

const getProducts = (data) => {
  return data.filter(data => {
    if (isPublished(data.gsx$publicado.$t)) {
      return data;
    }
  }).map(product => setInfo(product));
};

const getBanners = (data) => {
  return data.map(banner => setInfo(banner));
};

const getSeo = (data) => {
  return data.map(banner => setInfo(banner));
};

const URL_API_STORE = (id, apiKey) => {
  const tabId = `/${id}/`;
  return `${process.env.URL + apiKey + tabId + process.env.FORMAT + process.env.EXT
    }`;
};

const URL_STORE_SEO = (apiKey) => URL_API_STORE(1, apiKey);
const URL_STORE_PRODUCTS = (apiKey) => URL_API_STORE(2, apiKey);
const URL_STORE_BANNERS = (apiKey) => URL_API_STORE(3, apiKey);


module.exports = {
  getProducts,
  getBanners,
  getSeo,
  URL_API_STORE,
  URL_STORE_PRODUCTS,
  URL_STORE_BANNERS,
  URL_STORE_SEO
};

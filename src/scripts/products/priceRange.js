import { getElement } from "../assets";
import { openRequest } from "../openRequest";
import { API_URL, display } from "./displayProd";

const paramsCategory = (textId) => `category.id=${textId}`;
const paramsLow = `&$sort[price]=1&$select[]=price`;
const paramsHigh = `&$sort[price]=-1&$select[]=price`;

export function getPriceRange() {
  const ranges = document.querySelectorAll(".filters__input");
  const numbers = document.querySelectorAll(".filters__price span");
  const sortingButton = getElement(".products__sorting");
  ranges[1].style.background = `linear-gradient(to right, #000 0%, #000 100%)`;

  ranges.forEach((el) => {
    el.oninput = () => {
      let fill;
      let fill2;
      if (el == ranges[0]) {
        fill = ((el.value - el.min) / (el.max - el.min)) * 100;
        fill2 = ((ranges[1].value - el.min) / (el.max - el.min)) * 100;
        ranges[1].style.background = `linear-gradient(to right, #ececec 0%, #ececec ${fill}%, #000 ${fill}%, #000 ${fill2}%, #ececec ${fill2}%, #ececec 100%)`;
      } else if (el == ranges[1]) {
        fill = ((ranges[0].value - el.min) / (el.max - el.min)) * 100;

        fill2 = ((el.value - el.min) / (el.max - el.min)) * 100;
        el.style.background = `linear-gradient(to right, #ececec 0%, #ececec ${fill}%, #000 ${fill}%, #000 ${fill2}%, #ececec ${fill2}%, #ececec 100%)`;
      }

      let slide1 = parseFloat(ranges[0].value);
      let slide2 = parseFloat(ranges[1].value);

      if (slide1 > slide2) {
        [slide1, slide2] = [slide2, slide1];
      }
      numbers[0].innerHTML = `$${slide1}`;
      numbers[1].innerHTML = `$${slide2}`;
    };

    el.onchange = () => {
      let companies = document.querySelectorAll(".company__button");
      let company = "";
      companies.forEach((item) =>
        item.classList.contains("company__button_active")
          ? (company = item.innerHTML)
          : ""
      );

      let price = [ranges[0].value, ranges[1].value];
      if (company) {
        display(0, company, price, sortingButton, true);
      } else {
        display(0, "", price, sortingButton, true);
      }
    };
  });
}

export function getMaxPrice(price, textId, manufacturer) {
  const ranges = document.querySelectorAll(".filters__input");
  let link = "";
  let pricesRangeMax = new XMLHttpRequest();
  if (manufacturer) {
    link = `${API_URL}?${paramsCategory(
      textId
    )}&manufacturer=${manufacturer}${paramsHigh}`;

    pricesRangeMax.open = openRequest(pricesRangeMax, link);
  } else {
    link = `${API_URL}?${paramsCategory(textId)}${paramsHigh}`;
    pricesRangeMax.open = openRequest(pricesRangeMax, link);
  }
  pricesRangeMax.responseType = "json";
  pricesRangeMax.send();
  pricesRangeMax.onload = function() {
    let data = pricesRangeMax.response;

    ranges[1].max = Math.ceil(data.data[0].price);
    ranges[0].max = Math.ceil(data.data[0].price);
    ranges[1].value = Math.ceil(data.data[0].price);
    price[1].innerHTML = `$${Math.ceil(data.data[0].price)}`;
  };
}

export function getMinPrice(price, textId, manufacturer) {
  const ranges = document.querySelectorAll(".filters__input");
  let link = "";
  let pricesRangeMax = new XMLHttpRequest();
  if (manufacturer) {
    link = `${API_URL}?${paramsCategory(
      textId
    )}&manufacturer=${manufacturer}${paramsLow}`;

    pricesRangeMax.open = openRequest(pricesRangeMax, link);
  } else {
    link = `${API_URL}?${paramsCategory(textId)}${paramsLow}`;
    pricesRangeMax.open = openRequest(pricesRangeMax, link);
  }
  pricesRangeMax.responseType = "json";
  pricesRangeMax.send();
  pricesRangeMax.onload = function() {
    let data = pricesRangeMax.response;
    ranges[1].min = Math.floor(data.data[0].price);
    ranges[0].min = Math.floor(data.data[0].price);
    ranges[0].value = Math.floor(data.data[0].price);
    price[0].innerHTML = `$${Math.floor(data.data[0].price)}`;
  };
}

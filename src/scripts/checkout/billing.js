import { getElement } from "../assets";
import * as $ from "jquery";

// hide billing section if cash is checked, show if credit

const cash = getElement("#cash");
const card = getElement("#credit");
const billing = getElement(".billing");

$(billing).hide();

let options = [cash, card];

options.forEach((option) => {
  option.onclick = () => {
    switch (option) {
      case cash:
        $(billing).hide(300);
        break;
      case card:
        $(billing).show(300);
        break;
    }
  };
});

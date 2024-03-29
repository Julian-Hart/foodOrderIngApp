import { menuArray } from "/data/menuData.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

const menuItemListDiv = document.getElementById("menu-item-list");
const orderListDiv = document.getElementById("order-item-list");
const orderPopup = document.getElementById("order-popup");

let orderList = [];

renderMenu(menuArray);

function renderMenu(menuArr) {
  const menuHtml = menuArr
    .map((menuItem) => {
      const { name, ingredients, price, id } = menuItem;
      return `
        <div id="menu-item-list">
          <div class="menu-item">
            <img src="images/item graphic${id + 1}.png" class="menu-item-img" />
            <div class="menu-item-text">
              <h2>${name}</h2>
              <p>${ingredients.join(", ")}</p>
              <h3>&dollar;${price}</h3>
            </div>
            <img
              src="images/add-btn.png"
              alt="Add Button"
              class="add-btn"
              data-menu-item-id="${id}"
            />
          </div>
    `;
    })
    .join("");
  menuItemListDiv.innerHTML = menuHtml;
  const addBtns = document.querySelectorAll(".add-btn");
  addBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      addToOrder(e.target.dataset.menuItemId, menuArr);
    });
  });
}

function renderOrder() {
  const orderHtml = orderList
    .map(function (item) {
      const { itemName, itemPrice, uuid } = item;
      return `
            <div class="order-item" data-uuid="${uuid}">
              <h2>${itemName}</h2>
              <p class="remove-btn">remove</p>
              <h3 class="order-item-price">$${itemPrice}</h3>
            </div>`;
    })
    .join("");
  orderListDiv.innerHTML = orderHtml;
  orderList.length > 0
    ? (orderPopup.style.display = "block")
    : (orderPopup.style.display = "none");

  renderTotalPrice();

  const removeBtns = document.querySelectorAll(".remove-btn");
  removeBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      const itemToRemove = orderList.find(function (item) {
        return item.uuid == e.target.parentNode.dataset.uuid;
      });
      const index = orderList.indexOf(itemToRemove);
      orderList.splice(index, 1);
      renderOrder();
    });
  });
}

function renderTotalPrice() {
  const totalPrice = orderList.reduce(function (currentPrice, nextPrice) {
    return (currentPrice += nextPrice.itemPrice);
  }, 0);
  document.getElementById("total-price").innerHTML = "$" + totalPrice;
}

function addToOrder(itemId, menuArr) {
  let { name, price } = menuArr[itemId];
  orderList.push({
    itemName: name,
    itemPrice: price,
    uuid: uuidv4(),
  });
  console.log(orderList);
  renderOrder();
}

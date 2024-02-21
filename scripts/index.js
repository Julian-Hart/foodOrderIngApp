import { menuArray } from "/data/menuData.js";

const menuItemList = document.getElementById("menu-item-list");

function render(menuArr) {
  const menuHtml = menuArr
    .map((menuItem) => {
      let { name, ingredients, price, id } = menuItem;
      return `
        <div id="menu-item-list">
          <div class="menu-item">
            <img src="images/item graphic.png" class="menu-item-img" />
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
  menuItemList.innerHTML = menuHtml;
}

render(menuArray);

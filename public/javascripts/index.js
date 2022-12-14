"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const childTable = document.querySelector(".childrenTable");
const wishContainer = document.querySelector(".wishTableContainer");
window.addEventListener("load", async () => {
    const response = await fetch("/wishlist/children", {
        method: "GET",
    });
    const children = await response.json();
    children.forEach((child) => {
        let tr = document.createElement("tr");
        tr.innerHTML = `<td>${child.name}</td><td>${child.age}</td>`;
        childTable.appendChild(tr);
        tr.addEventListener("click", async () => {
            await displayWishes(child);
        });
    });
});
const displayWishes = async (child) => {
    wishContainer.innerHTML = "";
    let table = `<h2>Wishes for ${child.name}</h2>`;
    table += `<table><tr><td><b>Name</b></td><td><b>URL</b></td><td><b>Image</b></td></tr>`;
    child.wishes.forEach((wish) => {
        table += `<tr>
        <td>${wish.name}</td>
        <td><a href=${wish.url}>Link</a></td>
        <td><img height="120" width="120" src="${wish.img_url}"></td>
        </tr>`;
    });
    table += "</table>";
    wishContainer.innerHTML = table;
};

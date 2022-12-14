"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const addChild = async () => {
    let name = document.querySelector("#name").value;
    let age = +document.querySelector("#age").value;
    console.log(name + " " + age);
    if (name?.length && age > 0) {
    }
};

import { IChild, IWish } from "../../interfaces/interfaces";

const addChild = async () => {
    let name = (document.querySelector("#name") as HTMLInputElement).value;
    let age = +(document.querySelector("#age") as HTMLInputElement).value;
    console.log(name + " " + age);
    if (name?.length && age > 0) {
    }
};

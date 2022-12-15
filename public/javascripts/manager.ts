import { IChild, IWish } from "../../interfaces/interfaces";
const childStatus = document.querySelector(".childStatus");
const wishStatus = document.querySelector(".wishStatus");
const childSelect = document.querySelector("#childSelect") as HTMLSelectElement;

window.addEventListener("load", async () => {
    await loadSelect();
});

const loadSelect = async () => {
    const response = await fetch("/wishlist/children", {
        method: "GET",
    });

    let children: IChild[] = await response.json();

    childSelect.options.length = 0;
    children.forEach((child) => {
        childSelect.add(new Option(child.name, JSON.stringify(child)));
    });
};

const addChild = async () => {
    let name = (document.querySelector("#name") as HTMLInputElement).value;
    let age = +(document.querySelector("#age") as HTMLInputElement).value;

    if (name?.length && age > 0) {
        const response = await fetch("/children", {
            method: "POST",
            body: JSON.stringify({
                id: -1,
                name: name,
                age: age,
                wishes: [],
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            childStatus.classList.add("error");
            childStatus.innerHTML =
                "Failed with status code " + response.status;
        } else {
            await loadSelect();
            childStatus.innerHTML = "Child created!";
            childStatus.classList.add("success");
        }
    } else {
        childStatus.classList.add("error");
        childStatus.innerHTML = "Invalid Input!";
    }
};

const addWish = async () => {
    let child: IChild = JSON.parse(childSelect.value);
    let name = (document.querySelector("#wishName") as HTMLInputElement).value;
    let url = (document.querySelector("#wishURL") as HTMLInputElement).value;
    let imgUrl = (document.querySelector("#wishImgURL") as HTMLInputElement)
        .value;

    console.log(child);

    if (name?.length && url?.length && imgUrl?.length && child) {
        const response = await fetch(`children/${child.id}/wishes`, {
            method: "POST",
            body: JSON.stringify({
                id: child.id,
                name: name,
                url: url,
                img_url: imgUrl,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            wishStatus.classList.add("error");
            wishStatus.innerHTML = "Failed with status code " + response.status;
        } else {
            wishStatus.innerHTML = "Wish created!";
            wishStatus.classList.add("success");
        }
    } else {
        wishStatus.classList.add("error");
        wishStatus.innerHTML = "Invalid Input";
    }
};

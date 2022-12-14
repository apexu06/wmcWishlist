"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
let latestChildID = 3;
let latestWishID = 4;
const childrenArray = [
    {
        id: 1,
        name: "John",
        age: 5,
        wishes: [
            {
                id: 1,
                name: "Car",
                url: "https://www.autobild.de/artikel/apple-car-2024-auto-elektrohyundai-kia-reichweite-18698301.html",
                img_url: "https://i.auto-bild.de/ir_img/2/7/0/5/0/3/7/2-APPLE-CAR-2-iMac-G3-92c755da09344228.jpg?impolicy=leadteaser",
            },
            {
                id: 2,
                name: "Bike",
                url: "https://www.wired.com/review/jackrabbit-bike/",
                img_url: "https://media.wired.com/photos/61afb902c2f5f4d2aaf1c249/master/w_1600,c_limit/Gear-Jackbrabbit-Bike-Lifestyle-1.jpg",
            },
        ],
    },
    {
        id: 2,
        name: "Theo",
        age: 8,
        wishes: [
            {
                id: 3,
                name: "Switch",
                url: "https://www.nintendo.at/Hardware/Nintendo-Switch-Familie/Nintendo Switch/Nintendo-Switch-1148779.html",
                img_url: "https://www.techspot.com/images2/news/bigimage/2017/03/2017-03-01-image-7.jpg",
            },
        ],
    },
];
router.get("/wishlist/children", function (req, res, next) {
    res.status(200).send(childrenArray);
});
router.get("/children/:id/wishes", (req, res) => {
    const id = +req.params.id;
    const child = childrenArray.find((child) => {
        return child.id === id;
    });
    if (child) {
        res.status(200).send(child.wishes);
    }
    else {
        res.status(404).send("Child not found!");
    }
});
router.post("/children", (req, res) => {
    const newChild = req.body;
    newChild.id = latestChildID;
    latestChildID++;
    childrenArray.push(newChild);
    res.status(201).send(JSON.stringify(newChild));
});
router.post("/children/:id/wishes", (req, res) => {
    const id = +req.params.id;
    const newWish = req.body;
    newWish.id = latestWishID;
    latestWishID++;
    const child = childrenArray.find((child) => {
        return child.id === id;
    });
    if (child) {
        child.wishes.push(newWish);
        res.status(201).send(JSON.stringify(newWish));
    }
    else {
        res.status(404).send("Child not found!");
        latestChildID--;
    }
});
module.exports = router;

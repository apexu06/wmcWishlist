"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var childStatus = document.querySelector(".childStatus");
var wishStatus = document.querySelector(".wishStatus");
var childSelect = document.querySelector("#childSelect");
window.addEventListener("load", function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, loadSelect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
var loadSelect = function () { return __awaiter(void 0, void 0, void 0, function () {
    var response, children;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch("/wishlist/children", {
                    method: "GET",
                })];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                children = _a.sent();
                childSelect.options.length = 0;
                children.forEach(function (child) {
                    childSelect.add(new Option(child.name, JSON.stringify(child)));
                });
                return [2 /*return*/];
        }
    });
}); };
var addChild = function () { return __awaiter(void 0, void 0, void 0, function () {
    var name, age, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                name = document.querySelector("#name").value;
                age = +document.querySelector("#age").value;
                if (!((name === null || name === void 0 ? void 0 : name.length) && age > 0)) return [3 /*break*/, 5];
                return [4 /*yield*/, fetch("/children", {
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
                    })];
            case 1:
                response = _a.sent();
                if (!!response.ok) return [3 /*break*/, 2];
                childStatus.classList.add("error");
                childStatus.innerHTML =
                    "Failed with status code " + response.status;
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, loadSelect()];
            case 3:
                _a.sent();
                childStatus.innerHTML = "Child created!";
                childStatus.classList.add("success");
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                childStatus.classList.add("error");
                childStatus.innerHTML = "Invalid Input!";
                _a.label = 6;
            case 6: return [2 /*return*/];
        }
    });
}); };
var addWish = function () { return __awaiter(void 0, void 0, void 0, function () {
    var child, name, url, imgUrl, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                child = JSON.parse(childSelect.value);
                name = document.querySelector("#wishName").value;
                url = document.querySelector("#wishURL").value;
                imgUrl = document.querySelector("#wishImgURL")
                    .value;
                console.log(child);
                if (!((name === null || name === void 0 ? void 0 : name.length) && (url === null || url === void 0 ? void 0 : url.length) && (imgUrl === null || imgUrl === void 0 ? void 0 : imgUrl.length) && child)) return [3 /*break*/, 2];
                return [4 /*yield*/, fetch("children/".concat(child.id, "/wishes"), {
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
                    })];
            case 1:
                response = _a.sent();
                if (!response.ok) {
                    wishStatus.classList.add("error");
                    wishStatus.innerHTML = "Failed with status code " + response.status;
                }
                else {
                    wishStatus.innerHTML = "Wish created!";
                    wishStatus.classList.add("success");
                }
                return [3 /*break*/, 3];
            case 2:
                wishStatus.classList.add("error");
                wishStatus.innerHTML = "Invalid Input";
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); };

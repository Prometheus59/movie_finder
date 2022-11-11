"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var app = (0, express_1.default)();
app.get("/", function (req, res, next) {
    try {
        res.send("Hello World!");
    }
    catch (error) {
        next(error);
    }
});
var PORT = 3000;
app.listen(PORT, function () {
    console.log("App listening on port ".concat(PORT));
});

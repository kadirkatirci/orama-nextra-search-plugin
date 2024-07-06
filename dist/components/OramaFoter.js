import React from "react";
import { attributionLi, attributionP } from "../utils/classNames.js";
export var OramaFooter = function(param) {
    var results = param.results;
    return /*#__PURE__*/ React.createElement("li", {
        className: attributionLi,
        style: {
            transform: "translate(0px, 11px)"
        }
    }, /*#__PURE__*/ React.createElement("p", {
        className: attributionP
    }, /*#__PURE__*/ React.createElement("b", null, results.count), " sonuç", results.count > 1 && " ", " bulundu", " ", /*#__PURE__*/ React.createElement("b", null, results.elapsed.formatted), ". ", " ", /*#__PURE__*/ React.createElement("a", {
        href: "/docs/",
        target: "_blank",
        className: "nx-text-primary-600"
    }, /*#__PURE__*/ React.createElement("b", null, "Dökümantasyon"))));
};

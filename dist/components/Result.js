function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
}
function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
import React, { useState } from "react";
import { listItem, resultText } from "../utils/classNames.js";
import NextLink from "next/link.js";
import { HighlightedDocument } from "./HighlightedDocument.js";
export var SearchResult = function(param) {
    var document = param.document, positions = param.positions;
    var _useState = _slicedToArray(useState(false), 2), hovered = _useState[0], setHovered = _useState[1];
    return /*#__PURE__*/ React.createElement("li", {
        key: document.url,
        className: "".concat(listItem, " ").concat(hovered ? "nx-bg-primary-500/10" : ""),
        onMouseOver: function() {
            return setHovered(true);
        },
        onMouseOut: function() {
            return setHovered(false);
        }
    }, /*#__PURE__*/ React.createElement(NextLink, {
        href: document.url,
        className: "nx-block nx-scroll-m-12 nx-px-2.5 nx-py-2"
    }, /*#__PURE__*/ React.createElement("div", {
        className: resultText
    }, /*#__PURE__*/ React.createElement(HighlightedDocument, {
        hit: {
            document: document,
            positions: positions
        }
    }))));
};

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
import { useRouter } from "next/router.js";
import { useEffect, useState } from "react";
export var useFocus = function(param) {
    var inputRef = param.inputRef;
    var asPath = useRouter().asPath;
    var _useState = _slicedToArray(useState(false), 2), hasFocus = _useState[0], setHasFocus = _useState[1];
    // If the user presses ESC, we close the search box
    useEffect(function() {
        if (document.activeElement === inputRef.current) {
            setHasFocus(true);
        } else {
            setHasFocus(false);
        }
    }, []);
    useEffect(function() {
        var onKeyDownHandler = function(event) {
            if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
                var _inputRef_current;
                event.preventDefault();
                (_inputRef_current = inputRef.current) === null || _inputRef_current === void 0 ? void 0 : _inputRef_current.focus();
                setHasFocus(true);
            }
        };
        window.addEventListener("keydown", onKeyDownHandler);
        return function() {
            window.removeEventListener("keydown", onKeyDownHandler);
        };
    }, []);
    // If the path changes, we close the search box
    useEffect(function() {
        setHasFocus(false);
    }, [
        asPath
    ]);
    return {
        hasFocus: hasFocus,
        setHasFocus: setHasFocus
    };
};

function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
}
function _extends() {
    _extends = Object.assign || function(target) {
        for(var i = 1; i < arguments.length; i++){
            var source = arguments[i];
            for(var key in source){
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };
    return _extends.apply(this, arguments);
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
function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};
    var target = _objectWithoutPropertiesLoose(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for(i = 0; i < sourceSymbolKeys.length; i++){
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
        }
    }
    return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for(i = 0; i < sourceKeys.length; i++){
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
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
import { searchWithHighlight } from "@orama/plugin-match-highlight";
import { useRouter } from "next/compat/router.js";
import React, { useEffect, useRef, useState } from "react";
import { groupDocumentsBy } from "./utils/index.js";
import { inputStyles, inputWrapper, kbdStyles, titleDiv, wrapperDiv, wrapperUl } from "./utils/classNames.js";
import { OramaFooter } from "./components/OramaFoter.js";
import { SearchResult } from "./components/Result.js";
import { useCreateOramaIndex } from "./utils/useCreateOramaIndex.js";
import { useFocus } from "./utils/useFocus.js";
var defaultProps = {
    limitResults: 30,
    boost: {
        title: 2,
        description: 1,
        content: 1
    }
};
export function OramaSearch() {
    var props = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : defaultProps;
    var router = useRouter();
    return (router === null || router === void 0 ? void 0 : router.isReady) ? /*#__PURE__*/ React.createElement(OramaSearchPlugin, _extends({}, props, {
        router: router
    })) : null;
}
function OramaSearchPlugin(_param) {
    var router = _param.router, props = _objectWithoutProperties(_param, [
        "router"
    ]);
    var inputRef = useRef(null);
    var wrapperRef = useRef(null);
    var indexes = useCreateOramaIndex().indexes;
    var _useFocus = useFocus({
        inputRef: inputRef
    }), hasFocus = _useFocus.hasFocus, setHasFocus = _useFocus.setHasFocus;
    var _useState = _slicedToArray(useState(""), 2), searchTerm = _useState[0], setSearchTerm = _useState[1];
    var _useState1 = _slicedToArray(useState(), 2), results = _useState1[0], setResults = _useState1[1];
    var _useState2 = _slicedToArray(useState({}), 2), groupedResults = _useState2[0], setGroupedResults = _useState2[1];
    var _router_locale = router.locale, locale = _router_locale === void 0 ? "en-US" : _router_locale, asPath = router.asPath;
    // If the path changes, we close the search box
    useEffect(function() {
        setSearchTerm("");
    }, [
        asPath
    ]);
    // If the user types something, we search for it
    useEffect(function() {
        if (searchTerm) {
            searchWithHighlight(indexes[locale], {
                term: searchTerm,
                mode: "fulltext",
                limit: props.limitResults,
                boost: props.boost
            }).then(function(results) {
                setResults(results);
                setGroupedResults(groupDocumentsBy(results.hits, "title"));
            });
        }
    }, [
        searchTerm
    ]);
    return /*#__PURE__*/ React.createElement("div", {
        className: wrapperDiv
    }, /*#__PURE__*/ React.createElement("div", {
        className: inputWrapper
    }, /*#__PURE__*/ React.createElement("input", {
        ref: inputRef,
        spellCheck: "false",
        type: "search",
        placeholder: "Size nasıl yardımcı olabilirim?",
        className: inputStyles,
        onChange: function(e) {
            return setSearchTerm(e.target.value);
        },
        value: searchTerm,
        onFocus: function() {
            return setHasFocus(true);
        },
        onBlur: function() {
            setHasFocus(false);
        }
    }), /*#__PURE__*/ React.createElement("kbd", {
        className: kbdStyles,
        title: "Clear"
    }, hasFocus ? "ESC" : /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement("span", {
        className: "nx-text-xs"
    }, "⌘"), " K"))), searchTerm && results && /*#__PURE__*/ React.createElement(React.Fragment, null, results.count === 0 && /*#__PURE__*/ React.createElement("div", {
        className: "nx-block nx-select-none nx-p-8 nx-text-center nx-text-sm nx-text-gray-400"
    }, "Sonuç bulunamadı."), results.count > 0 && /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement("div", {
        ref: wrapperRef
    }, /*#__PURE__*/ React.createElement("ul", {
        className: wrapperUl,
        style: {
            transition: "max-height 0.2s ease 0s"
        }
    }, Object.keys(groupedResults).map(function(title) {
        return /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement("div", {
            className: titleDiv,
            key: title
        }, title), groupedResults[title].map(function(param, i) {
            var document = param.document, positions = param.positions;
            return /*#__PURE__*/ React.createElement(SearchResult, {
                positions: positions,
                key: document.url + i,
                document: document
            });
        }));
    }), /*#__PURE__*/ React.createElement(OramaFooter, {
        results: results
    }))))));
}

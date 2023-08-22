"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkocl_bb_library"] = self["webpackChunkocl_bb_library"] || []).push([["js_templates_PeopleAndHousehold_jsx"],{

/***/ "./js/templates/PeopleAndHousehold.jsx":
/*!*********************************************!*\
  !*** ./js/templates/PeopleAndHousehold.jsx ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var _components_GenericDashboardSetup_helpers_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/GenericDashboardSetup/helpers/helpers */ \"./js/components/GenericDashboardSetup/helpers/helpers.js\");\n\n\nvar Footer = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {\n  return Promise.all(/*! import() */[__webpack_require__.e(\"vendors-node_modules_reactstrap_es_Fade_js-node_modules_babel_runtime_helpers_esm_assertThisI-9a4f1c\"), __webpack_require__.e(\"vendors-node_modules_react-popper_lib_esm_Popper_js-node_modules_reactstrap_es_Button_js\"), __webpack_require__.e(\"vendors-node_modules_reactstrap_es_Popover_js-node_modules_reactstrap_es_PopoverBody_js-node_-72dee4\"), __webpack_require__.e(\"js_components_Footer_jsx\")]).then(__webpack_require__.bind(__webpack_require__, /*! ../components/Footer */ \"./js/components/Footer.jsx\"));\n});\nvar Navigation_scoda = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {\n  return Promise.all(/*! import() */[__webpack_require__.e(\"vendors-node_modules_jquery_dist_jquery_js\"), __webpack_require__.e(\"js_components_Navigation_scoda_jsx\")]).then(__webpack_require__.bind(__webpack_require__, /*! ../components/Navigation_scoda */ \"./js/components/Navigation_scoda.jsx\"));\n});\nvar PeopleHousehold = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {\n  return Promise.all(/*! import() */[__webpack_require__.e(\"vendors-node_modules_jquery_dist_jquery_js\"), __webpack_require__.e(\"vendors-node_modules_reactstrap_es_Fade_js-node_modules_babel_runtime_helpers_esm_assertThisI-9a4f1c\"), __webpack_require__.e(\"vendors-node_modules_reactstrap_es_Modal_js\"), __webpack_require__.e(\"vendors-node_modules_chart_js_dist_Chart_js-node_modules_moment_locale_af_js-node_modules_mom-96435a\"), __webpack_require__.e(\"vendors-node_modules_react-popper_lib_esm_Popper_js-node_modules_reactstrap_es_Button_js\"), __webpack_require__.e(\"vendors-node_modules_css-loader_dist_runtime_api_js-node_modules_react-chartjs-2_es_index_js--eed459\"), __webpack_require__.e(\"vendors-node_modules_html-to-image_es_index_js-node_modules_reactstrap_es_ButtonDropdown_js-n-db2eeb\"), __webpack_require__.e(\"js_components_GenericDashboardSetup_GenericChart_jsx-node_modules_moment_locale_sync_recursive_\"), __webpack_require__.e(\"js_context_jsx\")]).then(__webpack_require__.bind(__webpack_require__, /*! ../components/GenericDashboardSetup/GenericChart */ \"./js/components/GenericDashboardSetup/GenericChart.jsx\"));\n});\nvar Home = function Home() {\n  var subNavContent = {\n    dropdownMenu: [{\n      name: \"Service Delivery\",\n      href: \"socr#/service_delivery\",\n      active: false\n    }, {\n      name: \"Citizen Engagement\",\n      href: \"socr#/citizen_engagement\",\n      active: false\n    }, {\n      name: \"Municipal Human Resources\",\n      href: \"socr#/human_resources\",\n      active: false\n    }, {\n      name: \"People and Households\",\n      href: \"socr#/people_household\",\n      active: true\n    }, {\n      name: \"Employment\",\n      href: \"socr#/employment\",\n      active: false\n    }, {\n      name: \"Dwellings\",\n      href: \"socr#/dwellings\",\n      active: false\n    }, {\n      name: \"Household Income\",\n      href: \"socr#/household_income\",\n      active: false\n    }, {\n      name: \"Food Security, Literacy and Inequality\",\n      href: \"socr#/food_security\",\n      active: false\n    }, {\n      name: \"Life Expectancy and Health\",\n      href: \"socr#/life_expectancy\",\n      active: false\n    }, {\n      name: \"Education\",\n      href: \"socr#/education\",\n      active: false\n    }, {\n      name: \"Sustainability\",\n      href: \"socr#/sustainability\",\n      active: false\n    }, {\n      name: \"ICT Infrastructure\",\n      href: \"socr#/infrastructure\",\n      active: false\n    }, {\n      name: \"Transport Mode\",\n      href: \"socr#/transport_mode\",\n      active: false\n    }, {\n      name: \"Public Transport Spend\",\n      href: \"socr#/public_transport_spend\",\n      active: false\n    }, {\n      name: \"Travel Time\",\n      href: \"socr#/travel_time\",\n      active: false\n    }]\n  };\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", {\n    className: \"socr--home\",\n    style: {\n      backgroundColor: \"white\",\n      overflowX: 'hidden'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Navigation_scoda, {\n    logoHide: false,\n    box_shadow: true\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(PeopleHousehold, {\n    indicator_ids: [704, \"n1\", 706, 699, 701, 711],\n    minYear: 2015,\n    maxYear: 2018,\n    subNavContent: subNavContent,\n    gridItems: 6,\n    dropdownName: subNavContent.dropdownMenu[3].name,\n    colors: _components_GenericDashboardSetup_helpers_helpers__WEBPACK_IMPORTED_MODULE_1__.peopleHouseholdColors\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Footer, null));\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Home);\n\n//# sourceURL=webpack://ocl_bb_library/./js/templates/PeopleAndHousehold.jsx?");

/***/ })

}]);
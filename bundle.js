/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Ship.js":
/*!*********************!*\
  !*** ./src/Ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n//Ship factory function\n//Include:\n    //length\n    //number of times hit\n    //sunk or not\n    //hit function: increases number of hits on the ship\n    //isSunk function: calculates sunk based on ship length and number of hits\n\n//No.\tClass of ship\tSize\n//1 \tCarrier\t        5\n//2\t    Battleship\t    4\n//3\t    Destroyer\t    3\n//4\t    Submarine\t    3\n//5\t    Patrol Boat\t    2\n\nclass Ship {\n\n    //Private variables\n    #sunk;\n    #hits;\n\n    constructor(length) {\n        this.#hits = [];\n        this.#sunk = false;\n        this.length = length;\n    }\n\n    //Private functions\n    #check() {\n        if (this.#hits.length === this.length) {\n            this.#sink();\n        }\n    }\n    #sink() {\n        console.log(\"ship has sank!\");\n        return this.#sunk = true;\n    }\n\n    //Public function\n    hit(coordinates) {\n        if (this.#sunk) {\n            console.log('this ship has already sank');\n        }\n        if (this.#hits.length < this.length) {\n            this.#hits.push(coordinates);\n        }\n        this.#check();\n        return this.#hits;\n    }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvU2hpcC5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxJQUFJIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9TaGlwLmpzP2Y3YjkiXSwic291cmNlc0NvbnRlbnQiOlsiLy9TaGlwIGZhY3RvcnkgZnVuY3Rpb25cbi8vSW5jbHVkZTpcbiAgICAvL2xlbmd0aFxuICAgIC8vbnVtYmVyIG9mIHRpbWVzIGhpdFxuICAgIC8vc3VuayBvciBub3RcbiAgICAvL2hpdCBmdW5jdGlvbjogaW5jcmVhc2VzIG51bWJlciBvZiBoaXRzIG9uIHRoZSBzaGlwXG4gICAgLy9pc1N1bmsgZnVuY3Rpb246IGNhbGN1bGF0ZXMgc3VuayBiYXNlZCBvbiBzaGlwIGxlbmd0aCBhbmQgbnVtYmVyIG9mIGhpdHNcblxuLy9Oby5cdENsYXNzIG9mIHNoaXBcdFNpemVcbi8vMSBcdENhcnJpZXJcdCAgICAgICAgNVxuLy8yXHQgICAgQmF0dGxlc2hpcFx0ICAgIDRcbi8vM1x0ICAgIERlc3Ryb3llclx0ICAgIDNcbi8vNFx0ICAgIFN1Ym1hcmluZVx0ICAgIDNcbi8vNVx0ICAgIFBhdHJvbCBCb2F0XHQgICAgMlxuXG5jbGFzcyBTaGlwIHtcblxuICAgIC8vUHJpdmF0ZSB2YXJpYWJsZXNcbiAgICAjc3VuaztcbiAgICAjaGl0cztcblxuICAgIGNvbnN0cnVjdG9yKGxlbmd0aCkge1xuICAgICAgICB0aGlzLiNoaXRzID0gW107XG4gICAgICAgIHRoaXMuI3N1bmsgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XG4gICAgfVxuXG4gICAgLy9Qcml2YXRlIGZ1bmN0aW9uc1xuICAgICNjaGVjaygpIHtcbiAgICAgICAgaWYgKHRoaXMuI2hpdHMubGVuZ3RoID09PSB0aGlzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy4jc2luaygpO1xuICAgICAgICB9XG4gICAgfVxuICAgICNzaW5rKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcInNoaXAgaGFzIHNhbmshXCIpO1xuICAgICAgICByZXR1cm4gdGhpcy4jc3VuayA9IHRydWU7XG4gICAgfVxuXG4gICAgLy9QdWJsaWMgZnVuY3Rpb25cbiAgICBoaXQoY29vcmRpbmF0ZXMpIHtcbiAgICAgICAgaWYgKHRoaXMuI3N1bmspIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0aGlzIHNoaXAgaGFzIGFscmVhZHkgc2FuaycpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLiNoaXRzLmxlbmd0aCA8IHRoaXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLiNoaXRzLnB1c2goY29vcmRpbmF0ZXMpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuI2NoZWNrKCk7XG4gICAgICAgIHJldHVybiB0aGlzLiNoaXRzO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2hpcDsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/Ship.js\n");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ship */ \"./src/Ship.js\");\n\n\nconst a = new _Ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"](4);\nconst b = new _Ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"](6);\n\nb.hit('A1');\nb.hit('A2');\nb.hit('A3');\nb.hit('A4');\nb.hit('A5');\nconsole.log(b);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguanMuanMiLCJtYXBwaW5ncyI6Ijs7QUFBMEI7O0FBRTFCLGNBQWMsNkNBQUk7QUFDbEIsY0FBYyw2Q0FBSTs7QUFFbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcz9iNjM1Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTaGlwIGZyb20gXCIuL1NoaXBcIjtcblxuY29uc3QgYSA9IG5ldyBTaGlwKDQpO1xuY29uc3QgYiA9IG5ldyBTaGlwKDYpO1xuXG5iLmhpdCgnQTEnKTtcbmIuaGl0KCdBMicpO1xuYi5oaXQoJ0EzJyk7XG5iLmhpdCgnQTQnKTtcbmIuaGl0KCdBNScpO1xuY29uc29sZS5sb2coYik7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
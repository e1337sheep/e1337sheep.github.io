(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "../pkg/wasm_prominence.js":
/*!*********************************!*\
  !*** ../pkg/wasm_prominence.js ***!
  \*********************************/
/*! exports provided: Cell, __wbg_log_568919ca296a9c1b, __wbg_random_91b34f54f4de36cc, __widl_instanceof_CanvasRenderingContext2D, __widl_f_set_fill_style_CanvasRenderingContext2D, __widl_f_fill_rect_CanvasRenderingContext2D, __widl_f_get_element_by_id_Document, __widl_instanceof_HTMLCanvasElement, __widl_f_get_context_HTMLCanvasElement, __widl_f_width_HTMLCanvasElement, __widl_f_height_HTMLCanvasElement, __widl_instanceof_Window, __widl_f_document_Window, __wbg_newnoargs_43c5f57b77232284, __wbg_call_7ac13208e630ddeb, __wbindgen_object_clone_ref, __wbindgen_object_drop_ref, __wbindgen_string_new, __wbindgen_debug_string, Prominence, Game, __wbindgen_throw */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Cell\", function() { return Cell; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_log_568919ca296a9c1b\", function() { return __wbg_log_568919ca296a9c1b; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_random_91b34f54f4de36cc\", function() { return __wbg_random_91b34f54f4de36cc; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__widl_instanceof_CanvasRenderingContext2D\", function() { return __widl_instanceof_CanvasRenderingContext2D; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__widl_f_set_fill_style_CanvasRenderingContext2D\", function() { return __widl_f_set_fill_style_CanvasRenderingContext2D; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__widl_f_fill_rect_CanvasRenderingContext2D\", function() { return __widl_f_fill_rect_CanvasRenderingContext2D; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__widl_f_get_element_by_id_Document\", function() { return __widl_f_get_element_by_id_Document; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__widl_instanceof_HTMLCanvasElement\", function() { return __widl_instanceof_HTMLCanvasElement; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__widl_f_get_context_HTMLCanvasElement\", function() { return __widl_f_get_context_HTMLCanvasElement; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__widl_f_width_HTMLCanvasElement\", function() { return __widl_f_width_HTMLCanvasElement; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__widl_f_height_HTMLCanvasElement\", function() { return __widl_f_height_HTMLCanvasElement; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__widl_instanceof_Window\", function() { return __widl_instanceof_Window; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__widl_f_document_Window\", function() { return __widl_f_document_Window; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_newnoargs_43c5f57b77232284\", function() { return __wbg_newnoargs_43c5f57b77232284; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_call_7ac13208e630ddeb\", function() { return __wbg_call_7ac13208e630ddeb; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_object_clone_ref\", function() { return __wbindgen_object_clone_ref; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_object_drop_ref\", function() { return __wbindgen_object_drop_ref; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_string_new\", function() { return __wbindgen_string_new; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_debug_string\", function() { return __wbindgen_debug_string; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Prominence\", function() { return Prominence; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Game\", function() { return Game; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_throw\", function() { return __wbindgen_throw; });\n/* harmony import */ var _wasm_prominence_bg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./wasm_prominence_bg */ \"../pkg/wasm_prominence_bg.wasm\");\n/* tslint:disable */\n\n\n/**\n*/\nconst Cell = Object.freeze({ Color1:1,Color2:2,Color3:3,Color4:4,Color5:5, });\n\nlet cachedTextDecoder = new TextDecoder('utf-8');\n\nlet cachegetUint8Memory = null;\nfunction getUint8Memory() {\n    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== _wasm_prominence_bg__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer) {\n        cachegetUint8Memory = new Uint8Array(_wasm_prominence_bg__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer);\n    }\n    return cachegetUint8Memory;\n}\n\nfunction getStringFromWasm(ptr, len) {\n    return cachedTextDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));\n}\n\nfunction __wbg_log_568919ca296a9c1b(arg0, arg1) {\n    let varg0 = getStringFromWasm(arg0, arg1);\n    console.log(varg0);\n}\n\nfunction __wbg_random_91b34f54f4de36cc() {\n    return Math.random();\n}\n\nconst heap = new Array(32);\n\nheap.fill(undefined);\n\nheap.push(undefined, null, true, false);\n\nfunction getObject(idx) { return heap[idx]; }\n\nfunction __widl_instanceof_CanvasRenderingContext2D(idx) {\n    return getObject(idx) instanceof CanvasRenderingContext2D ? 1 : 0;\n}\n\nfunction __widl_f_set_fill_style_CanvasRenderingContext2D(arg0, arg1) {\n    getObject(arg0).fillStyle = getObject(arg1);\n}\n\nfunction __widl_f_fill_rect_CanvasRenderingContext2D(arg0, arg1, arg2, arg3, arg4) {\n    getObject(arg0).fillRect(arg1, arg2, arg3, arg4);\n}\n\nlet heap_next = heap.length;\n\nfunction addHeapObject(obj) {\n    if (heap_next === heap.length) heap.push(heap.length + 1);\n    const idx = heap_next;\n    heap_next = heap[idx];\n\n    heap[idx] = obj;\n    return idx;\n}\n\nfunction isLikeNone(x) {\n    return x === undefined || x === null;\n}\n\nfunction __widl_f_get_element_by_id_Document(arg0, arg1, arg2) {\n    let varg1 = getStringFromWasm(arg1, arg2);\n\n    const val = getObject(arg0).getElementById(varg1);\n    return isLikeNone(val) ? 0 : addHeapObject(val);\n\n}\n\nfunction __widl_instanceof_HTMLCanvasElement(idx) {\n    return getObject(idx) instanceof HTMLCanvasElement ? 1 : 0;\n}\n\nlet cachegetUint32Memory = null;\nfunction getUint32Memory() {\n    if (cachegetUint32Memory === null || cachegetUint32Memory.buffer !== _wasm_prominence_bg__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer) {\n        cachegetUint32Memory = new Uint32Array(_wasm_prominence_bg__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer);\n    }\n    return cachegetUint32Memory;\n}\n\nfunction __widl_f_get_context_HTMLCanvasElement(arg0, arg1, arg2, exnptr) {\n    let varg1 = getStringFromWasm(arg1, arg2);\n    try {\n\n        const val = getObject(arg0).getContext(varg1);\n        return isLikeNone(val) ? 0 : addHeapObject(val);\n\n    } catch (e) {\n        const view = getUint32Memory();\n        view[exnptr / 4] = 1;\n        view[exnptr / 4 + 1] = addHeapObject(e);\n\n    }\n}\n\nfunction __widl_f_width_HTMLCanvasElement(arg0) {\n    return getObject(arg0).width;\n}\n\nfunction __widl_f_height_HTMLCanvasElement(arg0) {\n    return getObject(arg0).height;\n}\n\nfunction __widl_instanceof_Window(idx) {\n    return getObject(idx) instanceof Window ? 1 : 0;\n}\n\nfunction __widl_f_document_Window(arg0) {\n\n    const val = getObject(arg0).document;\n    return isLikeNone(val) ? 0 : addHeapObject(val);\n\n}\n\nfunction __wbg_newnoargs_43c5f57b77232284(arg0, arg1) {\n    let varg0 = getStringFromWasm(arg0, arg1);\n    return addHeapObject(new Function(varg0));\n}\n\nfunction __wbg_call_7ac13208e630ddeb(arg0, arg1, exnptr) {\n    try {\n        return addHeapObject(getObject(arg0).call(getObject(arg1)));\n    } catch (e) {\n        const view = getUint32Memory();\n        view[exnptr / 4] = 1;\n        view[exnptr / 4 + 1] = addHeapObject(e);\n\n    }\n}\n\nfunction __wbindgen_object_clone_ref(idx) {\n    return addHeapObject(getObject(idx));\n}\n\nfunction dropObject(idx) {\n    if (idx < 36) return;\n    heap[idx] = heap_next;\n    heap_next = idx;\n}\n\nfunction __wbindgen_object_drop_ref(i) { dropObject(i); }\n\nfunction __wbindgen_string_new(p, l) {\n    return addHeapObject(getStringFromWasm(p, l));\n}\n\nlet cachedTextEncoder = new TextEncoder('utf-8');\n\nlet WASM_VECTOR_LEN = 0;\n\nfunction passStringToWasm(arg) {\n\n    const buf = cachedTextEncoder.encode(arg);\n    const ptr = _wasm_prominence_bg__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_malloc\"](buf.length);\n    getUint8Memory().set(buf, ptr);\n    WASM_VECTOR_LEN = buf.length;\n    return ptr;\n}\n\nfunction __wbindgen_debug_string(i, len_ptr) {\n    const toString = Object.prototype.toString;\n    const debug_str = val => {\n        // primitive types\n        const type = typeof val;\n        if (type == 'number' || type == 'boolean' || val == null) {\n            return  `${val}`;\n        }\n        if (type == 'string') {\n            return `\"${val}\"`;\n        }\n        if (type == 'symbol') {\n            const description = val.description;\n            if (description == null) {\n                return 'Symbol';\n            } else {\n                return `Symbol(${description})`;\n            }\n        }\n        if (type == 'function') {\n            const name = val.name;\n            if (typeof name == 'string' && name.length > 0) {\n                return `Function(${name})`;\n            } else {\n                return 'Function';\n            }\n        }\n        // objects\n        if (Array.isArray(val)) {\n            const length = val.length;\n            let debug = '[';\n            if (length > 0) {\n                debug += debug_str(val[0]);\n            }\n            for(let i = 1; i < length; i++) {\n                debug += ', ' + debug_str(val[i]);\n            }\n            debug += ']';\n            return debug;\n        }\n        // Test for built-in\n        const builtInMatches = /\\[object ([^\\]]+)\\]/.exec(toString.call(val));\n        let className;\n        if (builtInMatches.length > 1) {\n            className = builtInMatches[1];\n        } else {\n            // Failed to match the standard '[object ClassName]'\n            return toString.call(val);\n        }\n        if (className == 'Object') {\n            // we're a user defined class or Object\n            // JSON.stringify avoids problems with cycles, and is generally much\n            // easier than looping through ownProperties of `val`.\n            try {\n                return 'Object(' + JSON.stringify(val) + ')';\n            } catch (_) {\n                return 'Object';\n            }\n        }\n        // errors\n        if (val instanceof Error) {\n        return `${val.name}: ${val.message}\n        ${val.stack}`;\n    }\n    // TODO we could test for more things here, like `Set`s and `Map`s.\n    return className;\n};\nconst val = getObject(i);\nconst debug = debug_str(val);\nconst ptr = passStringToWasm(debug);\ngetUint32Memory()[len_ptr / 4] = WASM_VECTOR_LEN;\nreturn ptr;\n}\n\nfunction freeProminence(ptr) {\n\n    _wasm_prominence_bg__WEBPACK_IMPORTED_MODULE_0__[\"__wbg_prominence_free\"](ptr);\n}\n/**\n*/\nclass Prominence {\n\n    static __wrap(ptr) {\n        const obj = Object.create(Prominence.prototype);\n        obj.ptr = ptr;\n\n        return obj;\n    }\n\n    free() {\n        const ptr = this.ptr;\n        this.ptr = 0;\n        freeProminence(ptr);\n    }\n\n    /**\n    * @returns {Prominence}\n    */\n    static new() {\n        return Prominence.__wrap(_wasm_prominence_bg__WEBPACK_IMPORTED_MODULE_0__[\"prominence_new\"]());\n    }\n}\n\nfunction freeGame(ptr) {\n\n    _wasm_prominence_bg__WEBPACK_IMPORTED_MODULE_0__[\"__wbg_game_free\"](ptr);\n}\n/**\n*/\nclass Game {\n\n    static __wrap(ptr) {\n        const obj = Object.create(Game.prototype);\n        obj.ptr = ptr;\n\n        return obj;\n    }\n\n    free() {\n        const ptr = this.ptr;\n        this.ptr = 0;\n        freeGame(ptr);\n    }\n\n    /**\n    * @returns {number}\n    */\n    score() {\n        return _wasm_prominence_bg__WEBPACK_IMPORTED_MODULE_0__[\"game_score\"](this.ptr);\n    }\n    /**\n    * @returns {number}\n    */\n    lives() {\n        return _wasm_prominence_bg__WEBPACK_IMPORTED_MODULE_0__[\"game_lives\"](this.ptr);\n    }\n    /**\n    * @returns {number}\n    */\n    width() {\n        return _wasm_prominence_bg__WEBPACK_IMPORTED_MODULE_0__[\"game_width\"](this.ptr);\n    }\n    /**\n    * @returns {number}\n    */\n    height() {\n        return _wasm_prominence_bg__WEBPACK_IMPORTED_MODULE_0__[\"game_height\"](this.ptr);\n    }\n    /**\n    * @returns {boolean}\n    */\n    playing() {\n        return (_wasm_prominence_bg__WEBPACK_IMPORTED_MODULE_0__[\"game_playing\"](this.ptr)) !== 0;\n    }\n    /**\n    * @returns {number}\n    */\n    cells() {\n        return _wasm_prominence_bg__WEBPACK_IMPORTED_MODULE_0__[\"game_cells\"](this.ptr);\n    }\n    /**\n    * @param {number} arg0\n    * @returns {boolean | undefined}\n    */\n    play(arg0) {\n\n        const ret = _wasm_prominence_bg__WEBPACK_IMPORTED_MODULE_0__[\"game_play\"](this.ptr, arg0);\n        return ret === 0xFFFFFF ? undefined : ret !== 0;\n\n    }\n    /**\n    * @returns {Game}\n    */\n    static new() {\n        return Game.__wrap(_wasm_prominence_bg__WEBPACK_IMPORTED_MODULE_0__[\"game_new\"]());\n    }\n}\n\nfunction __wbindgen_throw(ptr, len) {\n    throw new Error(getStringFromWasm(ptr, len));\n}\n\n\n\n//# sourceURL=webpack:///../pkg/wasm_prominence.js?");

/***/ }),

/***/ "../pkg/wasm_prominence_bg.wasm":
/*!**************************************!*\
  !*** ../pkg/wasm_prominence_bg.wasm ***!
  \**************************************/
/*! exports provided: memory, __wbg_game_free, game_score, game_lives, game_width, game_height, game_playing, game_cells, game_play, game_new, __wbg_prominence_free, prominence_new, __wbindgen_malloc */
/***/ (function(module, exports, __webpack_require__) {

eval("\"use strict\";\n// Instantiate WebAssembly module\nvar wasmExports = __webpack_require__.w[module.i];\n__webpack_require__.r(exports);\n// export exports from WebAssembly module\nfor(var name in wasmExports) if(name != \"__webpack_init__\") exports[name] = wasmExports[name];\n// exec imports from WebAssembly module (for esm order)\n/* harmony import */ var m0 = __webpack_require__(/*! ./wasm_prominence */ \"../pkg/wasm_prominence.js\");\n\n\n// exec wasm module\nwasmExports[\"__webpack_init__\"]()\n\n//# sourceURL=webpack:///../pkg/wasm_prominence_bg.wasm?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var wasm_prominence__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! wasm-prominence */ \"../pkg/wasm_prominence.js\");\n/* harmony import */ var wasm_prominence_wasm_prominence_bg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! wasm-prominence/wasm_prominence_bg */ \"../pkg/wasm_prominence_bg.wasm\");\n\n\n\nconsole.log(\"========BEGIN========\")\nconst CELL_SIZE = 40 //px\nconst COLOR1 = \"#FF0000\" // Red\nconst COLOR2 = \"#00FF00\" // Green\nconst COLOR3 = \"#0000FF\" // Blue\nconst COLOR4 = \"#FFFF00\" // Yellow\nconst COLOR5 = \"#FF00FF\" // Magenta\n\n// helper functions\n// Game -> String -> CanvasContext\nlet init_canvas = (g, type, con, id) => {\n  if (!document.getElementById(id)){\n    let b = document.createElement('canvas')\n    b.setAttribute('id', id)\n    con.appendChild(b)\n  }\n  let canvas = document.getElementById(id)\n  canvas.height = CELL_SIZE * g.height()\n  canvas.width = CELL_SIZE * g.width()\n  return canvas.getContext(type)\n}\n// Extra function call for helper/lazyness/clear code\nconst getIndex = (row, col, width) => row * width + col\n\n// Game -> CanvasContext2D -> IO()\nconst drawCells2d = (g, ctx) => {\n  const cellsPtr = g.cells()\n  const cells = new Uint8Array(\n    wasm_prominence_wasm_prominence_bg__WEBPACK_IMPORTED_MODULE_1__[\"memory\"].buffer,\n    cellsPtr,\n    g.width() * g.height(),\n  )\n  ctx.beginPath()\n\n  drawCellsColor(g, ctx, cells, COLOR1, wasm_prominence__WEBPACK_IMPORTED_MODULE_0__[\"Cell\"].Color1)\n  drawCellsColor(g, ctx, cells, COLOR2, wasm_prominence__WEBPACK_IMPORTED_MODULE_0__[\"Cell\"].Color2)\n  drawCellsColor(g, ctx, cells, COLOR3, wasm_prominence__WEBPACK_IMPORTED_MODULE_0__[\"Cell\"].Color3)\n  drawCellsColor(g, ctx, cells, COLOR4, wasm_prominence__WEBPACK_IMPORTED_MODULE_0__[\"Cell\"].Color4)\n  drawCellsColor(g, ctx, cells, COLOR5, wasm_prominence__WEBPACK_IMPORTED_MODULE_0__[\"Cell\"].Color5)\n\n  ctx.stroke();\n}\n\n// Game -> CanvasContext2D -> [Cell] -> Color -> Cell -> IO()\nconst drawCellsColor = (g, ctx, cells, color, type) => {\n  ctx.fillStyle = color\n  for (let row = 0; row <= g.height(); row++){\n    for (let col = 0; col <= g.width(); col++){\n      const idx = getIndex(row, col, g.width())\n      if (cells[idx] !== type) continue\n      \n      ctx.fillRect(\n        col * CELL_SIZE,\n        row * CELL_SIZE,\n        CELL_SIZE,\n        CELL_SIZE\n      )\n    }\n  }\n}\n\n// ID of container:String -> IO\nlet startGame = (el) => {\n  //mut g\n  let g = wasm_prominence__WEBPACK_IMPORTED_MODULE_0__[\"Game\"].new()\n  let ctx = init_canvas(g, '2d', el, \"prom-board\")\n  const scoreDisp = document.getElementById(\"score\")\n  const livesDisp = document.getElementById(\"lives\")\n  livesDisp.textContent = g.lives().toString()\n  scoreDisp.textContent = g.score().toString()\n  drawCells2d(g, ctx)\n  // Need a named handler so it can be removed, but also need to pass game\n  // state to handler, so this inbetween function puts this together\n  let pcHandler = e => { promClickHandler(e, g) }\n  ctx.canvas.addEventListener(\"click\", pcHandler)\n  let promClickHandler = (e, g) => {\n    // get cells from WASM memory\n    const cellsPtr = g.cells()\n    const cells = new Uint8Array(wasm_prominence_wasm_prominence_bg__WEBPACK_IMPORTED_MODULE_1__[\"memory\"].buffer, cellsPtr, g.width() * g.height())\n    // If Game not in playing state, start a new one\n    if (!g.playing()){\n      console.log(\"=== Game has ended, starting new game ===\")\n      // Clean up click handler\n      ctx.canvas.removeEventListener(\"click\", pcHandler)\n      startGame(document.getElementById('game'))\n      // Lazy way to get rid of old messages (psudo-Static Game Over)\n      //make this more exact: only want classes that are children of e.target?\n      let messages = document.getElementsByClassName(\"message\")\n      for (let i = 0 ; i < messages.length;i++){\n        messages[i].classList.add(\"fade-remove\")\n      }\n    } else {\n      // calculate click postion from canvas accounting for scaling\n      // use Rust for this? can then build in hasChanged stuff\n      const boundRect = e.target.getBoundingClientRect()\n      const scaleX = e.target.width / boundRect.width\n      const scaleY = e.target.height / boundRect.height\n      \n      const canvasLeft = (e.clientX - boundRect.left) * scaleX\n      const canvasTop = (e.clientY - boundRect.top) * scaleY\n      // calculate cell clicked from click position\n      const row = Math.min(Math.floor(canvasTop / CELL_SIZE), g.height())\n      const col = Math.min(Math.floor(canvasLeft / CELL_SIZE), g.width())      \n      const guess = cells[getIndex(row, col, g.width())]\n      // console.log(\"===CLICK!===\")\n      // console.log(\"at row\", row, \", col\", col)\n      // console.log(\"and Clicked Color is\", guess)\n      // Rust functions that return an Option will return None as undefined\n      const message = document.createElement('div')\n      message.setAttribute(\"class\", \"message\")\n      switch (g.play(guess)) {\n        case true:\n          console.log(\"CORRECT!!\")\n          scoreDisp.textContent = g.score().toString()\n          message.textContent = \"Correct!!\"\n          message.classList.add(\"fade-remove\")\n          break\n        case false:\n          console.log(\"WRONG!!\")\n          livesDisp.textContent = g.lives().toString()\n          message.textContent = \"Wrong!!\"\n          message.classList.add(\"fade-remove\")\n          break\n        default:\n          // Ergo, Handle None\n          console.log(\"===GAME OVER!!===\")\n          livesDisp.textContent = \"\"\n          message.innerHTML = \"Game Over<br>Click To Play\"\n      }\n      document.getElementById(\"game\").appendChild(message)\n      message.addEventListener(\"animationend\", e => {\n        e.target.parentNode.removeChild(message)\n      })\n    }\n    drawCells2d(g, e.target.getContext('2d'))\n  }\n\n}\n\n//let prom = Prominence.new()\nstartGame(document.getElementById('game'))\n\n\n\n\n\n//# sourceURL=webpack:///./index.js?");

/***/ })

}]);
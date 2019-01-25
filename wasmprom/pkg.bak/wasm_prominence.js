/* tslint:disable */
import * as wasm from './wasm_prominence_bg';

/**
*/
export const Cell = Object.freeze({ Color1:1,Color2:2,Color3:3,Color4:4,Color5:5, });

let cachedTextDecoder = new TextDecoder('utf-8');

let cachegetUint8Memory = null;
function getUint8Memory() {
    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory;
}

function getStringFromWasm(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
}

export function __wbg_log_568919ca296a9c1b(arg0, arg1) {
    let varg0 = getStringFromWasm(arg0, arg1);
    console.log(varg0);
}

export function __wbg_random_91b34f54f4de36cc() {
    return Math.random();
}

const heap = new Array(32);

heap.fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

export function __widl_instanceof_CanvasRenderingContext2D(idx) {
    return getObject(idx) instanceof CanvasRenderingContext2D ? 1 : 0;
}

export function __widl_f_set_fill_style_CanvasRenderingContext2D(arg0, arg1) {
    getObject(arg0).fillStyle = getObject(arg1);
}

export function __widl_f_fill_rect_CanvasRenderingContext2D(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).fillRect(arg1, arg2, arg3, arg4);
}

let heap_next = heap.length;

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

export function __widl_f_get_element_by_id_Document(arg0, arg1, arg2) {
    let varg1 = getStringFromWasm(arg1, arg2);

    const val = getObject(arg0).getElementById(varg1);
    return isLikeNone(val) ? 0 : addHeapObject(val);

}

export function __widl_instanceof_HTMLCanvasElement(idx) {
    return getObject(idx) instanceof HTMLCanvasElement ? 1 : 0;
}

let cachegetUint32Memory = null;
function getUint32Memory() {
    if (cachegetUint32Memory === null || cachegetUint32Memory.buffer !== wasm.memory.buffer) {
        cachegetUint32Memory = new Uint32Array(wasm.memory.buffer);
    }
    return cachegetUint32Memory;
}

export function __widl_f_get_context_HTMLCanvasElement(arg0, arg1, arg2, exnptr) {
    let varg1 = getStringFromWasm(arg1, arg2);
    try {

        const val = getObject(arg0).getContext(varg1);
        return isLikeNone(val) ? 0 : addHeapObject(val);

    } catch (e) {
        const view = getUint32Memory();
        view[exnptr / 4] = 1;
        view[exnptr / 4 + 1] = addHeapObject(e);

    }
}

export function __widl_f_width_HTMLCanvasElement(arg0) {
    return getObject(arg0).width;
}

export function __widl_f_height_HTMLCanvasElement(arg0) {
    return getObject(arg0).height;
}

export function __widl_instanceof_Window(idx) {
    return getObject(idx) instanceof Window ? 1 : 0;
}

export function __widl_f_document_Window(arg0) {

    const val = getObject(arg0).document;
    return isLikeNone(val) ? 0 : addHeapObject(val);

}

export function __wbg_newnoargs_43c5f57b77232284(arg0, arg1) {
    let varg0 = getStringFromWasm(arg0, arg1);
    return addHeapObject(new Function(varg0));
}

export function __wbg_call_7ac13208e630ddeb(arg0, arg1, exnptr) {
    try {
        return addHeapObject(getObject(arg0).call(getObject(arg1)));
    } catch (e) {
        const view = getUint32Memory();
        view[exnptr / 4] = 1;
        view[exnptr / 4 + 1] = addHeapObject(e);

    }
}

export function __wbindgen_object_clone_ref(idx) {
    return addHeapObject(getObject(idx));
}

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

export function __wbindgen_object_drop_ref(i) { dropObject(i); }

export function __wbindgen_string_new(p, l) {
    return addHeapObject(getStringFromWasm(p, l));
}

let cachedTextEncoder = new TextEncoder('utf-8');

let WASM_VECTOR_LEN = 0;

function passStringToWasm(arg) {

    const buf = cachedTextEncoder.encode(arg);
    const ptr = wasm.__wbindgen_malloc(buf.length);
    getUint8Memory().set(buf, ptr);
    WASM_VECTOR_LEN = buf.length;
    return ptr;
}

export function __wbindgen_debug_string(i, len_ptr) {
    const toString = Object.prototype.toString;
    const debug_str = val => {
        // primitive types
        const type = typeof val;
        if (type == 'number' || type == 'boolean' || val == null) {
            return  `${val}`;
        }
        if (type == 'string') {
            return `"${val}"`;
        }
        if (type == 'symbol') {
            const description = val.description;
            if (description == null) {
                return 'Symbol';
            } else {
                return `Symbol(${description})`;
            }
        }
        if (type == 'function') {
            const name = val.name;
            if (typeof name == 'string' && name.length > 0) {
                return `Function(${name})`;
            } else {
                return 'Function';
            }
        }
        // objects
        if (Array.isArray(val)) {
            const length = val.length;
            let debug = '[';
            if (length > 0) {
                debug += debug_str(val[0]);
            }
            for(let i = 1; i < length; i++) {
                debug += ', ' + debug_str(val[i]);
            }
            debug += ']';
            return debug;
        }
        // Test for built-in
        const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
        let className;
        if (builtInMatches.length > 1) {
            className = builtInMatches[1];
        } else {
            // Failed to match the standard '[object ClassName]'
            return toString.call(val);
        }
        if (className == 'Object') {
            // we're a user defined class or Object
            // JSON.stringify avoids problems with cycles, and is generally much
            // easier than looping through ownProperties of `val`.
            try {
                return 'Object(' + JSON.stringify(val) + ')';
            } catch (_) {
                return 'Object';
            }
        }
        // errors
        if (val instanceof Error) {
        return `${val.name}: ${val.message}
        ${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
};
const val = getObject(i);
const debug = debug_str(val);
const ptr = passStringToWasm(debug);
getUint32Memory()[len_ptr / 4] = WASM_VECTOR_LEN;
return ptr;
}

function freeProminence(ptr) {

    wasm.__wbg_prominence_free(ptr);
}
/**
*/
export class Prominence {

    static __wrap(ptr) {
        const obj = Object.create(Prominence.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;
        freeProminence(ptr);
    }

    /**
    * @returns {Prominence}
    */
    static new() {
        return Prominence.__wrap(wasm.prominence_new());
    }
}

function freeGame(ptr) {

    wasm.__wbg_game_free(ptr);
}
/**
*/
export class Game {

    static __wrap(ptr) {
        const obj = Object.create(Game.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;
        freeGame(ptr);
    }

    /**
    * @returns {number}
    */
    score() {
        return wasm.game_score(this.ptr);
    }
    /**
    * @returns {number}
    */
    lives() {
        return wasm.game_lives(this.ptr);
    }
    /**
    * @returns {number}
    */
    width() {
        return wasm.game_width(this.ptr);
    }
    /**
    * @returns {number}
    */
    height() {
        return wasm.game_height(this.ptr);
    }
    /**
    * @returns {boolean}
    */
    playing() {
        return (wasm.game_playing(this.ptr)) !== 0;
    }
    /**
    * @returns {number}
    */
    cells() {
        return wasm.game_cells(this.ptr);
    }
    /**
    * @param {number} arg0
    * @returns {boolean | undefined}
    */
    play(arg0) {

        const ret = wasm.game_play(this.ptr, arg0);
        return ret === 0xFFFFFF ? undefined : ret !== 0;

    }
    /**
    * @returns {Game}
    */
    static new() {
        return Game.__wrap(wasm.game_new());
    }
}

export function __wbindgen_throw(ptr, len) {
    throw new Error(getStringFromWasm(ptr, len));
}


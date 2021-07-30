"use strict";
// To parse this data:
//
//   import { Convert, Ingredient } from "./file";
//
//   const ingredient = Convert.toIngredient(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Convert = exports.Unit = void 0;
var Unit;
(function (Unit) {
    Unit["Empty"] = "";
    Unit["G"] = "g";
    Unit["Iu"] = "IU";
    Unit["Kcal"] = "kcal";
    Unit["Mg"] = "mg";
    Unit["\u00CE\u0153g"] = "\u00C2\u00B5g";
})(Unit = exports.Unit || (exports.Unit = {}));
// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
var Convert = /** @class */ (function () {
    function Convert() {
    }
    Convert.toIngredient = function (json) {
        return cast(JSON.parse(json), r("Ingredient"));
    };
    Convert.ingredientToJson = function (value) {
        return JSON.stringify(uncast(value, r("Ingredient")), null, 2);
    };
    return Convert;
}());
exports.Convert = Convert;
function invalidValue(typ, val, key) {
    if (key === void 0) { key = ''; }
    if (key) {
        throw Error("Invalid value for key \"" + key + "\". Expected type " + JSON.stringify(typ) + " but got " + JSON.stringify(val));
    }
    throw Error("Invalid value " + JSON.stringify(val) + " for type " + JSON.stringify(typ));
}
function jsonToJSProps(typ) {
    if (typ.jsonToJS === undefined) {
        var map_1 = {};
        typ.props.forEach(function (p) { return map_1[p.json] = { key: p.js, typ: p.typ }; });
        typ.jsonToJS = map_1;
    }
    return typ.jsonToJS;
}
function jsToJSONProps(typ) {
    if (typ.jsToJSON === undefined) {
        var map_2 = {};
        typ.props.forEach(function (p) { return map_2[p.js] = { key: p.json, typ: p.typ }; });
        typ.jsToJSON = map_2;
    }
    return typ.jsToJSON;
}
function transform(val, typ, getProps, key) {
    if (key === void 0) { key = ''; }
    function transformPrimitive(typ, val) {
        if (typeof typ === typeof val)
            return val;
        return invalidValue(typ, val, key);
    }
    function transformUnion(typs, val) {
        // val must validate against one typ in typs
        var l = typs.length;
        for (var i = 0; i < l; i++) {
            var typ_1 = typs[i];
            try {
                return transform(val, typ_1, getProps);
            }
            catch (_) { }
        }
        return invalidValue(typs, val);
    }
    function transformEnum(cases, val) {
        if (cases.indexOf(val) !== -1)
            return val;
        return invalidValue(cases, val);
    }
    function transformArray(typ, val) {
        // val must be an array with no invalid elements
        if (!Array.isArray(val))
            return invalidValue("array", val);
        return val.map(function (el) { return transform(el, typ, getProps); });
    }
    function transformDate(val) {
        if (val === null) {
            return null;
        }
        var d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue("Date", val);
        }
        return d;
    }
    function transformObject(props, additional, val) {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue("object", val);
        }
        var result = {};
        Object.getOwnPropertyNames(props).forEach(function (key) {
            var prop = props[key];
            var v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, prop.key);
        });
        Object.getOwnPropertyNames(val).forEach(function (key) {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key);
            }
        });
        return result;
    }
    if (typ === "any")
        return val;
    if (typ === null) {
        if (val === null)
            return val;
        return invalidValue(typ, val);
    }
    if (typ === false)
        return invalidValue(typ, val);
    while (typeof typ === "object" && typ.ref !== undefined) {
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ))
        return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems") ? transformArray(typ.arrayItems, val)
                : typ.hasOwnProperty("props") ? transformObject(getProps(typ), typ.additional, val)
                    : invalidValue(typ, val);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number")
        return transformDate(val);
    return transformPrimitive(typ, val);
}
function cast(val, typ) {
    return transform(val, typ, jsonToJSProps);
}
function uncast(val, typ) {
    return transform(val, typ, jsToJSONProps);
}
function a(typ) {
    return { arrayItems: typ };
}
function u() {
    var typs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        typs[_i] = arguments[_i];
    }
    return { unionMembers: typs };
}
function o(props, additional) {
    return { props: props, additional: additional };
}
function m(additional) {
    return { props: [], additional: additional };
}
function r(name) {
    return { ref: name };
}
var typeMap = {
    "Ingredient": o([
        { json: "id", js: "id", typ: 0 },
        { json: "original", js: "original", typ: "" },
        { json: "originalName", js: "originalName", typ: "" },
        { json: "name", js: "name", typ: "" },
        { json: "amount", js: "amount", typ: 3.14 },
        { json: "unit", js: "unit", typ: "" },
        { json: "unitShort", js: "unitShort", typ: "" },
        { json: "unitLong", js: "unitLong", typ: "" },
        { json: "possibleUnits", js: "possibleUnits", typ: a("") },
        { json: "estimatedCost", js: "estimatedCost", typ: r("EstimatedCost") },
        { json: "consistency", js: "consistency", typ: "" },
        { json: "shoppingListUnits", js: "shoppingListUnits", typ: a("") },
        { json: "aisle", js: "aisle", typ: "" },
        { json: "image", js: "image", typ: "" },
        { json: "meta", js: "meta", typ: a("any") },
        { json: "nutrition", js: "nutrition", typ: r("Nutrition") },
        { json: "categoryPath", js: "categoryPath", typ: a("") },
    ], false),
    "EstimatedCost": o([
        { json: "value", js: "value", typ: 3.14 },
        { json: "unit", js: "unit", typ: "" },
    ], false),
    "Nutrition": o([
        { json: "nutrients", js: "nutrients", typ: a(r("Flavonoid")) },
        { json: "properties", js: "properties", typ: a(r("Flavonoid")) },
        { json: "flavonoids", js: "flavonoids", typ: a(r("Flavonoid")) },
        { json: "caloricBreakdown", js: "caloricBreakdown", typ: r("CaloricBreakdown") },
        { json: "weightPerServing", js: "weightPerServing", typ: r("WeightPerServing") },
    ], false),
    "CaloricBreakdown": o([
        { json: "percentProtein", js: "percentProtein", typ: 3.14 },
        { json: "percentFat", js: "percentFat", typ: 3.14 },
        { json: "percentCarbs", js: "percentCarbs", typ: 3.14 },
    ], false),
    "Flavonoid": o([
        { json: "name", js: "name", typ: "" },
        { json: "title", js: "title", typ: "" },
        { json: "amount", js: "amount", typ: 3.14 },
        { json: "unit", js: "unit", typ: r("Unit") },
    ], false),
    "WeightPerServing": o([
        { json: "amount", js: "amount", typ: 0 },
        { json: "unit", js: "unit", typ: r("Unit") },
    ], false),
    "Unit": [
        "",
        "g",
        "IU",
        "kcal",
        "mg",
        "Âµg",
    ],
};
//# sourceMappingURL=Ingredient.js.map
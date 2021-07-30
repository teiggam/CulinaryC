// To parse this data:
//
//   import { Convert, Ingredient } from "./file";
//
//   const ingredient = Convert.toIngredient(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface Ingredient {
    id:                number;
    original:          string;
    originalName:      string;
    name:              string;
    amount:            number;
    unit:              string;
    unitShort:         string;
    unitLong:          string;
    possibleUnits:     string[];
    estimatedCost:     EstimatedCost;
    consistency:       string;
    shoppingListUnits: string[];
    aisle:             string;
    image:             string;
    meta:              any[];
    nutrition:         Nutrition;
    categoryPath:      string[];
}

export interface EstimatedCost {
    value: number;
    unit:  string;
}

export interface Nutrition {
    nutrients:        Flavonoid[];
    properties:       Flavonoid[];
    flavonoids:       Flavonoid[];
    caloricBreakdown: CaloricBreakdown;
    weightPerServing: WeightPerServing;
}

export interface CaloricBreakdown {
    percentProtein: number;
    percentFat:     number;
    percentCarbs:   number;
}

export interface Flavonoid {
    name:   string;
    title:  string;
    amount: number;
    unit:   Unit;
}

export enum Unit {
    Empty = "",
    G = "g",
    Iu = "IU",
    Kcal = "kcal",
    Mg = "mg",
    Îœg = "Âµg",
}

export interface WeightPerServing {
    amount: number;
    unit:   Unit;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toIngredient(json: string): Ingredient {
        return cast(JSON.parse(json), r("Ingredient"));
    }

    public static ingredientToJson(value: Ingredient): string {
        return JSON.stringify(uncast(value, r("Ingredient")), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any = ''): never {
    if (key) {
        throw Error(`Invalid value for key "${key}". Expected type ${JSON.stringify(typ)} but got ${JSON.stringify(val)}`);
    }
    throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`, );
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases, val);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue("array", val);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue("Date", val);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue("object", val);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, prop.key);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val);
    }
    if (typ === false) return invalidValue(typ, val);
    while (typeof typ === "object" && typ.ref !== undefined) {
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
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

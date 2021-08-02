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
exports.Unit = void 0;
var Unit;
(function (Unit) {
    Unit["Empty"] = "";
    Unit["G"] = "g";
    Unit["Iu"] = "IU";
    Unit["Kcal"] = "kcal";
    Unit["Mg"] = "mg";
    Unit["\u00CE\u0153g"] = "\u00C2\u00B5g";
})(Unit = exports.Unit || (exports.Unit = {}));
//# sourceMappingURL=Ingredient.js.map
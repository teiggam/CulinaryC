// To parse this data:
//
//   import { Convert } from "./file";
//
//   const friends = Convert.toFriends(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface Friends {
    id:       number;
    loginId:  string;
    name:     string;
    score:    number;
    title:    string;
    picture:  null | string;
    favorite: any[];
    friends:  any[];
    group:    any[];
    recipes:  any[];
}


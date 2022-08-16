import { ReactElement } from "react";
//  GLOBALIY TYPES
export type gender =
  | { name: "male"; label: "مرد" }
  | { name: "female"; label: "زن" };
export type theme = "dark" | "light";
export type role = "admin" | "support" | "employer" | "user";
export type status = "active" | "deactive";
export type language = "fr" | "en";
//  GLOBALIY TYPES

// FORM TYPS
export type InputError = string | undefined;
export type InputDefaultValue =
  | (() => string)
  | (() => number)
  | (() => symbol)
  | (() => object);
export type InputTouched = boolean | undefined;
export interface input {
  type: string;
  label: string;
  id: string;
  icon?: ReactElement;
  list?: any; // this is required if type of input is Select
}
export interface selectListDisplay {
  id: string;
  displayName: string;
}
// FORM TYPS

// PAGINATION
export interface pagination {
  take: number;
  skip: number;
  currentPage: number;
  pages: number;
}
// PAGINATION

// FETCH TYPES
export type fetchType = "local" | "external";
export type method = "POST" | "GET";
export interface fetch {
  method: string;
  url: string;
  type: fetchType;
  data: {} | null | boolean;
}
// FETCH TYPES

// RESPONSIVE TYPES
export interface responseType<T> {
  statusCode: number;
  description: string;
  data: T;
  isValidationError: boolean;
  validationErrors: string[];
}
export interface emptyResponse {}

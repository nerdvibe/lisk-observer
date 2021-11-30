// tslint:disable-next-line
export const isObject = (value: any): boolean =>
  value && typeof value === "object" && value.constructor === Object;

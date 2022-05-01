import { getModule as vzGetModule, getModules as vzGetModules } from "@vizality/webpack";
const wp = require("@vizality/webpack");

const getModule = (filter: any, retry: boolean = true, forever: boolean = false) => {
  if (filter instanceof Array) {
    return vzGetModule(...filter, retry, forever);
  }
  return vzGetModule(filter, retry, forever);
};

const getAllModules = (filter: any) => {
  if (filter instanceof Array) {
    //@ts-ignore
    return vzGetModules(...filter);
  }
  return vzGetModules(filter);
};

export = {
  ...wp,
  getModule,
  getAllModules
};

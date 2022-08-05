import { getModule as vzGetModule, getModules as vzGetModules } from '@vizality/webpack';
import I18n, { messages } from '@vizality/src/src/api/I18n';
import * as wp from '@vizality/webpack';

const getModule = (filter: any, retry: boolean = true, forever: boolean = false) => {
  if (filter instanceof Array) {
    return vzGetModule(...filter, retry, forever);
  }
  return vzGetModule(filter, retry, forever);
};

const getAllModules = (filter: any) => {
  if (filter instanceof Array) {
    // @ts-ignore
    return vzGetModules(...filter);
  }
  return vzGetModules(filter);
};

const i18n = {
  Messages: messages,
};

const webpack = {
  ...wp,
  getModule,
  getAllModules,
  i18n,
};

export = webpack;

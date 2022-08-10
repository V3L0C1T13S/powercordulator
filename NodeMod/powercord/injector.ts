import { patch, unpatchAll } from '@vizality/patcher';

export const inject = (...args) => {
  patch(...args);
  args[1][`__powercordOriginal_${args[2]}`] = args[1][`__vizalityOriginal_${args[2]}`];
};

export const uninject = unpatchAll;

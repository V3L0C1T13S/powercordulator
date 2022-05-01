import React from "@vizality/packages";
import { Icon } from "@vizality/components";

const fa = require('./FontAwesome');

export const WrappedIcon = new Proxy(Icon, {
  get: (target, prop, receiver) => {
    if (Reflect.has(target, prop)) {
      return Reflect.get(target, prop, receiver);
    }
    if (prop === 'FontAwesome') return fa;
    return (props) => React.createElement(Icon, { name: prop, ...props });
  },
  set: (target, prop, value) => {
    return target[prop] = value;
  }
});

// WrappedIcon.badges = require('@vizality/components').Icon.badges;

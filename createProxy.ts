export function createProxy(t: any, props: any) {
    return new Proxy(t, {
        get: (target, prop, receiver) => {
            if (Object.keys(props).includes(prop as any)) {
                return props[prop];
            }
            return Reflect.get(target, prop, receiver);
        },
        set: (target, prop, value) => {
            if (Object.keys(props).includes(prop as any)) {
                return props[prop] = value;
            }
            return target[prop] = value;
        }
    });
}
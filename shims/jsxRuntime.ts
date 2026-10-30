import { getProxyFactory } from "@lib/utils/lazy";
import { findByPropsLazy } from "@metro/wrappers";

const jsxRuntime = findByPropsLazy("jsx", "jsxs", "Fragment");

function unproxyFirstArg<T>(args: T[]) {
    if (!args[0]) {
        throw new Error("The first argument (Component) is falsy. Ensure that you are passing a valid component.");
    }

    const factory = getProxyFactory(args[0]);
    if (factory) args[0] = factory();
    return args;
}

export const Fragment = Symbol.for("react.fragment");

export const jsx = (...args: any[]) => {
    unproxyFirstArg(args);
    try {
        if (args[1]?.id && typeof args[1].id === "string" && args[1].id.startsWith("zencord-")) {
            const custom = (globalThis as any).__zencord_badges?.[args[1].id];
            if (custom) {
                args[1] = { ...args[1], ...custom };
            }
        }
    } catch {}
    return jsxRuntime.jsx(...args);
};

export const jsxs = (...args: any[]) => {
    unproxyFirstArg(args);
    try {
        if (args[1]?.id && typeof args[1].id === "string" && args[1].id.startsWith("zencord-")) {
            const custom = (globalThis as any).__zencord_badges?.[args[1].id];
            if (custom) {
                args[1] = { ...args[1], ...custom };
            }
        }
    } catch {}
    return jsxRuntime.jsxs(...args);
};

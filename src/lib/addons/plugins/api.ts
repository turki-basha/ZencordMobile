/*
 * ZenCord Mobile, a Discord client mod
 * Copyright (c) 2026 ZenCord Team and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { patcher } from "@lib/api";
import { registerCommand } from "@lib/api/commands";
import { createStorage } from "@lib/api/storage";
import { logger } from "@lib/utils/logger";

import { registeredPlugins } from ".";
import { BunnyPluginObject, ZenCordPluginObject } from "./types";

type DisposableFn = (...props: any[]) => () => unknown;
function shimDisposableFn<F extends DisposableFn>(unpatches: (() => void)[], f: F): F {
    const dummy = ((...props: Parameters<F>) => {
        const up = f(...props);
        unpatches.push(up);
        return up;
    }) as F;

    for (const key in f) if (typeof f[key] === "function") {
        // @ts-ignore
        dummy[key] = shimDisposableFn(unpatches, f[key] as DisposableFn);
    }

    return dummy;
}

export function createZenCordPluginApi(id: string) {
    const disposers = new Array<DisposableFn>;
    const base = window.zencord || window.bunny;

    // proxying this would be a good idea
    const object = {
        ...base,
        api: {
            ...base.api,
            patcher: {
                before: shimDisposableFn(disposers, patcher.before),
                after: shimDisposableFn(disposers, patcher.after),
                instead: shimDisposableFn(disposers, patcher.instead)
            },
            commands: {
                ...base.api.commands,
                registerCommand: shimDisposableFn(disposers, registerCommand)
            },
            flux: {
                ...base.api.flux,
                intercept: shimDisposableFn(disposers, base.api.flux.intercept)
            }
        },
        plugin: {
            createStorage: <T extends object = any>() => createStorage<T>(`plugins/storage/${id}.json`),
            manifest: registeredPlugins.get(id),
            logger
        }
    } as unknown as ZenCordPluginObject;

    return {
        object,
        disposers,
    };
}

export const createBunnyPluginApi = createZenCordPluginApi;

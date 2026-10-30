/*
 * ZenCord Mobile, a Discord client mod
 * Copyright (c) 2026 ZenCord Team and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { BunnyManifest, ZenCordManifest } from "@lib/addons/types";
import { createStorage } from "@lib/api/storage";
import { Logger } from "@lib/utils/logger";

export type PluginRepo = Record<string, {
    version: string;
    // For plugin developing convenience, plugins with this on will always get fetched
    alwaysFetch?: boolean;
}> & {
    $meta: {
        name: string;
        description: string;
    };
};

export interface PluginRepoStorage {
    [repoUrl: string]: PluginRepo;
}

export interface PluginSettingsStorage {
    [pluginId: string]: {
        enabled: boolean;
    };
}

export interface ZenCordPluginManifest extends ZenCordManifest {
    readonly type: "plugin";
    readonly spec: 3;
    readonly main: string;
}

export type BunnyPluginManifest = ZenCordPluginManifest;

export interface ZenCordPluginManifestInternal extends ZenCordPluginManifest {
    readonly parentRepository: string;
    readonly jsPath?: string;
}

export type BunnyPluginManifestInternal = ZenCordPluginManifestInternal;

export interface PluginInstance {
    start?(): void;
    stop?(): void;
    SettingsComponent?(): JSX.Element;
}

export interface PluginInstanceInternal extends PluginInstance {
    readonly manifest: ZenCordPluginManifest;
}

export interface ZenCordPluginProperty {
    readonly manifest: ZenCordPluginManifestInternal;
    readonly logger: Logger;
    createStorage<T extends object>(): ReturnType<typeof createStorage<T>>;
}

export type BunnyPluginProperty = ZenCordPluginProperty;

export type ZenCordPluginObject = (typeof window.zencord | typeof window.bunny) & {
    plugin: ZenCordPluginProperty;
};

export type BunnyPluginObject = ZenCordPluginObject;

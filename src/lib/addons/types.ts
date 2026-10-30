/*
 * ZenCord Mobile, a Discord client mod
 * Copyright (c) 2026 ZenCord Team and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

export type Author = { name: string, id?: `${bigint}`; };

export interface ZenCordManifest {
    readonly id: string;
    readonly spec: number;
    readonly version: string;
    readonly type: string;
    readonly display: {
        readonly name: string;
        readonly description?: string;
        readonly authors?: Author[];
    };
    readonly main: unknown;
    readonly extras?: {
        readonly [key: string]: any;
    };
}

export type BunnyManifest = ZenCordManifest;

/*
 * ZenCord Mobile, a Discord client mod
 * Copyright (c) 2026 ZenCord Team and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { PluginInstanceInternal } from "@lib/addons/plugins/types";

interface CorePlugin {
    default: PluginInstanceInternal;
    preenabled: boolean;
}

// Called from @lib/plugins
export const getCorePlugins = (): Record<string, CorePlugin> => {
    // Badges temporarily disabled for testing chat/messages stability
    // const badgesPlugin = require("./badges");
    const quickInstallPlugin = require("./quickinstall");

    return {
        // "zencord.badges": badgesPlugin,
        "zencord.quickinstall": quickInstallPlugin
    };
};

/**
 * @internal
 */
export function defineCorePlugin(instance: PluginInstanceInternal): PluginInstanceInternal {
    // @ts-expect-error
    instance[Symbol.for("zencord.core.plugin")] = true;
    // @ts-expect-error
    instance[Symbol.for("bunny.core.plugin")] = true;
    return instance;
}

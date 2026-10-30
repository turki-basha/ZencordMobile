/*
 * ZenCord Mobile, a Discord client mod
 * Copyright (c) 2026 ZenCord Team and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { defineCorePlugin } from "..";

export default defineCorePlugin({
    manifest: {
        id: "zencord.badges",
        name: "ZenCord Badges",
        version: "1.0.0",
        description: "Official ZenCord badges integration.",
        authors: [{ name: "ZenCord Team" }]
    },
    start() {
        // Disabled native hook to prevent Discord Mobile message list & profile crashes
        return () => {};
    }
});

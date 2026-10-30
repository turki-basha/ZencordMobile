/*
 * ZenCord Mobile, a Discord client mod
 * Copyright (c) 2026 ZenCord Team and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { after } from "@lib/api/patcher";
import { onJsxCreate } from "@lib/api/react/jsx";
import { findByNameLazy } from "@metro/wrappers";

import { defineCorePlugin } from "..";

export const ZEN_BADGE_ICONS = {
    DONOR: "https://cdn.discordapp.com/emojis/1564696511953248398.webp?size=96",
    DEVELOPER: "https://cdn.discordapp.com/emojis/1564698785551097986.webp?size=96",
    BOT: "https://cdn.discordapp.com/emojis/1564687539556585492.webp?size=96",
    VIP: "https://cdn.discordapp.com/emojis/1564695885605109942.webp?size=96"
};

export interface ZenBadgeDbEntry {
    type?: "developer" | "bot" | "vip" | "donor" | "custom";
    tooltip?: string;
    badge?: string;
}

export interface ZenMobileBadge {
    label: string;
    url: string;
}

export const ZENCORD_API_BADGES_URL = "https://www.zencord.site/api/badges";
export const ZENCORD_API_DIRECT_URL = "https://zencord.site/api/badges";
export const ZENCORD_GITHUB_FALLBACK_URL = "https://raw.githubusercontent.com/turki-basha/ZenCord/main/badges.json";

const useBadgesModule = findByNameLazy("useBadges", false);

export default defineCorePlugin({
    manifest: {
        id: "zencord.badges",
        name: "ZenCord Badges",
        version: "1.0.0",
        description: "Official ZenCord badges integration for user profiles.",
        authors: [{ name: "ZenCord Team" }]
    },
    start() {
        const badgeCache: Record<string, ZenMobileBadge[]> = {};
        let globalBadgeDb: Record<string, ZenBadgeDbEntry[]> = {};

        function convertToMobileBadges(entries: ZenBadgeDbEntry[]): ZenMobileBadge[] {
            return entries.map(entry => {
                const type = entry.type || "donor";
                let defaultTitle = "ZenCord Supporter";
                let defaultIcon = ZEN_BADGE_ICONS.DONOR;

                if (type === "developer") {
                    defaultTitle = "ZenCord Developer";
                    defaultIcon = ZEN_BADGE_ICONS.DEVELOPER;
                } else if (type === "bot") {
                    defaultTitle = "ZenCord Official Bot";
                    defaultIcon = ZEN_BADGE_ICONS.BOT;
                } else if (type === "vip") {
                    defaultTitle = "ZenCord VIP";
                    defaultIcon = ZEN_BADGE_ICONS.VIP;
                }

                return {
                    label: entry.tooltip || defaultTitle,
                    url: entry.badge || defaultIcon
                };
            });
        }

        async function fetchZenCordDatabase() {
            try {
                const [apiWwwRes, apiDirectRes, fallbackRes] = await Promise.allSettled([
                    fetch(ZENCORD_API_BADGES_URL).then(r => r.ok ? r.json() : null),
                    fetch(ZENCORD_API_DIRECT_URL).then(r => r.ok ? r.json() : null),
                    fetch(ZENCORD_GITHUB_FALLBACK_URL).then(r => r.ok ? r.json() : null)
                ]);

                const merged: Record<string, ZenBadgeDbEntry[]> = {};

                if (fallbackRes.status === "fulfilled" && fallbackRes.value && typeof fallbackRes.value === "object") {
                    for (const [userId, badges] of Object.entries(fallbackRes.value as Record<string, any>)) {
                        if (Array.isArray(badges)) {
                            merged[userId] = [...(merged[userId] || []), ...badges];
                        }
                    }
                }

                if (apiDirectRes.status === "fulfilled" && apiDirectRes.value && typeof apiDirectRes.value === "object") {
                    for (const [userId, badges] of Object.entries(apiDirectRes.value as Record<string, any>)) {
                        if (Array.isArray(badges)) {
                            merged[userId] = badges;
                        }
                    }
                }

                if (apiWwwRes.status === "fulfilled" && apiWwwRes.value && typeof apiWwwRes.value === "object") {
                    for (const [userId, badges] of Object.entries(apiWwwRes.value as Record<string, any>)) {
                        if (Array.isArray(badges)) {
                            merged[userId] = badges;
                        }
                    }
                }

                globalBadgeDb = merged;

                // Prime user cache
                for (const [userId, entries] of Object.entries(merged)) {
                    badgeCache[userId] = convertToMobileBadges(entries);
                }
            } catch (err) {
                console.error("[ZenCord Badges] Failed to load badges database:", err);
            }
        }

        // Fetch initially and sync every 15 minutes
        fetchZenCordDatabase();
        const refreshInterval = setInterval(fetchZenCordDatabase, 15 * 60 * 1000);

        try {
            onJsxCreate("ProfileBadge", (_, ret) => {
                try {
                    if (ret?.props?.id && typeof ret.props.id === "string" && ret.props.id.startsWith("zencord-")) {
                        const custom = (globalThis as any).__zencord_badges?.[ret.props.id];
                        if (custom && ret.props) {
                            Object.assign(ret.props, custom);
                        }
                    }
                } catch {}
            });

            onJsxCreate("RenderedBadge", (_, ret) => {
                try {
                    if (ret?.props?.id && typeof ret.props.id === "string" && ret.props.id.startsWith("zencord-")) {
                        const custom = (globalThis as any).__zencord_badges?.[ret.props.id];
                        if (custom && ret.props) Object.assign(ret.props, custom);
                    }
                } catch {}
            });
            onJsxCreate("RenderBadge", (_, ret) => {
                try {
                    if (ret?.props?.id && typeof ret.props.id === "string" && ret.props.id.startsWith("zencord-")) {
                        const custom = (globalThis as any).__zencord_badges?.[ret.props.id];
                        if (custom && ret.props) {
                            Object.assign(ret.props, custom);
                        }
                    }
                } catch {}
            });
        } catch {}

        if (useBadgesModule) {
            after("default", useBadgesModule, ([user], r) => {
                try {
                    if (!user || !r || !Array.isArray(r)) return r;
                    const userId = user.userId || user.id;
                    if (!userId) return r;

                    const userBadges = badgeCache[userId] || (globalBadgeDb[userId] ? convertToMobileBadges(globalBadgeDb[userId]) : null);
                    if (userBadges && userBadges.length > 0) {
                        (globalThis as any).__zencord_badges ??= {};

                        userBadges.forEach((badge, index) => {
                            const badgeKey = `zencord-${userId}-${index}`;
                            (globalThis as any).__zencord_badges[badgeKey] = {
                                id: badgeKey,
                                source: { uri: badge.url },
                                label: badge.label,
                                description: badge.label
                            };

                            if (!r.some((existing: any) => existing?.id === badgeKey)) {
                                r.push({
                                    id: badgeKey,
                                    description: badge.label,
                                    source: { uri: badge.url },
                                    icon: "dummy",
                                    iconSrc: badge.url
                                });
                            }
                        });
                    }
                    return r;
                } catch (e) {
                    return r;
                }
            });
        }

        return () => {
            clearInterval(refreshInterval);
        };
    }
});

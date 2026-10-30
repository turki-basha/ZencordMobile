import { after } from "@lib/api/patcher";
import { findInReactTree } from "@lib/utils";
import { React } from "@metro/common";
import { TableRow } from "@metro/common/components";
import { findByNameLazy, findByPropsLazy } from "@metro/wrappers";
import { registeredSections } from "@ui/settings";

import { CustomPageRenderer, wrapOnPress } from "./shared";

const settingConstants = findByPropsLazy("SETTING_RENDERER_CONFIG");
const SettingsOverviewScreen = findByNameLazy("SettingsOverviewScreen", false);

export function patchTabsUI(unpatches: (() => void | boolean)[]) {
    try {
        const getRows = () => Object.values(registeredSections)
            .flatMap(sect => sect.map(row => ({
                [row.key]: {
                    type: "pressable",
                    title: row.title,
                    icon: row.icon,
                    IconComponent: () => <TableRow.Icon source={row.icon} />,
                    usePredicate: row.usePredicate,
                    useTrailing: row.useTrailing,
                    onPress: wrapOnPress(row.onPress, null, row.render, row.title()),
                    withArrow: true,
                    ...row.rawTabsConfig
                }
            })))
            .reduce((a, c) => Object.assign(a, c), {});

        const origRendererConfig = settingConstants.SETTING_RENDERER_CONFIG;
        let rendererConfigValue = settingConstants.SETTING_RENDERER_CONFIG;

        Object.defineProperty(settingConstants, "SETTING_RENDERER_CONFIG", {
            enumerable: true,
            configurable: true,
            get: () => ({
                ...rendererConfigValue,
                VendettaCustomPage: {
                    type: "route",
                    title: () => "ZenCord",
                    screen: {
                        route: "VendettaCustomPage",
                        getComponent: () => CustomPageRenderer
                    }
                },
                BUNNY_CUSTOM_PAGE: {
                    type: "route",
                    title: () => "ZenCord",
                    screen: {
                        route: "BUNNY_CUSTOM_PAGE",
                        getComponent: () => CustomPageRenderer
                    }
                },
                ...getRows()
            }),
            set: v => rendererConfigValue = v,
        });

        unpatches.push(() => {
            Object.defineProperty(settingConstants, "SETTING_RENDERER_CONFIG", {
                value: origRendererConfig,
                writable: true,
                get: undefined,
                set: undefined
            });
        });

        if (SettingsOverviewScreen) {
            unpatches.push(after("default", SettingsOverviewScreen, (_, ret) => {
                try {
                    const tree = findInReactTree(ret, i => i?.props?.sections);
                    if (!tree?.props?.sections) return ret;
                    const sections = tree.props.sections;

                    let index = -~sections.findIndex((i: any) => i?.settings?.includes("ACCOUNT")) || 1;

                    Object.keys(registeredSections).forEach(sect => {
                        if (sections.some((s: any) => s.title === sect || s.label === sect)) return;

                        sections.splice(index++, 0, {
                            label: sect,
                            title: sect,
                            settings: registeredSections[sect].map(a => a.key)
                        });
                    });
                } catch (err) {
                    console.error("[ZenCord Tabs] Error injecting sections:", err);
                }
                return ret;
            }));
        }
    } catch (e) {
        console.error("[ZenCord Tabs] Failed to initialize patchTabsUI:", e);
    }
}

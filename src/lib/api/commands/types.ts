/*
 * ZenCord Mobile, a Discord client mod
 * Copyright (c) 2026 ZenCord Team and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

export interface Argument {
    type: ApplicationCommandOptionType,
    name: string,
    value: string,
    focused: undefined;
    options: Argument[];
}

export interface ApplicationCommand {
    name: string;
    description: string;
    execute: (args: Argument[], ctx: CommandContext) => CommandResult | void | Promise<CommandResult> | Promise<void>;
    options: ApplicationCommandOption[];
    id?: string;
    applicationId?: string;
    displayName?: string;
    displayDescription?: string;
    untranslatedDescription?: string;
    untranslatedName?: string;
    inputType?: ApplicationCommandInputType;
    type?: ApplicationCommandType;
    __zencord?: {
        shouldHide: () => boolean;
    };
    __bunny?: {
        shouldHide: () => boolean;
    };
}

export interface ZenCordApplicationCommand extends ApplicationCommand {
    shouldHide: () => boolean;
}

export type BunnyApplicationCommand = ZenCordApplicationCommand;

export enum ApplicationCommandInputType {
    BUILT_IN,
    BUILT_IN_TEXT,
    BUILT_IN_INTEGRATION,
    BOT,
    PLACEHOLDER,
}

export interface ApplicationCommandOption {
    name: string;
    description: string;
    required?: boolean;
    type: ApplicationCommandOptionType;
    displayName?: string;
    displayDescription?: string;
}

export enum ApplicationCommandOptionType {
    SUB_COMMAND = 1,
    SUB_COMMAND_GROUP,
    STRING,
    INTEGER,
    BOOLEAN,
    USER,
    CHANNEL,
    ROLE,
    MENTIONABLE,
    NUMBER,
    ATTACHMENT
}

export enum ApplicationCommandType {
    CHAT = 1,
    USER,
    MESSAGE
}

export interface CommandContext {
    channel: any;
}

export interface CommandResult {
    content?: string;
}

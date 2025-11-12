export const MessageComponentType = {
    /** @deprecated Container or row of components. Use ACTION_ROW instead */
    ActionRow: 1,
    /** @deprecated A clickable button. Use BUTTON instead */
    Button: 2,
    /** @deprecated Dropdown menu. Use SELECT instead */
    Select: 3,

    /** Container to display a row of interactive components */
    ACTION_ROW: 1,
    /** A clickable button */
    BUTTON: 2,
    /** Select menu for picking from defined text options */
    STRING_SELECT: 3,
    /** Text input object */
    TEXT_INPUT: 4,
    /** Select menu for users */
    USER_SELECT: 5,
    /** Select menu for roles */
    ROLE_SELECT: 6,
    /** Select menu for mentionables (users and roles) */
    MENTIONABLE_SELECT: 7,
    /** Select menu for channels */
    CHANNEL_SELECT: 8,
    /** Container to display text alongside an accessory component */
    SECTION: 9,
    /** Markdown text */
    TEXT_DISPLAY: 10,
    /** Small image that can be used as an accessory */
    THUMBNAIL: 11,
    /** Display images and other media */
    MEDIA_GALLERY: 12,
    /** Displays an attached file */
    FILE: 13,
    /** Component to add vertical padding between other components */
    SEPARATOR: 14,
    /** Container that visually groups a set of components */
    CONTAINER: 17,
    /** Container associating a label and description with a component */
    LABEL: 18,
    /** Component for uploading files */
    FILE_UPLOAD: 19
} as const

export type MessageComponentType =
    (typeof MessageComponentType)[keyof typeof MessageComponentType]

export const ButtonStyle = {
    PRIMARY: 1,
    SECONDARY: 2,
    SUCCESS: 3,
    DANGER: 4,
    LINK: 5,
    PREMIUM: 6,

    // Aliases
    BLURPLE: 1,
    GREY: 2,
    GREEN: 3,
    RED: 4,
    DESTRUCTIVE: 4,
    NAVIGATE: 5,
    PURCHASE: 6
} as const

export type ButtonStyle = (typeof ButtonStyle)[keyof typeof ButtonStyle]

export const TextInputStyle = {
    /** Intended for short single-line text. */
    SHORT: 1,
    /** Intended for much longer inputs. */
    PARAGRAPH: 2
} as const

export type TextInputStyle =
    (typeof TextInputStyle)[keyof typeof TextInputStyle]

export interface MessageComponentEmoji {
    id?: string
    name?: string
    animated?: boolean
}

export interface ActionRowComponentPayload {
    type: typeof MessageComponentType.ACTION_ROW
    components: MessageComponentPayload[]
}

export interface ActionRowComponent {
    type: typeof MessageComponentType.ACTION_ROW | "ACTION_ROW"
    components: MessageComponentData[]
}

export interface ButtonComponentPayload {
    type: typeof MessageComponentType.BUTTON
    label?: string
    style: ButtonStyle
    custom_id?: string
    url?: string
    sku_id?: string
    disabled?: boolean
    emoji?: MessageComponentEmoji
}

export interface ButtonComponent {
    type: typeof MessageComponentType.BUTTON | "BUTTON"
    label: string
    style: ButtonStyle | keyof typeof ButtonStyle
    customID?: string
    url?: string
    disabled?: boolean
    emoji?: MessageComponentEmoji
}

export interface SelectComponentOption {
    label: string
    value: string
    default?: boolean
    description?: string
    emoji?: MessageComponentEmoji
}

// TODO: rename to StringSelectComponentPayload
export interface SelectComponentPayload {
    type: typeof MessageComponentType.STRING_SELECT
    custom_id: string
    placeholder?: string
    options: SelectComponentOption[]
    disabled?: boolean
    min_values?: number
    max_values?: number
}

// TODO: rename to StringSelectComponent
export interface SelectComponent {
    type: typeof MessageComponentType.STRING_SELECT | "STRING_SELECT"
    customID: string
    placeholder?: string
    options: SelectComponentOption[]
    disabled?: boolean
    minValues?: number
    maxValues?: number
}

export interface TextInputComponentPayload {
    type: typeof MessageComponentType.TEXT_INPUT
    label: string
    custom_id: string
    style: TextInputStyle
    placeholder?: string
    min_length?: number
    max_length?: number
    value?: string
    required?: boolean
}

export interface TextInputComponent {
    type: typeof MessageComponentType.TEXT_INPUT | "TEXT_INPUT"
    label: string
    customID: string
    style: TextInputStyle | keyof typeof TextInputStyle
    placeholder?: string
    minLength?: number
    maxLength?: number
    value?: string
    required?: boolean
}

export type MessageComponentPayload =
    | ActionRowComponentPayload
    | ButtonComponentPayload
    | SelectComponentPayload
    | TextInputComponentPayload

export type MessageComponentData =
    | ActionRowComponent
    | ButtonComponent
    | SelectComponent
    | TextInputComponent

export interface InteractionMessageComponentData {
    custom_id: string
    component_type: MessageComponentType
    values?: string[]
}

export interface ModalSubmitComponentTextInputData {
    type: typeof MessageComponentType.TEXT_INPUT
    custom_id: string
    value: string
}

export type ModalSubmitComponentDataBase = ModalSubmitComponentTextInputData

export interface ModalSubmitActionRow {
    type: typeof MessageComponentType.ACTION_ROW
    components: ModalSubmitComponentDataBase[]
}

export type ModalSubmitComponentData = ModalSubmitActionRow

export interface InteractionModalSubmitData {
    custom_id: string
    components: ModalSubmitComponentData[]
}

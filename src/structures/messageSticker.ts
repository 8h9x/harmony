import type { Client } from '../client/mod.ts'
import type {
  MessageStickerItemPayload,
  MessageStickerPackPayload,
  MessageStickerPayload,
  MessageStickerType,
  ModifyGuildStickerOptions
} from '../types/channel.ts'
import {
  MessageStickerFormatTypes
} from '../types/channel.ts'
import { Constants } from '../types/constants.js'
import { SnowflakeBase } from './base.ts'
import { User } from './user.ts'

export class MessageStickerItem extends SnowflakeBase {
  name!: string
  formatType!: MessageStickerFormatTypes
  url!: string

  constructor(client: Client, data: MessageStickerItemPayload) {
    super(client)
    this.readFromData(data)
  }

  readFromData(data: MessageStickerItemPayload): void {
    this.id = data.id ?? this.id
    this.name = data.name ?? this.name
    this.formatType = data.format_type ?? this.formatType
    this.url = this.getUrl(this.id, this.formatType) ?? this.url;
  }

  private getStickerFileExtension(formatType: MessageStickerFormatTypes): string {
    if (formatType === MessageStickerFormatTypes.LOTTIE) {
      return "json"
    } else if (formatType === MessageStickerFormatTypes.GIF) {
      return "gif"
    } else {
      return "png"
    }
  }

  getUrl(id: string, formatType: MessageStickerFormatTypes): string {
    return `${formatType === MessageStickerFormatTypes.GIF ? Constants.DISCORD_MEDIA_URL : Constants.DISCORD_CDN_URL}/stickers/${id}.${this.getStickerFileExtension(formatType)}`;
  }
}

export class MessageSticker extends SnowflakeBase {
  name!: string
  packID?: string
  type!: MessageStickerType
  formatType!: MessageStickerFormatTypes
  description: string | null = null
  tags!: string
  available?: boolean
  guildID?: string
  user?: User
  sortValue?: number

  constructor(client: Client, data: MessageStickerPayload) {
    super(client, data)
    this.readFromData(data)
  }

  readFromData(data: MessageStickerPayload): void {
    this.name = data.name ?? this.name
    this.type = data.type ?? this.type
    this.formatType = data.format_type ?? this.formatType
    this.description = data.description ?? this.description
    this.packID = data.pack_id ?? this.packID
    this.tags = data.tags ?? this.tags
    this.available = data.available ?? this.available
    this.guildID = data.guild_id ?? this.guildID
    this.user =
      data.user === undefined ? undefined : new User(this.client, data.user)
    this.sortValue = data.sort_value ?? this.sortValue
  }

  /** Edit the Sticker */
  async edit(options: Partial<ModifyGuildStickerOptions>): Promise<this> {
    if (this.guildID === undefined)
      throw new Error('Only Guild Stickers can be edited')
    const { id } = await this.client.stickers.edit(this.guildID, this, options)
    this.readFromData((await this.client.stickers._get(id))!)
    return this
  }

  /** Delete the Sticker */
  async delete(reason?: string): Promise<boolean> {
    if (this.guildID === undefined)
      throw new Error('Only Guild Stickers can be deleted')
    return this.client.stickers.delete(this.guildID, this, reason)
  }
}

export class MessageStickerPack extends SnowflakeBase {
  stickers!: MessageSticker[]
  name!: string
  skuID!: string
  coverStickerID?: string
  description!: string
  bannerAssetID?: string

  constructor(client: Client, data: MessageStickerPackPayload) {
    super(client, data)
    this.readFromData(data)
  }

  readFromData(data: MessageStickerPackPayload): void {
    this.stickers = data.stickers.map((e) => new MessageSticker(this.client, e))
    this.name = data.name ?? this.name
    this.skuID = data.sku_id ?? this.skuID
    this.coverStickerID = data.cover_sticker_id ?? this.coverStickerID
    this.description = data.description ?? this.description
    this.bannerAssetID = data.banner_asset_id ?? this.bannerAssetID
  }
}

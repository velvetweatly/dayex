import { PluginFunc } from 'dayex'

declare const plugin: PluginFunc
export = plugin

declare module 'dayex' {
  export function updateLocale(localeName: string, customConfig: Record<string, unknown>): Record<string, unknown>
}

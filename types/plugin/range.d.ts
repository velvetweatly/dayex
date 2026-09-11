import { PluginFunc, ConfigType, OpUnitType } from 'dayex'

declare const plugin: PluginFunc<plugin.RangeOptions>
export as namespace plugin
export = plugin

declare namespace plugin {
  type Inclusivity = '()' | '[]' | '[)' | '(]'

  interface RangeOptions {
    inclusive?: Inclusivity
  }

  interface RangeJSON {
    start: string | null
    end: string | null
  }

  interface RangeSetJSON {
    ranges: RangeJSON[]
  }

  interface Range {
    start(): import('dayex').Dayex
    end(): import('dayex').Dayex
    isValid(): boolean
    clone(): Range
    setStart(value: ConfigType): Range
    setEnd(value: ConfigType): Range
    contains(
      target: ConfigType | Range | RangeSet,
      unit?: OpUnitType | Inclusivity,
      inclusive?: Inclusivity
    ): boolean
    overlaps(
      target: ConfigType | Range | RangeSet,
      unit?: OpUnitType | Inclusivity,
      inclusive?: Inclusivity
    ): boolean
    adjacent(
      target: ConfigType | Range,
      unit?: OpUnitType | Inclusivity,
      inclusive?: Inclusivity
    ): boolean
    isSame(target: ConfigType | Range, unit?: OpUnitType): boolean
    isBefore(
      target: ConfigType | Range | RangeSet,
      unit?: OpUnitType | Inclusivity,
      inclusive?: Inclusivity
    ): boolean
    isAfter(
      target: ConfigType | Range | RangeSet,
      unit?: OpUnitType | Inclusivity,
      inclusive?: Inclusivity
    ): boolean
    diff(unit?: OpUnitType, float?: boolean): number
    length(unit?: OpUnitType, inclusive?: Inclusivity): number
    format(startFmt?: string, endFmt?: string): string
    toString(): string
    toJSON(): RangeJSON
    intersect(
      target: Range,
      unit?: OpUnitType | Inclusivity,
      inclusive?: Inclusivity
    ): Range | null
    union(
      target: Range,
      unit?: OpUnitType | Inclusivity,
      inclusive?: Inclusivity
    ): Range | null
    subtract(value: number, unit?: OpUnitType): Range
    subtract(target: Range, unit?: OpUnitType): Range[]
    gap(target: Range, unit?: OpUnitType): Range | null
    clamp(target: Range): Range | null
    snap(unit: OpUnitType): Range
    add(n: number, unit?: OpUnitType): Range
    extend(n: number, unit?: OpUnitType): Range
    extendStart(n: number, unit?: OpUnitType): Range
    each(
      unit: OpUnitType,
      limit?: number | Inclusivity,
      inclusive?: Inclusivity
    ): import('dayex').Dayex[]
    every(
      n: number,
      unit: OpUnitType,
      limit?: number | Inclusivity,
      inclusive?: Inclusivity
    ): import('dayex').Dayex[]
    split(n: number, unit?: OpUnitType): Range[]
    eachRange(
      unit: OpUnitType,
      limit?: number
    ): Range[]
    toDuration(): any
    eachBusinessDay(opt?: object): import('dayex').Dayex[]
  }

  interface RangeSet {
    ranges(): Range[]
    isEmpty(): boolean
    isValid(): boolean
    clone(): RangeSet
    contains(
      target: ConfigType | Range | RangeSet,
      unit?: OpUnitType | Inclusivity,
      inclusive?: Inclusivity
    ): boolean
    overlaps(
      target: ConfigType | Range | RangeSet,
      unit?: OpUnitType | Inclusivity,
      inclusive?: Inclusivity
    ): boolean
    add(target: Range | RangeSet): RangeSet
    subtract(target: Range | RangeSet, unit?: OpUnitType): RangeSet
    intersect(target: Range | RangeSet): RangeSet
    union(target: Range | RangeSet): RangeSet
    each(unit: OpUnitType, limit?: number): import('dayex').Dayex[]
    eachBusinessDay(opt?: object): import('dayex').Dayex[]
    diff(unit?: OpUnitType, float?: boolean): number
    length(unit?: OpUnitType, inclusive?: Inclusivity): number
    format(startFmt?: string, endFmt?: string): string
    toJSON(): RangeSetJSON
  }
}

declare module 'dayex' {
  interface Dayex {
    toRange(endOrUnit?: ConfigType | OpUnitType): plugin.Range
    isIn(
      range: plugin.Range | plugin.RangeSet,
      unit?: OpUnitType | plugin.Inclusivity,
      inclusive?: plugin.Inclusivity
    ): boolean
  }

  export function range(start: ConfigType, end: ConfigType, unit?: OpUnitType): plugin.Range
  export function range(bounds: [ConfigType, ConfigType], unit?: OpUnitType): plugin.Range
  export function range(bounds: { start: ConfigType, end: ConfigType, unit?: OpUnitType }): plugin.Range
  export function range(value: plugin.Range): plugin.Range
  export function isRange(value: any): value is plugin.Range

  export function rangeSet(...ranges: Array<plugin.Range | plugin.RangeSet>): plugin.RangeSet
  export function rangeSet(ranges: Array<plugin.Range | plugin.RangeSet>): plugin.RangeSet
  export function isRangeSet(value: any): value is plugin.RangeSet
}

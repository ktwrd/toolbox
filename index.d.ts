declare module 'tinytoolbox';

export declare function arrayContains<T>(
    arr: T[],
    obj: T): boolean
export declare function isJSON(
    input: string): boolean
export declare function isInt(
    input: string): boolean
export declare enum StringGenCharsetType
{
    AlphaNumericSpecialExtended,
    AlphaNumericSpecial,
    AlphaNumericSpecialSafe,
    AlphaNumeric,
    Alpha,
    AlphaLower,
    AlphaUpper,
    Numeric,
    SpecialExtended,
    Special,
    SpecialSafe
}
export declare function stringGen(
    length: number,
    charsetType: StringGenCharsetType,
    charset?: string): string
export declare function validModule(location: string): boolean

export * as JSON from './tools/json'
export * as async from './tools/async'
import type * as _queue from './tools/queue'

export declare type queue = _queue
export declare interface IQueueConfig
{
    threads: number,
    log: boolean,
    prefix: string
}
export declare const DefaultIQueueConfig: IQueueConfig
export declare interface IQueueMessage
{
    timestamp: EpochTimeStamp,
    message: any
}
export declare type QueueItemCallback = () => Promise<void>
export declare type QueueStorageCallback = (storage: IQueueStorage) => void
export declare interface IQueueStorage
{
    messages: IQueueMessage[]
    items: QueueItemCallback[]
}
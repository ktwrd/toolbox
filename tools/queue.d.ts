import type {IQueueStorage, IQueueConfig, QueueStorageCallback, QueueItemCallback} from '../index'
declare class queue
{
    public _UIDGen(length: number): string
    public _log(content: any): void
    public _message(messageGiven: any): void

    public storage: IQueueStorage

    public constructor(config: IQueueConfig)

    public add(callback?: QueueItemCallback): void
    public clear(callback?: QueueStorageCallback): void
    public async start(callback?: QueueStorageCallback): Promise<IQueueStorage>
    public dump(callback?: QueueStorageCallback): IQueueStorage
}
export = queue
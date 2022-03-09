class queue {
    // Local stuff to make our life more easy.
    _UIDGen(length) {
        var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        var retVal = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
    }
    _log(content) {
        if (this.storage.logging) {
            console.debug(`[${this.storage.UID}] ${this.storage.prefix} ${content}`);
        }
    }
    _message(messageGiven) {
        var shitToPush = {timestamp:Date.now(),message:messageGiven}
        this.storage.messages.push(shitToPush);
        this.storage.currentMessage = shitToPush;
    }

    // Actual code starts here
    constructor(config) {
        if (config == undefined) {
            var config = {};
        }
        this.storage = {
            UID: this._UIDGen(8),
            threads: config.threads || 1,
            logging: config.log || false,
            prefix: config.prefix || "[cacheQueue]",
            items: [],
            messages: [],
            currentMessage: 'IDLE'
        }
        this._message(`QUEUE_NEW-${this.storage.UID}`);
    }
    add (callBack) {
        // Add this callback to the queue
        this.storage.items.push(callBack);
        this._message(`QUEUE_APPEND`);
    }
    clear (callBack) {
        this.storage.items = [];
        this._log(`Cleared queue.`);
        this._message(`QUEUE_CLEAR`);
        callBack(this.storage);
    }
    async start(callBack) {
        // Start the queue
        if (this.storage.items.length < 1) {
            // Nothing was given ;w;
            throw "No items were queued";
        }
        this.storage.queueStart = Date.now();
        this._message(`QUEUE_RUN-START`);
        for (const obj of this.storage.items) {
            await obj();
            this._message(`QUEUE_RUN-OBJDONE`);
        }
        this._message(`QUEUE_RUN-END`);
        this._message(`IDLE`);
        this.storage.queueEnd = Date.now();
        this.storage.queueDuration = this.storage.queueEnd - this.storage.queueStart;
        this._log(`COMPLETED ${this.storage.items.length} TASKS IN ${(this.storage.queueDuration/1000).toFixed(2)} SECONDS`);
        if (callBack != undefined) {
            callBack(this.storage);
        } else {
            return this.storage;
        }
    }
    dump (callBack) {
        if (callBack == undefined) {
            return this.storage;
        } else {
            callBack(this.storage);
        }
    }
}

module.exports = queue;
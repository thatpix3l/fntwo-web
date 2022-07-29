/**
 * Listen for the pressed state of a key, without waiting for key repeat delays.
 */
export class KeyListener {

    private keyPressed: { [keyName: string]: boolean } = {}
    private onPressCallbacks: { [keyName: string]: () => any } = {}

    private onReleaseCallbacks: { [keyName: string]: () => any } = {}

    constructor() {
        document.addEventListener('keydown', e => {
            this.keyPressed[e.key] = true
        })

        document.addEventListener('keyup', e => {
            this.keyPressed[e.key] = false
            this.onReleaseCallbacks[e.key] && this.onReleaseCallbacks[e.key]()
        })
    }

    /**
     * 
     * @param keyName Name of key to watch for and run callback against
     * @param callback Callback to run when key is pressed
     */
    OnPress(keyName: string, callback: () => any) {
        this.onPressCallbacks[keyName] = callback
    }

    OnRelease(keyName: string, callback: () => any) {
        this.onReleaseCallbacks[keyName] = callback
    }

    /**
     * Loop through each key that's truthy, and run the call back associated with it.
     * Note that this runs only once; call this function inside a loop, like requestAnimationFrame
     */
    Run() {

        for(const keyName in this.keyPressed) {

            this.keyPressed[keyName] && this.onPressCallbacks[keyName] && this.onPressCallbacks[keyName]()

        }

    }

}


export class ReconnectableWebSocket {

    private ws?: WebSocket
    private name: string
    private onMsgCallback: (ev: MessageEvent<any>) => any

    constructor(name: string, url: string, timeoutDelay: number, onMessage: (ev: MessageEvent<any>) => any) {

        this.name = name
        this.onMsgCallback = onMessage
        this.connectWebSocket(url, timeoutDelay)
        
    }

    private connectWebSocket(url: string, timeoutDelay: number) {

        const ws = new WebSocket(url)
        ws.onopen = _ => this.ws = ws
        ws.onmessage = this.onMsgCallback
        ws.onclose = _ => {
            console.log(`${this.name} socket is closed, reconnecting in 1 second...`)
            setTimeout(() => this.connectWebSocket(url, timeoutDelay), timeoutDelay)
        }
        ws.onerror = _ => this.ws?.close()

    }

    Send(data: string | ArrayBufferLike | Blob | ArrayBufferView) {
        this.ws?.send(data)
    }

}
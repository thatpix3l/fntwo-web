type keyListenerCallbacks = {
    listenersSetup: boolean
    keyPressed: { [keyName: string]: Boolean }
    onPress: { [keyName: string]: () => any }
    onRelease: { [keyName: string]: () => any }
}

let keyCallbacks: keyListenerCallbacks = {
    listenersSetup: false,
    keyPressed: {},
    onPress: {},
    onRelease: {}
}

export const StartKeyListener = () => {
    document.addEventListener('keydown', keyEvent => {
        keyCallbacks.keyPressed[keyEvent.key] = true
   })

   document.addEventListener('keyup', keyEvent => {
       keyCallbacks.keyPressed[keyEvent.key] = false
       const onRelease = keyCallbacks.onRelease[keyEvent.key]
       onRelease && onRelease()
   })
}

/**
 * Listen for the pressed state of a key, without waiting for key repeat delays.
 */
export class KeyListener {

    constructor() {
        if(!keyCallbacks.listenersSetup) {
            StartKeyListener()
            keyCallbacks.listenersSetup = true
        }
    }

    /**
     * 
     * @param keyName Name of key to watch for and run callback against
     * @param callback Callback to run when key is pressed
     */
    OnPress(keyName: string, callback: () => any) {
        keyCallbacks.onPress[keyName] = callback
    }

    OnRelease(keyName: string, callback: () => any) {
        keyCallbacks.onRelease[keyName] = callback
    }

    /**
     * Loop through each key that's truthy, and run the call back associated with it.
     * Note that this runs only once; call this function inside a loop, like requestAnimationFrame
     */
    Run() {

        for(const keyName in keyCallbacks.keyPressed) {

            const onPress = keyCallbacks.onPress[keyName]
            if(onPress !== undefined && keyCallbacks.keyPressed[keyName]) {
                onPress()
            }

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
        ws.onopen = _ => {
            this.ws = ws
            console.log(`Connected to ${this.name} WebSocket!`)
        }
        ws.onmessage = this.onMsgCallback
        ws.onclose = _ => {
            console.log(`${this.name} socket is closed, reconnecting in 1 second...`)
            setTimeout(() => this.connectWebSocket(url, timeoutDelay), timeoutDelay)
        }
        ws.onerror = _ => this.ws?.close()

    }

    Send(data: string | ArrayBufferLike | Blob | ArrayBufferView) {
        if(data === undefined) {
            console.error("Received undefined data, refusing sending data to backend")
            return
        }

        this.ws?.send(data)
    }

}

export class Toggle {

    private callback: () => any = () => {}
    private enabled: Boolean = true

    constructor(callback: () => any) {
        this.callback = callback
    }

    Run() {
        if(this.enabled) {
            this.callback()
            this.enabled = false
        }
    }

    Enable() {
        this.enabled = true
    }

}

export const randomID = (length: number = 12) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

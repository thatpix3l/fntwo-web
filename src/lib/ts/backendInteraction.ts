export class Status {

    success: boolean | undefined = undefined
    private successTimeoutID: NodeJS.Timeout | undefined = undefined

    resetSuccess(resetCallback: () => void, resetDelay: number) {
        clearTimeout(this.successTimeoutID)
        this.successTimeoutID = setTimeout(() => { this.success = undefined; resetCallback() } , resetDelay)
    }

}

export type GenericAction = () => Promise<boolean>

export class BackendAction {

    readonly status = new Status()
    readonly name: string
    private normalCallback: GenericAction = async () => { return true }

    userCallback = function() {}
    resetCallback = function() {}
    failureCallback = function() {}

    constructor(name: string, normalCallback: GenericAction) {
        this.name = name
        this.normalCallback = normalCallback
    }

    async run() {

        try {

            const status = await this.normalCallback()
            if(!status) {
                throw `Unable to run backend action "${this.name}"`
            }

            this.status.success = true
            this.userCallback()
            this.status.resetSuccess(this.resetCallback, 750)

        } catch(e) {

            this.status.success = false
            this.failureCallback()
            this.status.resetSuccess(this.resetCallback, 750)
            console.error(e)

        }

    }

}

export class ActionsList {

    SaveScene = new BackendAction("save scene", async () => {
        const status = await fetch("/api/write/config/scene/set", {method: "PUT"})
        return status.ok
    })

    ChangeReceiver = new BackendAction("change receiver", async () => {
        const status = await fetch("/api/write/receiver/set", {method: "PUT"})
        return status.ok
    })

    SyncVRM = async (file: File) => {

        await fetch("/api/write/model/set", {
            method: "PUT",
            body: file
        })

        const syncedFile = await fetch("/api/read/model/get", {
            method: "GET"
        }).then(resp => resp.blob())

        return URL.createObjectURL(syncedFile)

    }

}
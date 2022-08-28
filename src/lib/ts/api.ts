import type { SceneConfig } from "./models/config"

export type receiverInfo = {
    active: string
    available: string[]
}

export class Status {
    success: boolean | undefined = undefined
    successTimeout: NodeJS.Timeout | undefined
    waiting: boolean = false
}

const throwFetch = (response: Response) => {
    if(!response.ok) {
        throw new Error(`Not 2xx response: ${response.status}`)
    }
}

export let GetScene = async () => {
    const response = await fetch("/api/config/scene")
    throwFetch(response)
    
    return await response.json() as SceneConfig
}

export let SetScene = async () => {
    const response = await fetch("/api/config/scene/update", {method: "PUT"})
    throwFetch(response)
}

export let GetVRM = async () => {
    const response = await fetch("/api/model")
    throwFetch(response)

    return await response.blob()
}

export let SetVRM = async (file: File) => {
    const response = await fetch("/api/model/update", { method: "PUT", body: file })
    throwFetch(response)
}

export const GetReceiver = async () => {
    const response = await fetch("/api/receiver")
    throwFetch(response)
    
    return await response.json() as receiverInfo
}

export const SetReceiver = async (receiverName: string) => {
    const response = await fetch("/api/receiver/update", { method: "PUT", body: receiverName })
    throwFetch(response)
}
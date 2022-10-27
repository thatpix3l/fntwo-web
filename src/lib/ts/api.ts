import type * as config from "lib/ts/models/config"

export type receiver = {
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

export const GetScene = async () => {
    const response = await fetch("/api/config/scene")
    throwFetch(response)
    
    return await response.json() as config.Scene
}

export const SetScene = async () => {
    const response = await fetch("/api/config/scene", {method: "PUT"})
    throwFetch(response)
}

export const GetVRM = async () => {
    const response = await fetch("/api/model")
    throwFetch(response)

    return await response.blob()
}

export const SetVRM = async (file: File) => {
    const response = await fetch("/api/model", { method: "PUT", body: file })
    throwFetch(response)
}

export const GetReceiver = async () => {
    const response = await fetch("/api/receivers")
    throwFetch(response)
    
    return await response.json() as receiver
}

export const SetReceiver = async (receiverName: string) => {
    const response = await fetch(
        "/api/receivers",
        {
            method: "PATCH",
            body: JSON.stringify({active: receiverName} as receiver)
        })
    throwFetch(response)
}
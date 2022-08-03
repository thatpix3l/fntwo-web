import type { Camera } from "lib/ts/models/object"

export type Status = {

}

export type AppConfig = {
    [key: string]: any
    vmc_listen: string
    fm3d_listen: string
    fm3d_device: string
    api_listen: string
    model_update_frequency: number
    scene_home: string
    scene_file: string
    config_file: string
    vrm_file: string
}

export type SceneConfig = {
    camera: Camera
}
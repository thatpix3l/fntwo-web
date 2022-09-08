import type { Camera } from "lib/ts/models/object"

export type App = {
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
    receiver: string
}

export class Scene {

    camera: Camera = {
        gaze_from: {
            x: 3,
            y: 3,
            z: 3
        },
        gaze_towards: {
            x: 0,
            y: 0,
            z: 0
        }
    }
    grid: boolean = false

}

export class Client {
    show_grid: boolean = false
}
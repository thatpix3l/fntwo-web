export type Position = {
    X: number
    Y: number
    Z: number
}

export type QuaternionRotation = {
    x: number
    y: number
    z: number
    w: number
}

export type Rotation = {
    quaternion: QuaternionRotation
}

export type Camera = {
    gaze_from: Position
    gaze_towards: Position
}

export type BlendShapes = {
    [key: string]: number
}

export type Bone = {
    position: Position
    rotation: Rotation 
}

export type Bones = {
    [key: string]: Bone
}

export type VRM = {
    bones: Bones
    blend_shapes: BlendShapes
}
type position = {
    x: number,
    y: number,
    z: number
}

type quaternionRotation = {
    x: number,
    y: number,
    z: number,
    w: number
}

type bone = {
    position: position,
    rotation: quaternionRotation
}

type humanoidBones = {
    [key: string]: bone,
}

type blendShapes = {
    [key: string]: number
}

export type vrm = {
    bones: humanoidBones,
    blend_shapes: blendShapes
}

export type camera = {
    gaze_from: position,
    gaze_towards: position
}

// Scratch that, TypeScript's pretty cool :D
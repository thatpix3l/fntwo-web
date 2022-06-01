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

type humanBodyBones = {
    [BoneName: string]: bone,
    Hips: bone,
    LeftUpperLeg: bone,
    RightUpperLeg: bone,
    LeftLowerLeg: bone,
    RightLowerLeg: bone,
    LeftFoot: bone,
    RightFoot: bone,
    Spine: bone,
    Chest: bone,
    UpperChest: bone,
    Neck: bone,
    Head: bone,
    LeftShoulder: bone,
    RightShoulder: bone,
    LeftUpperArm: bone,
    RightUpperArm: bone,
    LeftLowerArm: bone,
    RightLowerArm: bone,
    LeftHand: bone,
    RightHand: bone,
    LeftToes: bone,
    RightToes: bone,
    LeftEye: bone,
    RightEye: bone,
    Jaw: bone,
    LeftThumbProximal: bone,
    LeftThumbIntermediate: bone,
    LeftThumbDistal: bone,
    LeftIndexProximal: bone,
    LeftIndexIntermediate: bone,
    LeftIndexDistal: bone,
    LeftMiddleProximal: bone,
    LeftMiddleIntermediate: bone,
    LeftMiddleDistal: bone,
    LeftRingProximal: bone,
    LeftRingIntermediate: bone,
    LeftRingDistal: bone,
    LeftLittleProximal: bone,
    LeftLittleIntermediate: bone,
    LeftLittleDistal: bone,
    RightThumbProximal: bone,
    RightThumbIntermediate: bone,
    RightThumbDistal: bone,
    RightIndexProximal: bone,
    RightIndexIntermediate: bone,
    RightIndexDistal: bone,
    RightMiddleProximal: bone,
    RightMiddleIntermediate: bone,
    RightMiddleDistal: bone,
    RightRingProximal: bone,
    RightRingIntermediate: bone,
    RightRingDistal: bone,
    RightLittleProximal: bone,
    RightLittleIntermediate: bone,
    RightLittleDistal: bone,
    LastBone: bone
}

type faceBlendShapes = {
    [BlendShapeName: string]: number,
    EyeBlinkLeft: number,
    EyeLookDownLeft: number,
    EyeLookInLeft: number,
    EyeLookOutLeft: number,
    EyeLookUpLeft: number,
    EyeSquintLeft: number,
    EyeWideLeft: number,
    EyeBlinkRight: number,
    EyeLookDownRight: number,
    EyeLookInRight: number,
    EyeLookOutRight: number,
    EyeLookUpRight: number,
    EyeSquintRight: number,
    EyeWideRight: number,
    JawForward: number,
    JawLeft: number,
    JawRight: number,
    JawOpen: number,
    MouthClose: number,
    MouthFunnel: number,
    MouthPucker: number,
    MouthLeft: number,
    MouthRight: number,
    MouthSmileLeft: number,
    MouthSmileRight: number,
    MouthFrownLeft: number,
    MouthFrownRight: number,
    MouthDimpleLeft: number,
    MouthDimpleRight: number,
    MouthStretchLeft: number,
    MouthStretchRight: number,
    MouthRollLower: number,
    MouthRollUpper: number,
    MouthShrugLower: number,
    MouthShrugUpper: number,
    MouthPressLeft: number,
    MouthPressRight: number,
    MouthLowerDownLeft: number,
    MouthLowerDownRight: number,
    MouthUpperUpLeft: number,
    MouthUpperUpRight: number,
    BrowDownLeft: number,
    BrowDownRight: number,
    BrowInnerUp: number,
    BrowOuterUpLeft: number,
    BrowOuterUpRight: number,
    CheekPuff: number,
    CheekSquintLeft: number,
    CheekSquintRight: number,
    NoseSneerLeft: number,
    NoseSneerRight: number,
    TongueOut: number
}

type blendShapes = {
    dynamic: any
    face: faceBlendShapes
}

export type vrm = {
    bones: humanBodyBones,
    blend_shapes: blendShapes
}

export type camera = {
    gaze_from: position,
    gaze_towards: position
}

// Scratch that, TypeScript's pretty cool :D
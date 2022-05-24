type objPosition = {
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

type boneRotation = {
    quaternion: quaternionRotation,
}

type payloadSingleBone = {
    position: objPosition,
    rotation: boneRotation
}

type payloadBones = {
    [BoneName: string]: payloadSingleBone,
    Hips: payloadSingleBone,
    LeftUpperLeg: payloadSingleBone,
    RightUpperLeg: payloadSingleBone,
    LeftLowerLeg: payloadSingleBone,
    RightLowerLeg: payloadSingleBone,
    LeftFoot: payloadSingleBone,
    RightFoot: payloadSingleBone,
    Spine: payloadSingleBone,
    Chest: payloadSingleBone,
    UpperChest: payloadSingleBone,
    Neck: payloadSingleBone,
    Head: payloadSingleBone,
    LeftShoulder: payloadSingleBone,
    RightShoulder: payloadSingleBone,
    LeftUpperArm: payloadSingleBone,
    RightUpperArm: payloadSingleBone,
    LeftLowerArm: payloadSingleBone,
    RightLowerArm: payloadSingleBone,
    LeftHand: payloadSingleBone,
    RightHand: payloadSingleBone,
    LeftToes: payloadSingleBone,
    RightToes: payloadSingleBone,
    LeftEye: payloadSingleBone,
    RightEye: payloadSingleBone,
    Jaw: payloadSingleBone,
    LeftThumbProximal: payloadSingleBone,
    LeftThumbIntermediate: payloadSingleBone,
    LeftThumbDistal: payloadSingleBone,
    LeftIndexProximal: payloadSingleBone,
    LeftIndexIntermediate: payloadSingleBone,
    LeftIndexDistal: payloadSingleBone,
    LeftMiddleProximal: payloadSingleBone,
    LeftMiddleIntermediate: payloadSingleBone,
    LeftMiddleDistal: payloadSingleBone,
    LeftRingProximal: payloadSingleBone,
    LeftRingIntermediate: payloadSingleBone,
    LeftRingDistal: payloadSingleBone,
    LeftLittleProximal: payloadSingleBone,
    LeftLittleIntermediate: payloadSingleBone,
    LeftLittleDistal: payloadSingleBone,
    RightThumbProximal: payloadSingleBone,
    RightThumbIntermediate: payloadSingleBone,
    RightThumbDistal: payloadSingleBone,
    RightIndexProximal: payloadSingleBone,
    RightIndexIntermediate: payloadSingleBone,
    RightIndexDistal: payloadSingleBone,
    RightMiddleProximal: payloadSingleBone,
    RightMiddleIntermediate: payloadSingleBone,
    RightMiddleDistal: payloadSingleBone,
    RightRingProximal: payloadSingleBone,
    RightRingIntermediate: payloadSingleBone,
    RightRingDistal: payloadSingleBone,
    RightLittleProximal: payloadSingleBone,
    RightLittleIntermediate: payloadSingleBone,
    RightLittleDistal: payloadSingleBone,
    LastBone: payloadSingleBone
}

type payloadBlendShapes = {
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

type vrmBlendShapes = {
    dynamic: any
    face: payloadBlendShapes
}

export type vrmPayload = {
    bones: payloadBones,
    blend_shapes: vrmBlendShapes
}

export type cameraPayload = {
    position: objPosition,
    target: objPosition
}

// At first, I thought TypeScript was cool. Now, I am beyond frustrated with the verbosity of assignments,
// the multitudes of different ways to do the exact same thing, and the interface-type-class crap that
// seem like they do the exact same things; but they don't. I am beyond tired, and hope whomever decides
// to work on this spaghetti code is comfortable with TypeScript, because I sure as hell am not.
type bone = {
    position_x: number,
    position_y: number,
    position_z: number,

    quaternion_x: number,
    quaternion_y: number,
    quaternion_z: number,
    quaternion_w: number,
}

export type VRMBones = {
    TongueOut: bone
    Hips: bone
    LeftUpperLeg: bone
    RightUpperLeg: bone
    LeftLowerLeg: bone
    RightLowerLeg: bone
    LeftFoot: bone
    RightFoot: bone
    Spine: bone
    Chest: bone
    UpperChest: bone
    Neck: bone
    Head: bone
    LeftShoulder: bone
    RightShoulder: bone
    LeftUpperArm: bone
    RightUpperArm: bone
    LeftLowerArm: bone
    RightLowerArm: bone
    LeftHand: bone
    RightHand: bone
    LeftToes: bone
    RightToes: bone
    LeftEye: bone
    RightEye: bone
    Jaw: bone
    LeftThumbProximal: bone
    LeftThumbIntermediate: bone
    LeftThumbDistal: bone
    LeftIndexProximal: bone
    LeftIndexIntermediate: bone
    LeftIndexDistal: bone
    LeftMiddleProximal: bone
    LeftMiddleIntermediate: bone
    LeftMiddleDistal: bone
    LeftRingProximal: bone
    LeftRingIntermediate: bone
    LeftRingDistal: bone
    LeftLittleProximal: bone
    LeftLittleIntermediate: bone
    LeftLittleDistal: bone
    RightThumbProximal: bone
    RightThumbIntermediate: bone
    RightThumbDistal: bone
    RightIndexProximal: bone
    RightIndexIntermediate: bone
    RightIndexDistal: bone
    RightMiddleProximal: bone
    RightMiddleIntermediate: bone
    RightMiddleDistal: bone
    RightRingProximal: bone
    RightRingIntermediate: bone
    RightRingDistal: bone
    RightLittleProximal: bone
    RightLittleIntermediate: bone
    RightLittleDistal: bone
    LastBone: bone
}

export type VRMPayload = {
    payload_type: string,
    name: string,
    bones: VRMBones,
    blend_shapes: number
}
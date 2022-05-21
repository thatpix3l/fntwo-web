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
    tongue_out: payloadSingleBone,
    hips: payloadSingleBone,
    left_upper_leg: payloadSingleBone,
    right_upper_leg: payloadSingleBone,
    left_lower_leg: payloadSingleBone,
    right_lower_leg: payloadSingleBone,
    left_foot: payloadSingleBone,
    right_foot: payloadSingleBone,
    spine: payloadSingleBone,
    chest: payloadSingleBone,
    upper_chest: payloadSingleBone,
    neck: payloadSingleBone,
    head: payloadSingleBone,
    left_shoulder: payloadSingleBone,
    right_shoulder: payloadSingleBone,
    left_upper_arm: payloadSingleBone,
    right_upper_arm: payloadSingleBone,
    left_lower_arm: payloadSingleBone,
    right_lower_arm: payloadSingleBone,
    left_hand: payloadSingleBone,
    right_hand: payloadSingleBone,
    left_toes: payloadSingleBone,
    right_toes: payloadSingleBone,
    left_eye: payloadSingleBone,
    right_eye: payloadSingleBone,
    jaw: payloadSingleBone,
    left_thumb_proximal: payloadSingleBone,
    left_thumb_intermediate: payloadSingleBone,
    left_thumb_distal: payloadSingleBone,
    left_index_proximal: payloadSingleBone,
    left_index_intermediate: payloadSingleBone,
    left_index_distal: payloadSingleBone,
    left_middle_proximal: payloadSingleBone,
    left_middle_intermediate: payloadSingleBone,
    left_middle_distal: payloadSingleBone,
    left_ring_proximal: payloadSingleBone,
    left_ring_intermediate: payloadSingleBone,
    left_ring_distal: payloadSingleBone,
    left_little_proximal: payloadSingleBone,
    left_little_intermediate: payloadSingleBone,
    left_little_distal: payloadSingleBone,
    right_thumb_proximal: payloadSingleBone,
    right_thumb_intermediate: payloadSingleBone,
    right_thumb_distal: payloadSingleBone,
    right_index_proximal: payloadSingleBone,
    right_index_intermediate: payloadSingleBone,
    right_index_distal: payloadSingleBone,
    right_middle_proximal: payloadSingleBone,
    right_middle_intermediate: payloadSingleBone,
    right_middle_distal: payloadSingleBone,
    right_ring_proximal: payloadSingleBone,
    right_ring_intermediate: payloadSingleBone,
    right_ring_distal: payloadSingleBone,
    right_little_proximal: payloadSingleBone,
    right_little_intermediate: payloadSingleBone,
    right_little_distal: payloadSingleBone,
    last_bone: payloadSingleBone
}

type payloadBlendShapes = {
    eye_blink_left: number,
    eye_look_down_left: number,
    eye_look_in_left: number,
    eye_look_out_left: number,
    eye_look_up_left: number,
    eye_squint_left: number,
    eye_wide_left: number,
    eye_blink_right: number,
    eye_look_down_right: number,
    eye_look_in_right: number,
    eye_look_out_right: number,
    eye_look_up_right: number,
    eye_squint_right: number,
    eye_wide_right: number,
    jaw_forward: number,
    jaw_left: number,
    jaw_right: number,
    jaw_open: number,
    mouth_close: number,
    mouth_funnel: number,
    mouth_pucker: number,
    mouth_left: number,
    mouth_right: number,
    mouth_smile_left: number,
    mouth_smile_right: number,
    mouth_frown_left: number,
    mouth_frown_right: number,
    mouth_dimple_left: number,
    mouth_dimple_right: number,
    mouth_stretch_left: number,
    mouth_stretch_right: number,
    mouth_roll_lower: number,
    mouth_roll_upper: number,
    mouth_shrug_lower: number,
    mouth_shrug_upper: number,
    mouth_press_left: number,
    mouth_press_right: number,
    mouth_lower_down_left: number,
    mouth_lower_down_right: number,
    mouth_upper_up_left: number,
    mouth_upper_up_right: number,
    brow_down_left: number,
    brow_down_right: number,
    brow_inner_up: number,
    brow_outer_up_left: number,
    brow_outer_up_right: number,
    cheek_puff: number,
    cheek_squint_left: number,
    cheek_squint_right: number,
    nose_sneer_left: number,
    nose_sneer_right: number,
    tongue_out: number
}

export type vrmPayload = {
    bones: payloadBones,
    blend_shapes: payloadBlendShapes
}

export type cameraMetaContainer = {
    ws: WebSocket
}

type cameraPayload = {
    position: objPosition,
    target: objPosition
}

// At first, I thought TypeScript was cool. Now, I am beyond frustrated with the verbosity of assignments,
// the multitudes of different ways to do the exact same thing, and the interface-type-class crap that
// seem like they do the exact same things; but they don't. I am beyond tired, and hope whomever decides
// to work on this spaghetti code is comfortable with TypeScript, because I sure as hell am not.
'use client';

import React, { useEffect, useMemo, useRef } from "react";
import { useGraph, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations, useTexture } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import * as THREE from "three";

type Props = {
  clip?: string;
  reverse?: boolean;
  speed?: number;
  onFinished?: () => void;
  trackEnabled?: boolean;
} & React.ComponentPropsWithoutRef<"group">;

export function Model({ clip = "_bee_hover", reverse = false, speed = 1.35, onFinished, trackEnabled = true, ...props }: Props) {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF("/models/bee-transformed.glb") as unknown as {
    scene: THREE.Group;
    animations: THREE.AnimationClip[];
  };
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone) as unknown as { nodes: Record<string, THREE.Object3D & { geometry: THREE.BufferGeometry; skeleton: THREE.Skeleton }> };
  const { actions, mixer } = useAnimations(animations, group);

  useEffect(() => {
    if (!actions) return;
    Object.values(actions).forEach((a) => a?.stop());
    const action = actions[clip];
    if (!action) return;
    action.reset();
    if (clip === "_bee_take_off_and_land") {
      (action.setLoop as unknown as (a: number, b: number) => void)(2200, 1);
      // eslint-disable-next-line react-hooks/immutability
      action.clampWhenFinished = true;
      if (reverse) {
        const dur = action.getClip().duration;
        action.time = dur;
        action.timeScale = -1;
      }
      action.play();
      if (mixer && onFinished) {
        const handler = (e: { action: unknown }) => {
          if (e.action === action) onFinished();
        };
        mixer.addEventListener("finished", handler as never);
        return () => mixer.removeEventListener("finished", handler as never);
      }
      return;
    }
    action.timeScale = speed;
    action.play();
  }, [actions, mixer, clip, reverse, onFinished, speed]);

  const diffuseMap = useTexture("/models/textures/bee-diffuse.png");
  const headBoneRef = useRef<THREE.Object3D | null>(null);
  const bodyBoneRef = useRef<THREE.Object3D | null>(null);
  const ptr = useRef({ x: 0, y: 0 });
  const prevPtr = useRef({ x: 0, y: 0 });
  const vel = useRef(0);
  useEffect(() => {
    headBoneRef.current = clone.getObjectByName("head_Jnt") as THREE.Object3D | null;
    const h = headBoneRef.current;
    bodyBoneRef.current =
      (h?.parent as THREE.Object3D | null) ??
      (clone.getObjectByName("thorax_Jnt") as THREE.Object3D | null) ??
      (clone.getObjectByName("spine_Jnt") as THREE.Object3D | null) ??
      (clone.getObjectByName("body_Jnt") as THREE.Object3D | null) ??
      group.current;
  }, [clone]);
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      ptr.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      ptr.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  const hYaw = useRef(0);
  const hPitch = useRef(0);
  const bYaw = useRef(0);
  const bPitch = useRef(0);
  const bRoll = useRef(0);

  // ponytail: lerp 0.09 head 0.05 body; upgrade to damp/spring+quaternion when need inertia overshoot >0.7rad
  useFrame((state) => {
    const h = headBoneRef.current;
    const b = bodyBoneRef.current;
    const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const active = trackEnabled && !reduced;
    let px: number, py: number;
    if (active) {
      const sx = state.pointer.x !== 0 || state.pointer.y !== 0 ? state.pointer.x : ptr.current.x;
      const sy = state.pointer.x !== 0 || state.pointer.y !== 0 ? state.pointer.y : ptr.current.y;
      px = THREE.MathUtils.clamp(sx || ptr.current.x, -1, 1);
      py = THREE.MathUtils.clamp(sy || ptr.current.y, -1, 1);
    } else {
      px = 0;
      py = 0;
    }
    const dx = ptr.current.x - prevPtr.current.x;
    vel.current = THREE.MathUtils.lerp(vel.current, THREE.MathUtils.clamp(dx * 8, -0.18, 0.18), 0.12);
    prevPtr.current.x = ptr.current.x;
    const txH = px * 0.55;
    const tyH = py * 0.30;
    const txB = px * 0.22 + vel.current * 0.5;
    const tyB = py * 0.14;
    const tzB = px * 0.10 + vel.current;
    hYaw.current = THREE.MathUtils.lerp(hYaw.current, txH, active ? 0.09 : 0.12);
    hPitch.current = THREE.MathUtils.lerp(hPitch.current, tyH, active ? 0.09 : 0.12);
    bYaw.current = THREE.MathUtils.lerp(bYaw.current, txB, active ? 0.05 : 0.12);
    bPitch.current = THREE.MathUtils.lerp(bPitch.current, tyB, active ? 0.05 : 0.12);
    bRoll.current = THREE.MathUtils.lerp(bRoll.current, tzB, active ? 0.05 : 0.12);
    if (h) {
      h.rotation.y = hYaw.current;
      h.rotation.x = hPitch.current;
    }
    if (b && b !== h) {
      b.rotation.y = bYaw.current;
      b.rotation.x = bPitch.current;
      b.rotation.z = bRoll.current;
    } else if (group.current && !b) {
      group.current.rotation.y = bYaw.current;
      group.current.rotation.x = bPitch.current;
    }
    if (group.current && active) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 4.2) * 0.008;
      group.current.scale.setScalar(s);
    } else if (group.current) {
      group.current.scale.setScalar(1);
    }
  });
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <primitive object={nodes.GLTF_created_0_rootJoint} />
        <skinnedMesh name="Object_116" geometry={nodes.Object_116.geometry} skeleton={nodes.Object_116.skeleton}>
          <meshStandardMaterial map={diffuseMap} roughness={0.7} />
        </skinnedMesh>
      </group>
    </group>
  );
}

useGLTF.preload("/models/bee-transformed.glb");

export type Vec3 = [number, number, number];
export type CamWp = { p: number; pos: Vec3; target: Vec3 };
export type PosWp = { p: number; pos: Vec3 };
export type RotWp = { p: number; x: number; y: number; z: number };

export const CAM_WPS: CamWp[] = [
  { p: 0, pos: [0, 1.6, 78], target: [0, 1.6, 0] },
  { p: 0.143, pos: [3, 2.2, 68], target: [9, 1.2, 0] },
  { p: 0.45, pos: [5, 3.0, 62], target: [12, 1.8, 0] },
  { p: 1, pos: [7, 3.4, 58], target: [14, 2.0, 0] },
];

export const POS_WPS: PosWp[] = [
  { p: 0, pos: [0, 0, 0] },
  { p: 0.05, pos: [7, -1.8, 7] },
  { p: 0.1, pos: [15, 0.0, 3] },
  { p: 0.143, pos: [26, 3, 0] },
  { p: 1, pos: [26, 3, 0] },
];

export const ROT_WPS: RotWp[] = [
  { p: 0, x: -0.05, y: 0, z: 0 },
  { p: 0.05, x: 0.42, y: 0.85, z: -0.4 },
  { p: 0.1, x: 0.2, y: 0.2, z: -0.15 },
  { p: 0.143, x: 0, y: -Math.PI / 4, z: 0 },
  { p: 1, x: 0, y: -Math.PI / 4, z: 0 },
];

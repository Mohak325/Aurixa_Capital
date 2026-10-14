// src/lib/utils.ts
import { clsx, type ClassValue } from "clsx";

/** Merge class names with clsx */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/** Format a number with + suffix */
export function formatStat(n: number, suffix = "+") {
  return `${n}${suffix}`;
}

/** Clamp a value between min and max */
export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/** Map a value from one range to another */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
) {
  return ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
}

/** Lerp — linear interpolation */
export function lerp(start: number, end: number, t: number) {
  return start + (end - start) * t;
}

/** Check if we're in a browser environment */
export const isBrowser = typeof window !== "undefined";

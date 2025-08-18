import { requireNativeModule } from "expo-modules-core";

const TrueTimeModule = requireNativeModule("ExpoTrueTime");

export async function getNtpTime(): Promise<string> {
  return await TrueTimeModule.getNtpTime();
}

export async function getNtpTimeMs(): Promise<number | null> {
  return await TrueTimeModule.getNtpTimeMs();
}

export function getEstimatedTimeUtc() {
  return TrueTimeModule.getEstimatedTimeUtc();
}

export function setBaseUtcTime(ms: number): void {
  TrueTimeModule.setBaseUtcTime(ms);
}

export function getUpTime(): number {
  return TrueTimeModule.getUpTime();
}

export function setBaseStartTime(): number {
  return TrueTimeModule.setBaseStartTime();
}

export function getElapsedTimeSinceStart(): number {
  return TrueTimeModule.getElapsedTimeSinceStart();
}

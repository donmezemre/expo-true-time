import { requireNativeModule } from "expo-modules-core";

const TrueTimeModule = requireNativeModule("ExpoTrueTime");

export async function getNtpTime(): Promise<string> {
  return await TrueTimeModule.getNtpTime();
}

export async function getNtpTimeMs(): Promise<number | null> {
  return await TrueTimeModule.getNtpTimeMs();
}

export async function getEstimatedTimeUtc(): Promise<string> {
  return await TrueTimeModule.getEstimatedTimeUtc();
}

export async function setBaseUtcTime(ms: number): Promise<void> {
  await TrueTimeModule.setBaseUtcTime(ms);
}

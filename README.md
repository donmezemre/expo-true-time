# 📦 expo-true-time — Reliable Time Synchronization for React Native (Expo)

**expo-true-time** is a library designed for reliable date-time management in React Native (Expo) projects,  
capable of retrieving the real time from an **NTP server** and maintaining estimated UTC time **without network connectivity**.

It works on Android using **SystemClock.elapsedRealtime** and is only compatible with **Android devices**.

---

## 🚀 Features

- ✅ Retrieves accurate UTC time from **Google NTP servers** (`getNtpTime`, `getNtpTimeMS`)
- ✅ After one-time NTP synchronization, estimates time **without internet**
- ✅ Returns UTC time in ISO format (`getNtpTime`, `getEstimatedTimeUtc`)
- ✅ Provides UTC time as timestamp (`getNtpTimeMS`)
- ✅ Retrieves **device uptime since boot** (`getUpTime`)
- ✅ Compatible with **Expo & bare React Native**

---

## 📥 Installation

```bash
# Using npm
npm install expo-true-time

# Or using yarn
yarn add expo-true-time
```

---

## 📄 Usage

### 1️⃣ Get UTC Time from NTP (ISO String)

```ts
import { getNtpTime } from "expo-true-time";

const utcString = await getNtpTime();
console.log(utcString);
// "2025-08-04T10:35:10.583Z"
```

---

### 2️⃣ Get UTC Timestamp (ms) and Use setBaseUtcTime

```ts
import { getNtpTimeMS, setBaseUtcTime } from "expo-true-time";

const ntpTimestamp = await getNtpTimeMS(); // timestamp (ms)
await setBaseUtcTime(ntpTimestamp); // set as base UTC time
```

> ⚠️ Important: `setBaseUtcTime` should be provided a **timestamp (ms)**, not an ISO string.

---

### 3️⃣ Get Estimated UTC Time

```ts
import { getEstimatedTimeUtc } from "expo-true-time";

const estimatedUtc = await getEstimatedTimeUtc();
console.log(estimatedUtc);
// "2025-08-04T10:35:10.583Z"
```

---

### 4️⃣ Get Device Uptime

```ts
import { getUpTime } from "expo-true-time";

const upTimeMs = await getUpTime();
console.log(upTimeMs);
// E.g., 3600000 (1 hour in milliseconds)
```

> ⚡ Includes time while the device was awake and asleep.  
> ⚡ Not affected by system clock changes.  
> ⚡ Returns a **Long (ms)** value.

---

## ⚙️ API Reference

| Method                       | Description                                                   | Parameter    | Return Type                         |
| ---------------------------- | ------------------------------------------------------------- | ------------ | ----------------------------------- | ----- |
| `getNtpTime()`               | Retrieves UTC time from Google NTP servers (ISO string)       | None         | `string` "YYYY-MM-DDTHH:mm:ss.sssZ" |
| `getNtpTimeMS()`             | Retrieves UTC time as timestamp (ms) from Google NTP servers  | None         | `number` (ms)                       |
| `setBaseUtcTime(ms: number)` | Sets a base UTC timestamp for calculating estimated UTC time  | `ms: number` | `void`                              |
| `getEstimatedTimeUtc()`      | Returns the estimated UTC time in ISO format                  | None         | `string                             | null` |
| `getUpTime()`                | Returns the device uptime since boot (includes awake + sleep) | None         | `number` (ms)                       |

---

## 📌 Notes

- ⚠️ **Android devices only.**
- **Internet is required initially** for NTP synchronization.
  - Alternatively, you can provide a trusted source's **UTC timestamp (ms)** to `setBaseUtcTime`.
  - Afterwards, `getEstimatedTimeUtc()` can provide estimated UTC time without network.
- After `getNtpTimeMS()` is stored via `setBaseUtcTime`, estimated time works **offline**.
- The library does not handle timezone conversions; it only returns **UTC time**.

---

## 📜 License

MIT © 2025 — Emre Dönmez & Contributors

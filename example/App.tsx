import {
  getNtpTime,
  getEstimatedTimeUtc,
  setBaseUtcTime,
  getNtpTimeMs,
} from "expo-true-time";
import { useEffect } from "react";
import { Button, View } from "react-native";

export default function App() {
  useEffect(() => {
    (async () => {
      const time = await getNtpTime();
      console.log("NTP time:", time);
    })();
  }, []);

  const onPress = async () => {
    const date = await getNtpTime();
    console.log("NTP time:", date);
  };

  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <Button title="Get NTP Time" onPress={onPress} />
      <Button
        title="Get Estimated Time Utc"
        onPress={async () => {
          const estimatedTimeUtc = await getEstimatedTimeUtc();
          console.log({
            estimatedTimeUtc,
          });
        }}
      />
      <Button
        title="setBaseUtcTime"
        onPress={async () => {
          const ms = await getNtpTimeMs();
          if (ms) setBaseUtcTime(ms);
        }}
      />
    </View>
  );
}

import {
  getNtpTime,
  getEstimatedTimeUtc,
  setBaseUtcTime,
  getNtpTimeMs,
  getUpTime,
} from "expo-true-time";
import { useEffect, useState } from "react";
import { Button, View } from "react-native";

export default function App() {
  const [last, setLast] = useState<number>(0);
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
        title="setBaseUtcTime"
        onPress={async () => {
          const ms = await getNtpTimeMs();
          if (ms) setBaseUtcTime(ms);
        }}
      />
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
        title="getUpTime"
        onPress={() => {
          const upTime = getUpTime();
          console.log({ upTime, lastButtonPressDiff: upTime - last });
          setLast(upTime);
        }}
      />
    </View>
  );
}

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import LottieView from "lottie-react-native";
import { Platform } from "react-native";

export default function Splash() {
  if (Platform.OS === "web") {
    return <DotLottieReact src="https://lottie.host/baee954c-086e-4b6b-9418-828b51ba8672/oixSzvoGIV.lottie" autoplay loop speed={1.5} />;
  }

  return (
    <LottieView
      source={require("../assets/animations/loading.json")}
      speed={1.5}
      autoPlay
      loop
    />
  );
}

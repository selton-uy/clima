import { useState } from "react";
import "./App.css";
import Card from "./components/Card";

function App() {
  const [weatherCondition, setWeatherCondition] = useState(null);

  const getVideoSrc = () => {
    if (!weatherCondition) return "./sol.mp4";

    const condition = weatherCondition.toLowerCase();
    if (condition.includes("rain")) return "./chuva.mp4";
    if (condition.includes("cloud")) return "./nublado.mp4";
    if (condition.includes("clear")) return "./sol.mp4";
    if (condition.includes("snow")) return "./neve.mp4";
    return "./sol.mp4";
  };

  return (
    <div className="bg-video flex flex-col items-center justify-center h-screen">
      <video src={getVideoSrc()} autoPlay loop muted></video>
      <Card onWeatherChange={setWeatherCondition} />
    </div>
  );
}

export default App;

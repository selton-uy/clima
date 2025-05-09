import { useState } from "react";

const Card = ({ onWeatherChange }) => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiWeatherData = async () => {
    if (!city) {
      setError("Por favor, digite uma cidade.");
      return;
    }

    setLoading(true);
    setError(null);

    const apiKey = "2ce76392aff5b94a5201533d1489bb0e";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          "Cidade não encontrada. Verifique o nome e tente novamente."
        );
      }
      const data = await response.json();
      setWeatherData(data);
      if (onWeatherChange && typeof onWeatherChange === "function") {
        onWeatherChange(data.weather[0].main);
      }
    } catch (error) {
      setError(error.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-linear-to-b from-[#00000080] to-[#00000080] p-4 rounded-lg shadow-lg w-[75dvw] h-[55dvh] transition-all duration-200 lg:w-[40dvw] lg:max-w-[400px]">
      <h1 className="text-2xl text-center py-[1em]">Previsão do Tempo</h1>

      <div className="flex gap-2 py-5 justify-center">
        <input
          className="border-[#F2F2F2] border-1 rounded-3xl text-center w-full"
          type="text"
          placeholder="Digite sua cidade"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          className="bg-[#00000030] rounded-3xl p-2"
          onClick={apiWeatherData}
          disabled={loading}
        >
          {loading ? "Buscando..." : "Selecionar"}
        </button>
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {weatherData && (
        <div className="flex flex-col gap-3 text-left py-5">
          <p>Cidade: {weatherData.name}</p>
          <p>Situação: {weatherData.weather[0].description}</p>
          <p>Temperatura: {Math.round(weatherData.main.temp)}°C</p>
          <p>Sensação Térmica: {Math.round(weatherData.main.feels_like)}°C</p>
          <p>Umidade: {weatherData.main.humidity}%</p>
        </div>
      )}

      <p className="text-center p-5">Atualizado em tempo real</p>
    </div>
  );
};

export default Card;

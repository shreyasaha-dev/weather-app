import { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import "./App.css";
const App = () => {
  const [inputValues, setInputValues] = useState("");
  const [getData, setGetData] = useState();
  const weatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${inputValues}&appid=7939b0ffad62f304882ae289288ee36e&units=metric`
      );
      console.log(response.data);
      setGetData(response.data);
    } catch (error) {
      alert(error?.response?.data?.message);
    }
  };

  return (
    <div className="total-section">
      <div className="weather-middle-section">
        <div className="search-section">
          <input
            placeholder="Search with city name"
            onChange={(e) => {
              setInputValues(e.target.value);
            }}
            value={inputValues}
          />
          <button onClick={weatherData}>Search</button>
        </div>
        {getData && (
          <>
            <div className="city-and-date">
              <h1>
                {getData?.name}, {getData?.sys?.country}
              </h1>
              <p>{moment().format("dddd, MMMM Do YYYY")}</p>
            </div>
            <h1 className="temp">{Math.round(getData?.main?.temp)}°c</h1>
            <div className="weather-type">
              <h3>{getData?.weather[0]?.main}</h3>
              <p>
                {Math.round(getData?.main?.temp_min)}°c /{" "}
                {Math.round(getData?.main?.temp_max)}°c
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default App;
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={fc8a0d4e104f1a8191ae505838c7d955}

import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [getCountry, setGetCountry] = useState([]);
  const [getState, setGetState] = useState([]);
  const [getCity, setGetCity] = useState([]);
  useEffect(() => {
    fetch(
      "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json"
    )
      .then((response) => response.json())
      .then((data) => setGetCountry(data));
  }, []);
  const country = [...new Set(getCountry.map((item) => item.country))];
  country.sort();

  var state = [],
    states = [];
  const handleCountry = (e) => {
    states = getCountry.filter((val) => val.country === e.target.value);

    state = [...new Set(states.map((value) => value.subcountry))];
    state.sort();
    setGetState(state);
  };

  const handleState = (e) => {
    let cities = getCountry.filter(
      (value) => value.subcountry === e.target.value
    );
    let city = [...new Set(cities.map((value) => value.name))];
    city.sort();
    setGetCity(city);
  };

  return (
    <div className="App">
      <div>
        <p>Enter country</p>
        <select onChange={(e) => handleCountry(e)}>
          <option>Select Country</option>
          {country.map((value, index) => (
            <option key={index}>{value}</option>
          ))}
        </select>
      </div>
      <div>
        <p>Enter state</p>
        <select onChange={(e) => handleState(e)}>
          <option>Select State</option>
          {getState.map((value2, index2) => (
            <option key={index2}>{value2}</option>
          ))}
        </select>
      </div>
      <div>
        <p>Enter city</p>
        <select>
          <option>Select City</option>
          {getCity.map((value3, index3) => (
            <option key={index3}>{value3}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

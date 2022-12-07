import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import axios from "axios";

const center = [51.505, -0.09];
const zoom = 2;
const LeafLet = () => {
  const [countries, setCountries] = useState([]);
  const getCountriesData = async () => {
    try {
      const data = await axios.get(`https://disease.sh/v3/covid-19/countries`);
      setCountries(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCountriesData();
  }, []);

  return (
    <MapContainer
      dragging={false}
      scrollWheelZoom={false}
      center={center}
      zoom={zoom}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {countries.map((country) => (
        <Marker
          key={country.country}
          position={[country.countryInfo.lat, country.countryInfo.long]}
        >
          <Popup>
            <p>
              <strong>{country.country}</strong>
              <br />
              Active Cases: {country.active}
              <br />
              Recovered Cases: {country.recovered}
              <br />
              Deaths: {country.deaths}
            </p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};
export default LeafLet;

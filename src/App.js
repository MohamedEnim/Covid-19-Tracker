import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import InfoBox from "./components/InfoBox";
import Map from "./components/Map";

import Sidebar from "./components/Sidebar";
import http from "./http";
import { prettyPrintStat } from "./utils";

function App() {
  const [countries, setCountries] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [country, setCountry] = useState("WorlWide");
  const [infoBox, setInfoBox] = useState({});
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [casesType, setCasesType] = useState("cases");

  useEffect(() => {
    const getInitialWorldWide = async () => {
      const { data } = await http.get("/v3/covid-19/all");
      setInfoBox(data);
    };
    getInitialWorldWide();
  }, []);

  useEffect(() => {
    const getInfoFromDisease = async () => {
      const { data } = await http.get("v3/covid-19/countries");

      setMapCountries(data);
      setCountries([{ country: "WorlWide" }, ...data]);
    };

    getInfoFromDisease();
  }, []);

  const handleCountry = async ({ target }) => {
    const countryCode = target.value;

    const url =
      countryCode === "WorlWide"
        ? "/v3/covid-19/all"
        : `/v3/covid-19/countries/${countryCode}`;
    const { data } = await http.get(url);

    setCountry(countryCode);
    setInfoBox(data);
    if (countryCode.includes("WorlWide")) {
      setMapCenter({ lat: 34.80746, lng: -40.4796 });
    } else {
      setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
    }
    setMapZoom(4);
  };

  const handelCasestype = (title) => {
    setCasesType(title.toLowerCase());
  };
  return (
    <div className="app">
      <Header
        onHandleCountry={handleCountry}
        country={country}
        countries={countries}
      />

      <div className="app__body">
        <div className="app__right">
          <div className="app_rightInfoBox">
            <InfoBox
              title="Cases"
              today={prettyPrintStat(infoBox.todayCases)}
              total={prettyPrintStat(infoBox.cases)}
              onCasestype={handelCasestype}
              active={casesType === "cases"}
            />
            <InfoBox
              title="Recovered"
              today={prettyPrintStat(infoBox.todayRecovered)}
              total={prettyPrintStat(infoBox.recovered)}
              onCasestype={handelCasestype}
              active={casesType === "recovered"}
            />
            <InfoBox
              title="Deaths"
              today={prettyPrintStat(infoBox.todayDeaths)}
              total={prettyPrintStat(infoBox.deaths)}
              onCasestype={handelCasestype}
              active={casesType === "deaths"}
            />
          </div>

          <Map
            center={mapCenter}
            zoom={mapZoom}
            countries={mapCountries}
            casesType={casesType}
          />
        </div>
        <div className="app__left">
          <Sidebar
            className="app__graph"
            countries={countries}
            casesType={casesType}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

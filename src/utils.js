import React from "react";
import numeral from "numeral";
import { CircleMarker, Popup } from "react-leaflet";

export const casesTypeColors = {
  cases: {
    hex: "#CC1034",
    multiplier: 800,
  },
  recovered: {
    hex: "#7dd71d",
    multiplier: 1200,
  },
  deaths: {
    hex: "#fb4443",
    multiplier: 2000,
  },
};

export const shadowDataOnMap = (data, casesType = "cases") => {
  const redOptions = {
    color: casesTypeColors[casesType].hex,
    fillColor: casesTypeColors[casesType].hex,
    fillOpacity: 0.4,
  };
  return data.map((country) => (
    <CircleMarker
      key={country.country}
      center={[country.countryInfo.lat, country.countryInfo.long]}
      pathOptions={redOptions}
      radius={
        Math.sqrt(country[casesType] / 8000000000) *
        casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div>
          <div className="info-name">{country.country}</div>
          <div className="info-confirmed">
            Cases: {numeral(country.cases).format("0,0")}
          </div>
          <div className="info-recovered">
            Recovered: {numeral(country.recovered).format("0,0")}
          </div>
          <div className="info-deaths">
            Deaths: {numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </CircleMarker>
  ));
};

export const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";

export const buildChartData = (data, casesType = "cases") => {
  let dataChart = [];
  let lastDataPoint = null;

  for (let item in data[casesType]) {
    if (lastDataPoint !== null) {
      let dataPoint = {
        x: item,
        y: data[casesType][item] - lastDataPoint,
      };
      dataChart.push(dataPoint);
    }
    lastDataPoint = data[casesType][item];
  }
  return dataChart;
};

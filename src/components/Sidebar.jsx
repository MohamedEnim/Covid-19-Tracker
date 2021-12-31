import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import LineGraph from "./LineGraph";
import numeral from "numeral";

const Sidebar = ({ countries, casesType, ...props }) => {
  const [countriesTable, setcountriesTable] = useState([]);

  useEffect(() => {
    if (countries.length > 0) {
      let countriesSorted = countries.slice(1).sort((a, b) => {
        if (a.cases > b.cases) {
          return -1;
        } else {
          return 1;
        }
      });

      setcountriesTable(countriesSorted);
    } else {
      setcountriesTable([...countries]);
    }
  }, [countries]);
  return (
    <div>
      <Card className="card">
        <CardContent className="sidebar">
          <div className="sidebar__top">
            <h3>Live cases by country</h3>
            <div className="sidebar__table">
              <table>
                <tbody>
                  {countriesTable.map((country, index) => (
                    <tr
                      key={country.country}
                      className={`sidebar__tableRow  
                  ${index % 2 !== 0 && "sidebar__tableRow--option"} `}
                    >
                      <td>{country.country}</td>
                      <td>{numeral(country.cases).format("0,0")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="sidebar__bottom">
            <h3>World new {casesType}</h3>
            <LineGraph className={props.className} casesType={casesType} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Sidebar;

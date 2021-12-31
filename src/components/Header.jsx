import React from "react";
import "./Header.css";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Header = ({ onHandleCountry, country, countries }) => {
  return (
    <div className="header">
      <div className="header__title">
        <span className="header__titleApp">Covid-19 Tracker</span>
      </div>
      <div className="header__select">
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <Select value={country} onChange={onHandleCountry}>
              {countries.map((country) => (
                <MenuItem key={country.country} value={country.country}>
                  {country.country}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </div>
    </div>
  );
};

export default Header;

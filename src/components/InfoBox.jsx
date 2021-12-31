import React from "react";
import "./InfoBox.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { casesTypeColors } from "../utils";

const InfoBox = ({ title, today, total, active, onCasestype }) => {
  const casesType = title.toLowerCase();
  return (
    <Card
      className="infoBox"
      style={{
        borderTop: active && `6px solid ${casesTypeColors[casesType].hex}`,
      }}
      onClick={() => onCasestype(title)}
    >
      <CardContent>
        <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography
          variant="h6"
          component="div"
          style={{
            color: `${casesTypeColors[casesType].hex}`,
            fontWeight: "600",
            fontSize: "1.3rem",
          }}
        >
          {today}
        </Typography>
        <Typography sx={{ mb: 1.5, fontSize: 14 }} color="text.secondary">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
};

export default InfoBox;

import React from 'react';
import { Grid, Typography } from '@mui/material';

const EmployeeDetailsBox = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={6} sm={6} xl={3} sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={{ color: "#5F6D7E", fontSize: "1rem", fontWeight: "400", lineHeight: "24px" }}>Start Date</Typography>
        <Typography sx={{ color: "#272D37", fontSize: "1rem", fontWeight: "600", lineHeight: "24px", marginInline: "1rem" }}>23/08/2023</Typography>
      </Grid>
      <Grid item xs={6} sm={6} xl={3} sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={{ color: "#5F6D7E", fontSize: "1rem", fontWeight: "400", lineHeight: "24px" }}>Position</Typography>
        <Typography sx={{ color: "#272D37", fontSize: "1rem", fontWeight: "600", lineHeight: "24px", marginInline: "1rem" }}>Software Engineer</Typography>
      </Grid>
      <Grid item xs={6} sm={6} xl={3} sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={{ color: "#5F6D7E", fontSize: "1rem", fontWeight: "400", lineHeight: "24px" }}>Contact Number</Typography>
        <Typography sx={{ color: "#272D37", fontSize: "1rem", fontWeight: "600", lineHeight: "24px", marginInline: "1rem" }}>+94 77 1234567</Typography>
      </Grid>
      <Grid item xs={6} sm={6} xl={3} sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={{ color: "#5F6D7E", fontSize: "1rem", fontWeight: "400", lineHeight: "24px" }}>Contact email</Typography>
        <Typography sx={{ color: "#272D37", fontSize: "1rem", fontWeight: "600", lineHeight: "24px", marginInline: "1rem" }}>chaminda.silva@seclk.com</Typography>
      </Grid>
      <Grid item xs={6} sm={6} xl={3} sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={{ color: "#5F6D7E", fontSize: "1rem", fontWeight: "400", lineHeight: "24px" }}>Hourly Rate</Typography>
        <Typography sx={{ color: "#272D37", fontSize: "1rem", fontWeight: "600", lineHeight: "24px", marginInline: "1rem" }}>50$</Typography>
      </Grid>
      <Grid item xs={6} sm={6} xl={3} sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={{ color: "#5F6D7E", fontSize: "1rem", fontWeight: "400", lineHeight: "24px" }}>Total Paid Amount</Typography>
        <Typography sx={{ color: "#272D37", fontSize: "1rem", fontWeight: "600", lineHeight: "24px", marginInline: "1rem" }}>2500$</Typography>
      </Grid>
    </Grid>
  );
}

export default EmployeeDetailsBox;

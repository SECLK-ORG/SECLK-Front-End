import React from 'react';
import { Grid, Typography } from '@mui/material';
import { EmployeePayloadDto } from '../../utilities/models';
import moment from 'moment';

interface EmployeeDetailsBoxProps {
  userData: EmployeePayloadDto | undefined;
}

const EmployeeDetailsBox: React.FC<EmployeeDetailsBoxProps> = ({ userData }) => {
  return (
    <Grid container spacing={3} sx={{ marginBottom: "1rem" }}>
      <Grid item xs={6} sm={6} xl={3} sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={{ color: "#5F6D7E", fontSize: "1rem", fontWeight: "400", lineHeight: "24px" }}>Start Date</Typography>
        <Typography sx={{ color: "#272D37", fontSize: "1rem", fontWeight: "600", lineHeight: "24px", marginInline: "1rem" }}>
          { moment(userData?.startDate).format('YYYY-MM-DD') || "N/A"}
        </Typography>
      </Grid>
      <Grid item xs={6} sm={6} xl={3} sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={{ color: "#5F6D7E", fontSize: "1rem", fontWeight: "400", lineHeight: "24px" }}>Position</Typography>
        <Typography sx={{ color: "#272D37", fontSize: "1rem", fontWeight: "600", lineHeight: "24px", marginInline: "1rem" }}>
          {userData?.position || "N/A"}
        </Typography>
      </Grid>
      <Grid item xs={6} sm={6} xl={3} sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={{ color: "#5F6D7E", fontSize: "1rem", fontWeight: "400", lineHeight: "24px" }}>Contact Number</Typography>
        <Typography sx={{ color: "#272D37", fontSize: "1rem", fontWeight: "600", lineHeight: "24px", marginInline: "1rem" }}>
          {userData?.contactNumber || "N/A"}
        </Typography>
      </Grid>
      <Grid item xs={6} sm={6} xl={3} sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={{ color: "#5F6D7E", fontSize: "1rem", fontWeight: "400", lineHeight: "24px" }}>Contact email</Typography>
        <Typography sx={{ color: "#272D37", fontSize: "1rem", fontWeight: "600", lineHeight: "24px", marginInline: "1rem" }}>
          {userData?.email || "N/A"}
        </Typography>
      </Grid>
      <Grid item xs={6} sm={6} xl={3} sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={{ color: "#5F6D7E", fontSize: "1rem", fontWeight: "400", lineHeight: "24px" }}>Total Paid Amount</Typography>
        <Typography sx={{ color: "#272D37", fontSize: "1rem", fontWeight: "600", lineHeight: "24px", marginInline: "1rem" }}>
          {/* Assuming Total Paid Amount is part of userData */}
          {userData?.totalPaidAmount ? `Rs.${userData.totalPaidAmount}` : "N/A"}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default EmployeeDetailsBox;

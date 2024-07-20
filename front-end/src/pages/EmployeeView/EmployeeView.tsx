// EmployeeView.tsx
import { Box, Grid, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from 'react-router-dom';
import { CustomButton } from '../../assets/theme/theme';
import { EmployeeDetailsBox, PaymentHistoryTable, ProjectMiniCard } from '../../components';
import styles from './EmployeeView.module.scss';
import { TabsList, TabPanel ,  Tab,} from "../../assets/theme/theme";
import { Tabs } from '@mui/base/Tabs';

const EmployeeView = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isFiltered, setIsFiltered] = useState(false);

  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleFilterDrawerOpen = () => {
    // Implement filter drawer open functionality
  };

  const handleClearFilters = () => {
    setIsFiltered(false);
    // Implement clear filters functionality
  };

  const handleClick = (mode: string, invoiceNumber: string) => {
    if (mode === 'VIEW') {
      // Implement view functionality
    } else if (mode === 'EDIT') {
      // Implement edit functionality
    }
  };

  const projects = [
    { projectName: 'ZenSpace Mobile App', role: 'UX Designer', date: '2024-07-01' },
    { projectName: 'Navigation Overhaul', role: 'UX Designer', date: '2024-06-15' },
    { projectName: 'New Project', role: 'Developer', date: '2024-07-20' },
  ];

  return (
    <Box m={1} p={2} sx={{ border: "1px solid #E0E0E0", borderRadius: "8px" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: "1rem",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "" }}>
          <IconButton onClick={handleBack}>
            <ArrowBackIcon sx={{ color: "black" }} />
          </IconButton>
          <Typography sx={{ fontWeight: "600", fontSize: "28px", marginInline: "1rem" }}>
            Chaminda Perera
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            sx={{
              backgroundColor: "#F0FAF0",
              borderRadius: "5px",
              padding: "2px 8px",
            }}
          >
            <Box
              sx={{
                backgroundColor: "#2D8A39",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                marginRight: "0.5rem",
              }}
            ></Box>
            <Typography sx={{ color: "#2D8A39", fontWeight: "600" }}>
              Active
            </Typography>
          </Box>
        </Box>
        <Box>
          <CustomButton
            sx={{ backgroundColor: "#437EF7", color: "white", height: "2.5rem", textTransform: "capitalize" }}
          >
            Edit Employee
          </CustomButton>
        </Box>
      </Box>
      <EmployeeDetailsBox />

      <Box p={2} sx={{ border: "1px solid #E0E0E0", borderRadius: "8px" }}>
        <Box sx={{ justifyContent: "space-between", display: "flex" }}>
          <Typography sx={{ fontWeight: "600", fontSize: "20px", marginBottom: "1rem" }}> Projects 3</Typography>
          <CustomButton
            sx={{ backgroundColor: "#437EF7", color: "white", height: "2.5rem", textTransform: "capitalize" }}
          >
            Add to Project
          </CustomButton>
        </Box>
        <Grid container spacing={3}>
          {projects.map((project, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <ProjectMiniCard key={index} projectName={project.projectName} role={project.role} date={project.date} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box className={styles.tabBox}>
        <Tabs defaultValue={0} orientation="horizontal">
          <TabsList>
            <Tab>Payment History</Tab>
          </TabsList>
          <TabPanel value={0}>
            <PaymentHistoryTable
              page={page}
              rowsPerPage={rowsPerPage}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              onFilterDrawerOpen={handleFilterDrawerOpen}
              onClearFilters={handleClearFilters}
              isFiltered={isFiltered}
              handleClick={handleClick}
            />
          </TabPanel>
        </Tabs>
      </Box>
    </Box>
  );
};

export default EmployeeView;

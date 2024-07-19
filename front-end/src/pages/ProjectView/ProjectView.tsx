import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import { EmployeesTable, IncomeTable, ProjectDetailsBox, ProjectInfoCard } from "../../components";
import styles from "./ProjectView.module.scss";
import { TabsList, TabPanel ,  Tab,} from "../../assets/theme/theme";
import { Tabs } from '@mui/base/Tabs';
import ExpensesTable from "../../components/ExpensesTable/ExpensesTable";
const expenses = [
  {
    category: "Salary",
    vendor: "Kalana Malith",
    amount: 200,
    description: "Software Engineer",
    invoiceNumber: "100 200 300",
    date: "23/08/2023",
  },
  {
    category: "Subscription",
    vendor: "Freepik",
    amount: 25,
    description: "Subscription payment",
    invoiceNumber: "101 202 303",
    date: "23/08/2023",
  },
  {
    category: "Salary",
    vendor: "Nuwan Thushara",
    amount: 100,
    description: "UX Designer",
    invoiceNumber: "102 203 304",
    date: "23/08/2023",
  },
  {
    category: "Salary",
    vendor: "Kalana Perera",
    amount: 150,
    description: "QA Engineer",
    invoiceNumber: "103 204 305",
    date: "23/08/2023",
  },
  {
    category: "Salary",
    vendor: "Kesara Charith",
    amount: 250,
    description: "QA Engineer",
    invoiceNumber: "104 205 306",
    date: "23/08/2023",
  },
];

const ProjectView = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <Box p={3}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <IconButton onClick={handleBack}>
          <ArrowBackIcon sx={{ color: "black" }} />
        </IconButton>
        <Typography
          sx={{ fontWeight: "600", fontSize: "28px", marginInline: "1rem" }}
        >
          ZenSpace Mobile App
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

      <ProjectDetailsBox />

      <Box mt={3} mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={6} xl={4}>
            <ProjectInfoCard
              label="This Month"
              title="Total Income"
              Value="$2500"
              Value2="$1742"
              label2="This Month"
              remaining="25"
              remainingLabel="25% Remaining"
              color="#5DC264"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} xl={4}>
            <ProjectInfoCard
              label="This Month"
              title="Total Expenses"
              Value="$1300"
              Value2="$331"
              label2="Remaining"
              color="#F15146"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} xl={4}>
            <ProjectInfoCard
              label="This Month"
              title="Profit"
              Value="$1300"
              Value2="$331"
              label2="This Month"
              color="#5DC264"
            />
          </Grid>
        </Grid>
      </Box>
    <Box className={styles.tabBox}>
      <Tabs defaultValue={0} orientation="horizontal">
  <TabsList>
    <Tab>Income</Tab>
    <Tab>Expenses</Tab>
    <Tab>Employees</Tab>
  </TabsList>
  <TabPanel value={0}>
<IncomeTable
 handleClick={(mode: string, expenseId: string) => {}}
 isFiltered={false}
 onClearFilters={() => {}}
 onFilterDrawerOpen={() => {}}
 onChangePage={(event: React.ChangeEvent<unknown>, newPage: number) => {}}
 onChangeRowsPerPage={(event: any) => {}}
 page={1}
 rowsPerPage={5}
/>

  </TabPanel>
  <TabPanel value={1}>
    <ExpensesTable
    handleClick={(mode: string, expenseId: string) => {}}
    isFiltered={false}
    onClearFilters={() => {}}
    onFilterDrawerOpen={() => {}}
    onChangePage={(event: React.ChangeEvent<unknown>, newPage: number) => {}}
    onChangeRowsPerPage={(event: any) => {}}
    page={1}
    rowsPerPage={5}
    
  />
  </TabPanel>
  <TabPanel value={2}>

<EmployeesTable
  handleClick={(mode: string, expenseId: string) => {}}
  isFiltered={false}
  onClearFilters={() => {}}
  onFilterDrawerOpen={() => {}}
  onChangePage={(event: React.ChangeEvent<unknown>, newPage: number) => {}}
  onChangeRowsPerPage={(event: any) => {}}
  page={1}
  rowsPerPage={5}
/>

  </TabPanel>
</Tabs>
      </Box>
    </Box>
  );
};

export default ProjectView;

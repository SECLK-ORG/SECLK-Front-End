import React, { useEffect, useState } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import { EmployeesTable, IncomeTable, ProjectDetailsBox, ProjectInfoCard } from "../../components";
import styles from "./ProjectView.module.scss";
import { TabsList, TabPanel ,  Tab,} from "../../assets/theme/theme";
import { Tabs } from '@mui/base/Tabs';
import ExpensesTable from "../../components/ExpensesTable/ExpensesTable";
import { ProjectService } from "../../services/project.service";
import { Project, ProjectStatus } from "../../utilities/models";

const ProjectView = () => {
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();

  const [projectData, setProjectData] = useState<Project>({} as Project)


useEffect(() => {

    getProjectData()
  
}, [])


const getProjectData=()=>{
  if(projectId){
    ProjectService.getProjectById(projectId).then((res:any)=>{
      console.log("first",res.data.data)
      setProjectData(res.data.data)

    }).catch((err)=>{
      console.log(err)
    })
  }
}
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <Box  m={1} 
    p={2}
    sx={{
      border: "1px solid #E0E0E0",
      borderRadius: "8px",
    }}>
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
          {projectData?.projectName}
        </Typography>
        <Box
          display="flex"
          alignItems="center"
          sx={{
            backgroundColor: projectData.status === ProjectStatus.COMPLETED ? '#F0FAF0' :
            projectData.status === ProjectStatus.IN_PROGRESS ? '#FFF8E1' :
              '#FFF2F0',
            borderRadius: "5px",
            padding: "2px 8px",
          }}
        >
          <Box
            sx={{
              backgroundColor: projectData.status === ProjectStatus.COMPLETED ? '#2D8A39' :
              projectData.status === ProjectStatus.IN_PROGRESS ? '#FFA500' :
                '#E2341D',
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              marginRight: "0.5rem",
            }}
          ></Box>
          <Typography sx={{ color: projectData.status === ProjectStatus.COMPLETED ? '#2D8A39' :
                                projectData.status === ProjectStatus.IN_PROGRESS ? '#FFA500' :
                                  '#E2341D', fontWeight: "600" }}>
            {projectData?.status}
          </Typography>
        </Box>
      </Box>

      <ProjectDetailsBox
      projectData={projectData }
      />

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

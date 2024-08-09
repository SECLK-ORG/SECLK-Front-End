import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  IconButton,
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
import { EmployeeFormDto, ExpenseFormDto, IncomeFormDto, Project, ProjectStatus } from "../../utilities/models";
import AddEmployeeModal from "../../components/AddEmployeeModal/AddEmployeeModal";
import AddExpenseModal from "../../components/AddExpenseModal/AddExpenseModal";
import AddIncomeModal from "../../components/AddIncomeModal/AddIncomeModal";
import { SCREEN_MODES } from "../../utilities/constants/app.constants";

const ProjectView = () => {
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();
  const INITIAL_INCOME_FORM_DATA: IncomeFormDto = {
    amount: { value: "", isRequired: true, disable: false, readonly: false, validator: "text", error: "" },
    invoiceNumber: { value: "", isRequired: true, disable: false, readonly: false, validator: "text", error: "" },
    receivedBy: { value: "", isRequired: true, disable: false, readonly: false, validator: "text", error: "" },
    date: { value: "", isRequired: true, disable: false, readonly: false, validator: "date", error: "" },
  };
  const INITIAL_EXPENSE_FORM_DATA: ExpenseFormDto = {
    category: { value: "", isRequired: true, disable: false, readonly: false, validator: "text", error: "" },
    vendor: { value: "", isRequired: true, disable: false, readonly: false, validator: "text", error: "" },
    amount: { value: "", isRequired: true, disable: false, readonly: false, validator: "text", error: "" },
    description: { value: "", isRequired: false, disable: false, readonly: false, validator: "text", error: "" },
    invoiceNumber: { value: "", isRequired: true, disable: false, readonly: false, validator: "text", error: "" },
    date: { value: "", isRequired: true, disable: false, readonly: false, validator: "date", error: "" },
  };
  
  const INITIAL_EMPLOYEE_FORM_DATA: EmployeeFormDto = {
    employeeName: { value: "", isRequired: true, disable: false, readonly: false, validator: "text", error: "" },
    email: { value: "", isRequired: true, disable: false, readonly: false, validator: "email", error: "" },
    position: { value: "", isRequired: true, disable: false, readonly: false, validator: "text", error: "" },
    projectStartedDate: { value: "", isRequired: true, disable: false, readonly: false, validator: "date", error: "" },
  };
  

  const [projectData, setProjectData] = useState<Project>({} as Project)

  
  const [incomeForm, setIncomeForm] = useState<IncomeFormDto>(INITIAL_INCOME_FORM_DATA);
  const [expenseForm, setExpenseForm] = useState<ExpenseFormDto>(INITIAL_EXPENSE_FORM_DATA);
  const [employeeForm, setEmployeeForm] = useState<EmployeeFormDto>(INITIAL_EMPLOYEE_FORM_DATA);
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);

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

  const onInputHandleChange = <T extends keyof IncomeFormDto | keyof ExpenseFormDto | keyof EmployeeFormDto>(
    formType: 'income' | 'expense' | 'employee',
    property: T,
    value: string
  ) => {
    if (formType === 'income') {
      setIncomeForm({
        ...incomeForm,
        [property]: { ...incomeForm[property as keyof typeof incomeForm], value: value, error: "" },
      });
    } else if (formType === 'expense') {
      setExpenseForm({
        ...expenseForm,
        [property]: { ...expenseForm[property as keyof typeof expenseForm], value: value, error: "" },
      });
    } else if (formType === 'employee') {
      setEmployeeForm({
        ...employeeForm,
        [property]: { ...employeeForm[property as keyof typeof employeeForm], value: value, error: "" },
      });
    }
  };
  
  const handleInputFocus = <T extends keyof IncomeFormDto | keyof ExpenseFormDto | keyof EmployeeFormDto>(
    formType: 'income' | 'expense' | 'employee',
    property: T
  ) => {
    if (formType === 'income') {
      setIncomeForm({
        ...incomeForm,
        [property]: { ...incomeForm[property as keyof typeof incomeForm], error: "" },
      });
    } else if (formType === 'expense') {
      setExpenseForm({
        ...expenseForm,
        [property]: { ...expenseForm[property as keyof typeof expenseForm], error: "" },
      });
    } else if (formType === 'employee') {
      setEmployeeForm({
        ...employeeForm,
        [property]: { ...employeeForm[property as keyof typeof employeeForm], error: "" },
      });
    }
  };
  
  const handleModalOpen = (type: string) => {
    if (type === 'income') setIsIncomeModalOpen(true);
    if (type === 'expense') setIsExpenseModalOpen(true);
    if (type === 'employee') setIsEmployeeModalOpen(true);
  };

  const handleModalClose = (type: string) => {
    if (type === 'income') setIsIncomeModalOpen(false);
    if (type === 'expense') setIsExpenseModalOpen(false);
    if (type === 'employee') setIsEmployeeModalOpen(false);
  };

const handleClick =(mode: string, id:string)=>{
  if(mode===SCREEN_MODES.CREATE){
    handleModalOpen('employee')
  }

}

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
 handleClick={(mode: string, expenseId: string) => handleModalOpen('income')}
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
  handleClick={handleClick}
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


      <AddIncomeModal
  open={isIncomeModalOpen}
  onClose={() => handleModalClose('income')}
  onSave={() => {
    // Implement your save logic here
    handleModalClose('income');
  }}
  incomeForm={incomeForm}
  helperText={false}
  handleInputFocus={(property:any) => handleInputFocus('income', property)}
  onInputHandleChange={(property:any, value) => onInputHandleChange('income', property, value)}
/>

<AddExpenseModal
  open={isExpenseModalOpen}
  onClose={() => handleModalClose('expense')}
  onSave={() => {
    // Implement your save logic here
    handleModalClose('expense');
  }}
  expenseForm={expenseForm}
  categories={['Category 1', 'Category 2', 'Category 3']}
  helperText={false}
  handleInputFocus={(property:any) => handleInputFocus('expense', property)}
  onInputHandleChange={(property:any, value) => onInputHandleChange('expense', property, value)}
/>

<AddEmployeeModal
  open={isEmployeeModalOpen}
  onClose={() => handleModalClose('employee')}
  onSave={() => {
    // Implement your save logic here
    handleModalClose('employee');
  }}
  employeeForm={employeeForm}
  positions={['Position 1', 'Position 2', 'Position 3']}
  employees={['Employee 1', 'Employee 2', 'Employee 3']}
  helperText={false}
  handleInputFocus={(property:any) => handleInputFocus('employee', property)}
  onInputHandleChange={(property:any, value) => onInputHandleChange('employee', property, value)}
/>

    </Box>
  );
};

export default ProjectView;

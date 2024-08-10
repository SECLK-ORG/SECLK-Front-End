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
import { employee, EmployeeFormDto, Expense, ExpenseFormDto, Income, IncomeFormDto, IncomePayload, Project, ProjectStatus } from "../../utilities/models";
import AddEmployeeModal from "../../components/AddEmployeeModal/AddEmployeeModal";
import AddExpenseModal from "../../components/AddExpenseModal/AddExpenseModal";
import AddIncomeModal from "../../components/AddIncomeModal/AddIncomeModal";
import { SCREEN_MODES } from "../../utilities/constants/app.constants";
import { validateFormData } from "../../utilities/helpers";
import { showErrorToast, showSuccessToast } from "../../utilities/helpers/alert";
import DeleteConfirmationModal from "../../components/shared/DeleteConfirmationModal/DeleteConfirmationModal";

const ProjectView = () => {
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();

  const INITIAL_INCOME_FORM_DATA: IncomeFormDto = {
    amount: { value: "", isRequired: true, disable: false, readonly: false, validator: "text", error: "" },
    description: { value: "", isRequired: false, disable: false, readonly: false, validator: "text", error: "" },
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
    _id: { value: "", isRequired: false, disable: false, readonly: false, validator: "text", error: "" },
    employeeID: { value: "", isRequired: false, disable: false, readonly: false, validator: "text", error: "" },
    employeeName: { value: "", isRequired: true, disable: false, readonly: false, validator: "text", error: "" },
    email: { value: "", isRequired: true, disable: false, readonly: false, validator: "email", error: "" },
    position: { value: "", isRequired: true, disable: false, readonly: false, validator: "text", error: "" },
    projectStartedDate: { value: "", isRequired: true, disable: false, readonly: false, validator: "date", error: "" },
  };
  

  const [projectData, setProjectData] = useState<Project>({} as Project)
  const [employees, setEmployees] = useState<employee[]>([]);
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isIncomeLoading, setIsIncomeLoading] = useState(false);
  const [isExpensesLoading, setIsExpensesLoading] = useState(false);
  const [isEmployeeLoading, setIsEmployeeLoading] = useState(false);
  
  const [incomeForm, setIncomeForm] = useState<IncomeFormDto>(INITIAL_INCOME_FORM_DATA);
  const [expenseForm, setExpenseForm] = useState<ExpenseFormDto>(INITIAL_EXPENSE_FORM_DATA);
  const [employeeForm, setEmployeeForm] = useState<EmployeeFormDto>(INITIAL_EMPLOYEE_FORM_DATA);
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);

  const [helperText, setHelperText] = useState(false);
  const [mode, setMode] = useState(SCREEN_MODES.CREATE);
  const [id, setId] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [text, setText] = useState("");



useEffect(() => {
    getProjectData()
    getEmployeeDetails() 
    getIncomeDetails()
    getExpenseDetails()
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

const getEmployeeDetails=()=>{
  if(projectId){
    setIsEmployeeLoading(true)
    ProjectService.getEmployeeDetailsByProjectId(projectId).then((res:any)=>{
      console.log("second",res.data.data.employees)
      setEmployees(res.data.data.employees)
      setIsEmployeeLoading(false)
    }).catch((err)=>{
      setIsEmployeeLoading(false)
      console.log(err)
    })
  }

}
const getIncomeDetails=()=>{
  if(projectId){
    setIsIncomeLoading(true)
    ProjectService.getIncomeDetailsByProjectId(projectId).then((res:any)=>{
      console.log("third",res.data.data.incomeDetails)
      setIncomes(res.data.data.incomeDetails)
      setIsIncomeLoading(false)
    }).catch((err)=>{
      setIsIncomeLoading(false)
      console.log(err)
    })
  }
}
const getExpenseDetails=()=>{
  if(projectId){
    setIsExpensesLoading(true)
    ProjectService.getExpenseDetailsByProjectId(projectId).then((res:any)=>{
      console.log("fourth",res.data.data.expenseDetails)
      setExpenses(res.data.data.expenseDetails)
      setIsExpensesLoading(false)
    }).catch((err)=>{
      setIsExpensesLoading(false)
      console.log(err)
    })}
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
    if (type === 'income') {setIsIncomeModalOpen(false) ;setIncomeForm(INITIAL_INCOME_FORM_DATA)}
    if (type === 'expense') setIsExpenseModalOpen(false);setExpenseForm(INITIAL_EXPENSE_FORM_DATA)
    if (type === 'employee') setIsEmployeeModalOpen(false);setEmployeeForm(INITIAL_EMPLOYEE_FORM_DATA)
  };

const handleClick =(mode: string, id:string,property:string)=>{
  setMode(mode)
  setId(id)
  setText(property)
  if(mode===SCREEN_MODES.DELETE){
    setDeleteModalOpen(true)
  }else{
    if(property==='income'){
      handleModalOpen('income')
      if(SCREEN_MODES.EDIT||SCREEN_MODES.VIEW){
          const isDisable=mode===SCREEN_MODES.VIEW?true:false
          const data=incomes.find((income:Income)=>(income._id===id)) 
          if(data){
                setIncomeForm({
                  amount: { value: data.amount, isRequired: true, disable: isDisable, readonly: isDisable, validator: "text", error: "" },
                  description: { value: data?.description as string, isRequired: isDisable, disable: isDisable, readonly: false, validator: "text", error: "" },
                  receivedBy: { value: data.receivedBy, isRequired: true, disable: isDisable, readonly: isDisable, validator: "text", error: "" },
                  date: { value: data.date, isRequired: true, disable: isDisable, readonly: isDisable, validator: "date", error: "" },
                })
           }
      }

    }else if(property==='expense'){
      handleModalOpen('expense')
    }else{
      handleModalOpen('employee')
    }
  }
}

const handleSave=async (property:string)=>{ 
  setHelperText(true)
  if(property==='income'){
    const [validateData, isValid] =await validateFormData(incomeForm);
    setIncomeForm(validateData);
    if(isValid&&projectId){  
      if(mode===SCREEN_MODES.CREATE){
        const incomePayload:IncomePayload={
          amount:incomeForm.amount.value,
          receivedBy:incomeForm.receivedBy.value,
          date:incomeForm.date.value,
          description:incomeForm.description.value
        }
        ProjectService.createIncomeDetailByProjectId(projectId,incomePayload).then((res:any)=>{
          console.log("income",res.data.data)
          showSuccessToast("Income Added Successfully")
          getIncomeDetails()
          handleModalClose('income')
        }).catch((err)=>{
          showErrorToast(err)
          console.log(err)
        })
       
      }else{
        const incomePayload:IncomePayload={
          _id:id,
          amount:incomeForm.amount.value,
          receivedBy:incomeForm.receivedBy.value,
          date:incomeForm.date.value,
          description:incomeForm.description.value
        }
        ProjectService.updateIncomeDetailByProjectId(projectId,id,incomePayload).then((res:any)=>{
          showSuccessToast("Income Updated Successfully")
          getIncomeDetails()
          handleModalClose('income')
          setIncomeForm(INITIAL_INCOME_FORM_DATA)
        }).catch((err)=>{
          showErrorToast(err)
          console.log(err)
        })
      }
    
    
    
    
    
    
    }
   
  }
  else if(property==='expense'){
    console.log("expense",expenseForm)
  }
  else{
    console.log("employee",employeeForm)
  }
}


const handleDeleteAction=(isConfirm:boolean, property:string)=>{
  if(isConfirm&&projectId){
    if(property==='income'){
      ProjectService.deleteIncomeDetailByProjectId(projectId,id).then((res:any)=>{
        console.log("delete income",res.data.data)
        showSuccessToast("Income Deleted Successfully")
        getIncomeDetails()
        setDeleteModalOpen(false)
        setIncomeForm(INITIAL_INCOME_FORM_DATA)
      }).catch((err)=>{
        showErrorToast(err)
        console.log(err)
      })
    }else if(property==='expense'){
      console.log("delete expense")
    }else{
      console.log("delete employee")
    }
  
  }else{
    setDeleteModalOpen(false)
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
          incomes={incomes}
          isIncomeLoading={isIncomeLoading}
          handleClick={(mode:string,employeeId:string)=>handleClick(mode,employeeId,'income')}
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
        expenses={expenses}
        isExpensesLoading={isExpensesLoading}
        handleClick={(mode:string,employeeId:string)=>handleClick(mode,employeeId,'expense')}
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
          isEmployeeLoading={isEmployeeLoading}
          employees={employees}
          handleClick={(mode:string,employeeId:string)=>handleClick(mode,employeeId,'employee')}
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
  mode={mode}
  open={isIncomeModalOpen}
  onClose={() => handleModalClose('income')}
  onSave={() => {handleSave('income')}}
  incomeForm={incomeForm}
  helperText={helperText}
  handleInputFocus={(property:any) => handleInputFocus('income', property)}
  onInputHandleChange={(property:any, value) => onInputHandleChange('income', property, value)}
/>

<AddExpenseModal
  open={isExpenseModalOpen}
  onClose={() => handleModalClose('expense')}
  onSave={() => {handleSave('expense')}}
  expenseForm={expenseForm}
  categories={['Category 1', 'Category 2', 'Category 3']}
  helperText={false}
  handleInputFocus={(property:any) => handleInputFocus('expense', property)}
  onInputHandleChange={(property:any, value) => onInputHandleChange('expense', property, value)}
/>

<AddEmployeeModal
  open={isEmployeeModalOpen}
  onClose={() => handleModalClose('employee')}
  onSave={() => {handleSave('employee');}}
  employeeForm={employeeForm}
  positions={['Position 1', 'Position 2', 'Position 3']}
  employees={['Employee 1', 'Employee 2', 'Employee 3']}
  helperText={false}
  handleInputFocus={(property:any) => handleInputFocus('employee', property)}
  onInputHandleChange={(property:any, value) => onInputHandleChange('employee', property, value)}
/>

<DeleteConfirmationModal
handleDeleteAction={handleDeleteAction}
onClose={()=>{setDeleteModalOpen(false)}}
open={deleteModalOpen}
text={text}

/>

</Box>
  );
};

export default ProjectView;

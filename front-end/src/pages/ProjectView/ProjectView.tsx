import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import { EmployeesTable, IncomeTable, ProjectDetailsBox, ProjectInfoCard } from "../../components";
import styles from "./ProjectView.module.scss";
import { TabsList, TabPanel ,  Tab,} from "../../assets/theme/theme";
import { Tabs } from '@mui/base/Tabs';
import ExpensesTable from "../../components/ExpensesTable/ExpensesTable";
import { ProjectService } from "../../services/project.service";
import { employee, EmployeeFormDto, EmployeePayload, Expense, ExpenseFormDto, ExpensePayload, Income, IncomeFormDto, IncomePayload, Project, ProjectStatus, ProjectSummary, userList } from "../../utilities/models";
import AddEmployeeModal from "../../components/AddEmployeeModal/AddEmployeeModal";
import AddExpenseModal from "../../components/AddExpenseModal/AddExpenseModal";
import AddIncomeModal from "../../components/AddIncomeModal/AddIncomeModal";
import { CategoryTypes, SCREEN_MODES } from "../../utilities/constants/app.constants";
import { validateFormData } from "../../utilities/helpers";
import { showErrorToast, showSuccessToast } from "../../utilities/helpers/alert";
import DeleteConfirmationModal from "../../components/shared/DeleteConfirmationModal/DeleteConfirmationModal";
import { UserService } from "../../services/user.service";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import moment from "moment";

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
    invoiceNumber: { value: "", isRequired: false, disable: false, readonly: false, validator: "text", error: "" },
    date: { value: "", isRequired: true, disable: false, readonly: false, validator: "date", error: "" },
    employeeID: { value: {} as userList, isRequired: false, disable: false, readonly: false, validator: "object", error: "" },
  };
  
  const INITIAL_EMPLOYEE_FORM_DATA: EmployeeFormDto = {
    _id: { value: "", isRequired: false, disable: false, readonly: false, validator: "text", error: "" },
    employeeID: { value:  {} as userList, isRequired: true, disable: false, readonly: false, validator: "object", error: "" },
    employeeName: { value: "", isRequired: true, disable: false, readonly: false, validator: "text", error: "" },
    email: { value: "", isRequired: true, disable: true, readonly: true, validator: "email", error: "" },
    position: { value: "", isRequired: true, disable: true, readonly: true, validator: "text", error: "" },
    projectStartedDate: { value: "", isRequired: true, disable: false, readonly: false, validator: "date", error: "" },
  };
  
  const loginState = useSelector((state: RootState) => state.user.login);
  const [isAdmin,setIsAdmin]=useState<boolean>(false)
  const [projectData, setProjectData] = useState<Project>({} as Project)
  const [projectSummary, setProjectSummary] = useState<ProjectSummary>({} as ProjectSummary)
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

  const [employeeList, setEmployeeList] = useState<userList[]>([]);

  const [helperText, setHelperText] = useState(false);
  const [mode, setMode] = useState(SCREEN_MODES.CREATE);
  const [id, setId] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [text, setText] = useState("");

  const [incomePage, setIncomePage] = useState(1);
  const [incomeRowsPerPage, setIncomeRowsPerPage] = useState(5);

  const [expensePage, setExpensePage] = useState(1);
  const [expenseRowsPerPage, setExpenseRowsPerPage] = useState(5);

  const [employeePage, setEmployeePage] = useState(1);
  const [employeeRowsPerPage, setEmployeeRowsPerPage] = useState(5);



  useEffect(() => {
    // Set isAdmin based on the loginState
    if (loginState.status === 'success') {
      setIsAdmin(loginState.data.role === 'Admin');
      
    }
  }, [loginState]);

useEffect(() => {
  getProjectData();
  getEmployeeDetails();
  getSearchValues();
  getProjectSummary();

  if (isAdmin) {
    getIncomeDetails();
    getExpenseDetails();
  }
}, [isAdmin]);



const getProjectSummary=()=>{
  if(projectId){
    ProjectService.getProjectSummary(projectId).then((res:any)=>{
      console.log("projectsummary",res.data.data)
      setProjectSummary(res.data.data)
    }).catch((err)=>{
      console.log(err)
    })
  }
}
const getSearchValues=()=>{
  UserService.searchUsers(" ").then((res:any)=>{
    console.log("search",res.data.data)
  
    setEmployeeList(res.data.data)
  }).catch((err)=>{})
}
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
  const onInputHandleChange = <
  T extends keyof IncomeFormDto | keyof ExpenseFormDto | keyof EmployeeFormDto
>(
  formType: 'income' | 'expense' | 'employee',
  property: T,
  value: any
) => {
  if (formType === 'income') {
    setIncomeForm((prevForm) => ({
      ...prevForm,
      [property]: { ...prevForm[property as keyof typeof prevForm], value: value, error: "" },
    }));
  } else if (formType === 'expense') {
    if (property === 'employeeID') {
      const employee = employeeList.find((employee) => employee._id === value._id);
      if (employee) {
        setExpenseForm((prevForm) => ({
          ...prevForm,
          vendor: { ...prevForm.vendor, value: employee.name, error: "" },
          [property]: { ...prevForm[property as keyof typeof prevForm], value: value, error: "" },
        }));
      }
    } else {
      setExpenseForm((prevForm) => ({
        ...prevForm,
        [property]: { ...prevForm[property as keyof typeof prevForm], value: value, error: "" },
      }));
    }
  } else if (formType === 'employee') {
    if(property==='employeeID'){
      const employee = employeeList.find((employee) => employee._id === value._id);
      if (employee) {
        setEmployeeForm((prevForm) => ({
          ...prevForm,
          employeeName: { ...prevForm.employeeName, value: employee.name, error: "" },
          email: { ...prevForm.email, value: employee.email, error: "" },
          position: { ...prevForm.position, value: employee.position, error: "" },
          [property]: { ...prevForm[property as keyof typeof prevForm], value: value, error: "" },
        }));
      }
    }else{
      setEmployeeForm((prevForm) => ({
        ...prevForm,
        [property]: { ...prevForm[property as keyof typeof prevForm], value: value, error: "" },
      }));
    }
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
      if (SCREEN_MODES.EDIT || SCREEN_MODES.VIEW) {
        const isDisable = mode === SCREEN_MODES.VIEW;
        const data: Expense = expenses.find((expense: Expense) => expense._id === id) as Expense;
      
        if (data) {
          let employee = undefined;
      
          if (data.category !== "Other" && data.employeeID) {
            employee = employeeList.find((employee: userList) => employee._id === data.employeeID?._id);
          }
      
          setExpenseForm({
            category: { value: data.category, isRequired: true, disable: isDisable, readonly: isDisable, validator: "text", error: "" },
            vendor: { value: data.category === "Other" ? data.vendor : employee?.name || "", isRequired: true, disable: isDisable, readonly: isDisable, validator: "text", error: "" },
            amount: { value: data.amount, isRequired: true, disable: isDisable, readonly: isDisable, validator: "text", error: "" },
            description: { value: data.description || "", isRequired: isDisable, disable: isDisable, readonly: false, validator: "text", error: "" },
            invoiceNumber: { value: data.invoiceNumber || "", isRequired: true, disable: isDisable, readonly: isDisable, validator: "text", error: "" },
            date: { value: data.date, isRequired: true, disable: isDisable, readonly: isDisable, validator: "date", error: "" },
            employeeID: { value: data.category === "Other" ? {} as userList : data.employeeID || {} as userList, isRequired: data.category !== "Other", disable: isDisable, readonly: isDisable, validator: "object", error: "" },
          });
        }
      }
      
    }else{
      handleModalOpen('employee')
      if (SCREEN_MODES.EDIT || SCREEN_MODES.VIEW) {
        const isDisable = mode === SCREEN_MODES.VIEW;
        const data: employee = employees.find((employee: employee) => employee._id === id) as employee;
       
        if (data) {
          setEmployeeForm({
            _id: { value: data._id, isRequired: false, disable: true, readonly: true, validator: "text", error: "" },
            employeeID: { value: data.employeeID, isRequired: true, disable: isDisable, readonly: isDisable, validator: "object", error: "" },
            employeeName: { value: data.employeeName, isRequired: true, disable: isDisable, readonly: isDisable, validator: "text", error: "" },
            email: { value: data.email, isRequired: true, disable: true, readonly: true, validator: "email", error: "" },
            position: { value: data.position, isRequired: true, disable: true, readonly: true, validator: "text", error: "" },
            projectStartedDate: { value: moment(data.projectStartedDate).format('YYYY-MM-DD'), isRequired: true, disable: isDisable, readonly: isDisable, validator: "date", error: "" },

          });
        }
      }
    }
  }
}

const handleSave=async (property:string)=>{ 
  setHelperText(true)
  if(property==='income'){
    const [validateData, isValid] =await validateFormData(incomeForm);
    setIncomeForm(validateData);
    if(isValid&&projectId){  
      setIsIncomeLoading(true)
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
          setIsIncomeLoading(false)
          getProjectSummary()
        }).catch((err)=>{
          setIsIncomeLoading(false)
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
          getProjectSummary()
          setIncomeForm(INITIAL_INCOME_FORM_DATA)
          setIsIncomeLoading(false)
        }).catch((err)=>{
          setIsIncomeLoading(false)
          showErrorToast(err)
          console.log(err)
        })
      }
    }
   
  }
  else if(property==='expense'){
    console.log("expense",expenseForm)
    const [validateData, isValid] =await validateFormData(expenseForm);
    setExpenseForm(validateData);
    if(isValid&&projectId){
      setIsExpensesLoading(true)
      if(mode===SCREEN_MODES.CREATE){
        const expensePayload:ExpensePayload={
          amount:expenseForm.amount.value,
          vendor:expenseForm.vendor.value,
          date:expenseForm.date.value,
          description:expenseForm.description.value,
          category:expenseForm.category.value,
          employeeID:expenseForm.employeeID.value as userList,
          invoiceNumber:expenseForm.invoiceNumber.value
        }
        ProjectService.createExpenseDetailByProjectId(projectId,expensePayload).then((res:any)=>{
          console.log("expense",res.data.data)
          showSuccessToast("Expense Added Successfully")
          getExpenseDetails()
          getProjectSummary()
          handleModalClose('expense')
          setIsExpensesLoading(false)
        }).catch((err)=>{
          showErrorToast(err)
          setIsExpensesLoading(false)
          console.log(err)
        })
      }else{
        const expensePayload:ExpensePayload={
          _id:id,
          amount:expenseForm.amount.value,
          vendor:expenseForm.vendor.value,
          date:expenseForm.date.value,
          description:expenseForm.description.value,
          category:expenseForm.category.value,
          employeeID:expenseForm.employeeID.value as userList,
          invoiceNumber:expenseForm.invoiceNumber.value
        }
        ProjectService.updateExpenseDetailByProjectId(projectId,id,expensePayload).then((res:any)=>{
          showSuccessToast("Expense Updated Successfully")
          getExpenseDetails()
          handleModalClose('expense')
          getProjectSummary()
          setExpenseForm(INITIAL_EXPENSE_FORM_DATA)
          setIsExpensesLoading(false)
        }).catch((err)=>{
          setIsExpensesLoading(false)
          showErrorToast(err)
          console.log(err)
        })
      }
    }

  }
  else if(property==='employee') {
    console.log("employee",employeeForm)
    const [validateData, isValid] =await validateFormData(employeeForm);
    setEmployeeForm(validateData);
    if(isValid&&projectId){
      setIsEmployeeLoading(true)
      if(mode===SCREEN_MODES.CREATE){
        const employeePayload:EmployeePayload={
          employeeID:employeeForm.employeeID.value,
          employeeName:employeeForm.employeeName.value,
          email:employeeForm.email.value,
          position:employeeForm.position.value,
          projectStartedDate:employeeForm.projectStartedDate.value
        }
        ProjectService.createEmployeeDetailByProjectId(projectId,employeePayload).then((res:any)=>{
          console.log("employee",res.data.data)
          showSuccessToast("Employee Added Successfully")
          getEmployeeDetails()
         setIsEmployeeLoading(false)

          handleModalClose('employee')
        }).catch((err)=>{
         setIsEmployeeLoading(false)

          showErrorToast(err)
          console.log(err)
        })
      }else{
        const employeePayload:EmployeePayload={
          _id:id,
          employeeID:employeeForm.employeeID.value,
          employeeName:employeeForm.employeeName.value,
          email:employeeForm.email.value,
          position:employeeForm.position.value,
          projectStartedDate:employeeForm.projectStartedDate.value
        }
        ProjectService.updateEmployeeDetailByProjectId(projectId,id,employeePayload).then((res:any)=>{
          showSuccessToast("Employee Updated Successfully")
          getEmployeeDetails()
          setIsEmployeeLoading(false)
          handleModalClose('employee')
          setEmployeeForm(INITIAL_EMPLOYEE_FORM_DATA)
        }).catch((err)=>{
          showErrorToast(err)
          console.log(err)
          setIsEmployeeLoading(false)
        })}
    }
  }
}


const handleDeleteAction=(isConfirm:boolean, property:string)=>{
  if(isConfirm&&projectId){
    if(property==='income'){
      setIsIncomeLoading(true)
      ProjectService.deleteIncomeDetailByProjectId(projectId,id).then((res:any)=>{
        console.log("delete income",res.data.data)
        showSuccessToast("Income Deleted Successfully")
        getIncomeDetails()
        setDeleteModalOpen(false)
        setIsIncomeLoading(false)
        setIncomeForm(INITIAL_INCOME_FORM_DATA)
      }).catch((err)=>{
        setIsIncomeLoading(false)
        showErrorToast(err)
        console.log(err)
      })
    }else if(property==='expense'){
      console.log("delete expense")
      setIsExpensesLoading(true)
      ProjectService.deleteExpenseDetailByProjectId(projectId,id).then((res:any)=>{
        console.log("delete expense",res.data.data)
        showSuccessToast("Expense Deleted Successfully")
        getExpenseDetails()
        setDeleteModalOpen(false)
        setExpenseForm(INITIAL_EXPENSE_FORM_DATA)
        setIsExpensesLoading(false)
      }).catch((err)=>{
        showErrorToast(err)
        setIsExpensesLoading(false)
        console.log(err)
      })
    }else{
      console.log("delete employee")
      setIsEmployeeLoading(true)
      ProjectService.deleteEmployeeDetailByProjectId(projectId,id).then((res:any)=>{
        console.log("delete employee",res.data.data)
        showSuccessToast("Employee Deleted Successfully")
        getEmployeeDetails()
        setDeleteModalOpen(false)
        setEmployeeForm(INITIAL_EMPLOYEE_FORM_DATA)
        setIsEmployeeLoading(false)
      }).catch((err)=>{
        showErrorToast(err)
        console.log(err)
        setIsEmployeeLoading(false)
        setDeleteModalOpen(false)
      })
    }
  
  }else{
    setDeleteModalOpen(false)
  }
}
const handleChangeRowsPerPage=(event: React.ChangeEvent<HTMLInputElement>,type:string)=>{
  if (type === 'income'){
    setIncomeRowsPerPage(parseInt(event.target.value, 10));
    setIncomePage(1);
  }
  if (type === 'expense'){
    setExpenseRowsPerPage(parseInt(event.target.value, 10));
    setExpensePage(1);
  }
  if (type === 'employee'){
    setEmployeeRowsPerPage(parseInt(event.target.value, 10));
    setEmployeePage(1);
  }
}
const handleChangePage=(newPage: any,type:string)=>{
  if (type === 'income'){
    setIncomePage(newPage);
  }
  if (type === 'expense'){
    setExpensePage(newPage);
  }
  if (type === 'employee'){
    setEmployeePage(newPage);
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
      isAdmin={isAdmin}
      projectData={projectData }
      />

{isAdmin&&  <Box mt={3} mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12} lg={6} xl={4}>
            <ProjectInfoCard
              agreementAmount={projectSummary.agreedAmount}
              label="Received Amount"
              title="Total Income"
              Progress={projectSummary.IncomePercentage}
              Value={projectSummary.totalIncome}
              Value2={projectSummary.remainingIncome}
              label2="This Month"
              remaining="25"
              remainingLabel="25% Remaining"
              color="#5DC264"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={6} xl={4}>
            <ProjectInfoCard
              label="Total Spent"
              title="Total Expenses"
              Progress={projectSummary.ExpensesPercentage}
              Value={projectSummary.totalExpenses}
              Value2={projectSummary.remainingExpenses}
              label2="Remaining"
              color="#F15146"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={6} xl={4}>
            <ProjectInfoCard
              label="Total profit"
              title="Profit"
              Value={projectSummary.totalProfit}
              Value2={projectSummary.currentMonthProfit}
              label2="This Month"
              color="#5DC264"
            />
          </Grid>
        </Grid>
      </Box>
      }
<Box className={styles.tabBox}>
  <Tabs defaultValue={ 0 } orientation="horizontal">
  <TabsList>
  {isAdmin ? (
    <>
      <Tab>Income</Tab>
      <Tab>Expenses</Tab>
      <Tab>Employees</Tab>
    </>
  ) : (
    <Tab>Employees</Tab>
  )}
</TabsList>
    {isAdmin && (
      <TabPanel value={0}>
          <IncomeTable
          incomes={incomes}
          isIncomeLoading={isIncomeLoading}
          handleClick={(mode:string,employeeId:string)=>handleClick(mode,employeeId,'income')}
          isFiltered={false}
          onClearFilters={() => {}}
          onFilterDrawerOpen={() => {}}
          onChangePage={(event: React.ChangeEvent<unknown>, newPage: number) => handleChangePage(newPage ,"income")}
          onChangeRowsPerPage={(event: React.ChangeEvent<HTMLInputElement>) => handleChangeRowsPerPage(event,'income')}
          page={incomePage}
          rowsPerPage={incomeRowsPerPage}
          />
      </TabPanel>
    )}
     {isAdmin &&  <TabPanel value={1}>
        <ExpensesTable
        expenses={expenses}
        isExpensesLoading={isExpensesLoading}
        handleClick={(mode:string,employeeId:string)=>handleClick(mode,employeeId,'expense')}
        isFiltered={false}
        onClearFilters={() => {}}
        onFilterDrawerOpen={() => {}}
        onChangePage={(event: React.ChangeEvent<unknown>, newPage: number) => handleChangePage(newPage,"expense")}
          onChangeRowsPerPage={(event: React.ChangeEvent<HTMLInputElement>) => handleChangeRowsPerPage(event,'expense')}
        page={expensePage}
        rowsPerPage={expenseRowsPerPage}
        
      />
      </TabPanel>
      }
      <TabPanel value={isAdmin?2:0}>
        <EmployeesTable
         isAdmin={isAdmin}
          isEmployeeLoading={isEmployeeLoading}
          employees={employees}
          handleClick={(mode:string,employeeId:string)=>handleClick(mode,employeeId,'employee')}
          isFiltered={false}
          onClearFilters={() => {}}
          onFilterDrawerOpen={() => {}}
          onChangePage={(event: React.ChangeEvent<unknown>, newPage: number) => handleChangePage(newPage,'employee')}
          onChangeRowsPerPage={(event: React.ChangeEvent<HTMLInputElement>) => handleChangeRowsPerPage(event,'employee')}
          page={employeePage}
          rowsPerPage={employeeRowsPerPage}
        />
        </TabPanel>
  </Tabs>
</Box>


<AddIncomeModal
  isIncomeLoading={isIncomeLoading}
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
isExpensesLoading={isExpensesLoading}
  mode={mode}
  employeeList={employeeList}
  open={isExpenseModalOpen}
  onClose={() => handleModalClose('expense')}
  onSave={() => {handleSave('expense')}}
  expenseForm={expenseForm}
  categories={CategoryTypes}
  helperText={helperText}
  handleInputFocus={(property:any) => handleInputFocus('expense', property)}
  onInputHandleChange={(property:any, value) => onInputHandleChange('expense', property, value)}
/>

<AddEmployeeModal
isEmployeeLoading={isEmployeeLoading}
 mode={mode}
 employeeList={employeeList}
  open={isEmployeeModalOpen}
  onClose={() => handleModalClose('employee')}
  onSave={() => {handleSave('employee');}}
  employeeForm={employeeForm}
  helperText={helperText}
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

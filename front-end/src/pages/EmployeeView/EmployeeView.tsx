import { Box, CircularProgress, Grid, IconButton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from 'react-router-dom';
import { CustomButton } from '../../assets/theme/theme';
import { EmployeeDetailsBox, PaymentHistoryTable, ProjectMiniCard } from '../../components';
import styles from './EmployeeView.module.scss';
import { TabsList, TabPanel, Tab } from "../../assets/theme/theme";
import { Tabs } from '@mui/base/Tabs';
import { UserService } from '../../services/user.service';
import { PaymentHistory, PaymentFormDto, ProjectByUser, EmployeePayloadDto, ExpensePayload, userList, AddToProjectFormDto, ProjectList, EmployeePayload } from '../../utilities/models';
import AddPaymentModal from '../../components/AddPaymentModal/AddPaymentModal';
import { validateFormData } from '../../utilities/helpers';
import { showSuccessToast, showErrorToast } from '../../utilities/helpers/alert';
import { CategoryTypes, SCREEN_MODES } from '../../utilities/constants/app.constants';
import { ProjectService } from '../../services/project.service';
import DeleteConfirmationModal from '../../components/shared/DeleteConfirmationModal/DeleteConfirmationModal';
import AddToProjectModal from '../../components/AddToProjectModal/AddToProjectModal';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { tr } from 'date-fns/locale';

const EmployeeView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isFiltered, setIsFiltered] = useState(false);
  const [paymentHistory, setPaymentHistory] = useState<PaymentHistory[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [mode, setMode] = useState(SCREEN_MODES.CREATE);


  const INITIAL_PAYMENT_FORM_DATA: PaymentFormDto = {
    project:{ value: {} as ProjectByUser, isRequired: true, disable: false, readonly: false, validator: 'text', error: '' },
    category: { value: '', isRequired: true, disable: false, readonly: false, validator: 'text', error: '' },
    amount: { value: '', isRequired: true, disable: false, readonly: false, validator: 'text', error: '' },
    description: { value: '', isRequired: false, disable: false, readonly: false, validator: 'text', error: '' },
    invoiceNumber: { value: '', isRequired: false, disable: false, readonly: false, validator: 'text', error: '' },
    date: { value: '', isRequired: true, disable: false, readonly: false, validator: 'date', error: '' },
    employeeID:{value: {} as userList,isRequired: true, disable: false, readonly: false, validator: 'object', error: '' },
    vendor:{ value: '', isRequired: true, disable: false, readonly: false, validator: 'text', error: '' },
  };

  const INITIAL_ADD_TO_PROJECT_FORM_DATA:AddToProjectFormDto={
    project:{ value: {} as ProjectList, isRequired: true, disable: false, readonly: false, validator: 'object', error: '' },
    position: { value: '', isRequired: true, disable: false, readonly: false, validator: 'text', error: '' },
    projectStartedDate: { value: '', isRequired: true, disable: false, readonly: false, validator: 'date', error: '' },
    _id: { value: '', isRequired: true, disable: false, readonly: false, validator: 'text', error: '' },
    email: { value: '', isRequired: true, disable: false, readonly: false, validator: 'text', error: '' },
    employeeID:{value: {} as userList,isRequired: true, disable: false, readonly: false, validator: 'object', error: '' },
    employeeName:{ value: '', isRequired: true, disable: false, readonly: false, validator: 'text', error: '' },
  }
 const  [addToProjectForm,setAddToProjectForm]=useState<AddToProjectFormDto>(INITIAL_ADD_TO_PROJECT_FORM_DATA)
  const [paymentForm, setPaymentForm] = useState<PaymentFormDto>(INITIAL_PAYMENT_FORM_DATA);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [addPaymentModalOpen, setAddPaymentModalOpen] = useState<boolean>(false);
  const [helperText, setHelperText] = useState<boolean>(false);
  const [projectList,setProjectList]=useState<ProjectByUser[]>([])
  const [userData,setUserData]= useState<EmployeePayloadDto>()
  const [isGetassignedProjectsLoading,setIsGetAssignedProjectsLoading]=useState<boolean>(false)
  const [isGetUserDataIsLoading,setIsGetUserDataIsLoading]=useState<boolean>(false)
  const [isGetPaymentDataIsLoading,setIsGetPaymentDataIsLoading]=useState<boolean>(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [selectedPaymentId, setSelectedPaymentId] = useState<string>('');
  const [AllProjectList,setAllProjectList]=useState<ProjectList[]>([])
  const loginState = useSelector((state: RootState) => state.user.login);
  const [isAdmin,setIsAdmin]=useState<boolean>(false)
  useEffect(() => {
    if (id) {
      getPaymentHistoryData();
      getAssignedProjectsByUserID()
      getUserDataByID()
      getALlProjectList()
    }
  }, [id]);

  useEffect(() => {
  
    if (loginState.status === 'success') {
      setIsAdmin(loginState.data.role === 'Admin');
    }
  }, [loginState]);
  
  useEffect(() => {
  if(id&&userData){
    setPaymentForm({
      ...paymentForm,
      vendor:{
        ...paymentForm.vendor,
        value:userData?.name
      },
      employeeID:{
        ...paymentForm.employeeID,
        value:{
          _id:id,
          email:userData.email,
          name:userData.name,
          position:userData.position
        }
      }
    })
   setAADFormData()
  }
  }, [id,userData])
  

  const handleBack = () => {
    navigate(-1);
  };

  const setAADFormData=()=>{
    if(id&&userData){
    setAddToProjectForm({
      ...addToProjectForm,
      employeeID:{
        ...addToProjectForm.employeeID,
        value:{
          _id:id,
          email:userData.email,
          name:userData.name,
          position:userData.position
        }},
        email:{
          ...addToProjectForm.email,
          value:userData.email
        },
        _id:{
          ...addToProjectForm._id,
          value:id
        },
        employeeName:{
          ...addToProjectForm.employeeName,
          value:userData.name
        },
        position:{
          ...addToProjectForm.position,
          value:userData.position
        },
    })
  }
}
  const getALlProjectList=()=>{
    ProjectService.getProjectsList().then((res:any)=>{
      setAllProjectList(res.data.data)
      console.log("resposegetALlProjectList",res.data.data)
    }).catch((err)=>{
      console.log("errr",err)
    })
  }
  const getPaymentHistoryData = () => {
    if (id) {
      setIsGetPaymentDataIsLoading(true)
      UserService.getPaymentHistoryByUserID(id)
        .then((res: any) => {
          setPaymentHistory(res.data.paymentHistory);
          const totalAmount = res.data.paymentHistory.reduce((acc: number, curr: any) => {
            return acc + curr.amount;
          }, 0);
          
          setUserData(prevUserData => {
            if (!prevUserData) {
              // Handle the case where prevUserData is undefined
              return {
                _id: '',
                name: '',
                email: '',
                startDate: '',
                contactNumber: '',
                position: '',
                status: '',
                workLocation: '',
                role: '',
                totalPaidAmount: totalAmount,
              };
            }
          
            return {
              ...prevUserData,
              totalPaidAmount: totalAmount,
            };
          })
          setIsGetPaymentDataIsLoading(false)

        }).catch((err) => {
          setIsGetPaymentDataIsLoading(false)

          console.log("error", err);
        });
    }
  };
const getAssignedProjectsByUserID=()=>{
  if(id){
    setIsGetAssignedProjectsLoading(true)
    UserService.getAssignedProjectsByUserID(id)
    .then((res:any)=>{
      setProjectList(res.data.data)
      console.log(res.data.data);
      setIsGetAssignedProjectsLoading(false)
    })
    .catch((err)=>{
      setIsGetAssignedProjectsLoading(false)
      console.log("error",err);
    })
  }
}

const getUserDataByID=()=>{
  if(id){
    setIsGetUserDataIsLoading(true)
    UserService.getUserDataById(id).then((res:any)=>{
      setUserData(res.data.data)
      console.log("res",res.data.data)
      setIsGetUserDataIsLoading(false)
    }).catch((error)=>{
      setIsGetUserDataIsLoading(false)
      console.log("error",error)
    })

  }
}
  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleClick = (mode: string, paymentId: string) => {
    setMode(mode)
    setSelectedPaymentId(paymentId)
    const isDisabled=mode===SCREEN_MODES.VIEW
    if(mode ===SCREEN_MODES.CREATE){
      setAddPaymentModalOpen(true);
    }
    if (mode === SCREEN_MODES.VIEW ||mode ===SCREEN_MODES.EDIT) {
      const payment:any= paymentHistory.find((item:PaymentHistory)=>item._id===paymentId)
      const projectId=payment?.projectId._id
      const project:any= projectList.find((item:ProjectByUser)=>item._id===projectId)
      setAddPaymentModalOpen(true);
      setPaymentForm({
        ...paymentForm,
        project:{
          ...paymentForm.project,
          value:project,
          disable:isDisabled,
          readonly:isDisabled
        },
        amount:{
          ...paymentForm.amount,
          value:payment.amount,
          disable:isDisabled,
          readonly:isDisabled
        },
        category:{
          ...paymentForm.category,
          value:payment.category,
          disable:isDisabled,
          readonly:isDisabled
        }, 
        date:{
          ...paymentForm.date,
          value:payment.date,
          disable:isDisabled,
          readonly:isDisabled
        },
        description:{
          ...paymentForm.description,
          value:payment.description,
          disable:isDisabled,
          readonly:isDisabled
        },
        employeeID:{
          ...paymentForm.employeeID,
          value:{
            _id:id||'',
            email:userData?.email||'',
            name:userData?.name||'',
            position:userData?.position||''
          },
          disable:isDisabled,
          readonly:isDisabled
        },
        invoiceNumber:{
          ...paymentForm.invoiceNumber,
          value:payment.invoiceNumber,
          disable:isDisabled,
          readonly:isDisabled
        },
        vendor:{
          ...paymentForm.vendor,
          value:userData?.name||'',
          disable:isDisabled,
          readonly:isDisabled
        }
      })
    }
    if(mode === SCREEN_MODES.DELETE){
 
      setIsDeleteModalOpen(true)
    }
  };

  const handleModalOpen = () => {
    setModalOpen(true);

  };

  const handleModalClose = () => {
    setPaymentForm(INITIAL_PAYMENT_FORM_DATA);
    setAddPaymentModalOpen(false);
    setModalOpen(false);
    setAddToProjectForm(INITIAL_ADD_TO_PROJECT_FORM_DATA)
  };

  const handleInputFocus = (property: string) => {
    setPaymentForm({
      ...paymentForm,
      [property]: {
        ...paymentForm[property as keyof typeof paymentForm],
        error: "",
      },
    });
  };

  const onInputHandleChange = (property: string, value: any | number) => {
    console.log("property",property,"value",value)
        setPaymentForm({
          ...paymentForm,
          [property]: {
            ...paymentForm[property as keyof typeof paymentForm],
            value: value,
            error: "",
          },
        });
  };

  const onSave = async () => {
    setHelperText(true);
    const [validateData, isValid] = await validateFormData(paymentForm);
    setPaymentForm(validateData);
    console.log("validateData",validateData)
    if (isValid) {
      setIsLoading(true);
      if(mode===SCREEN_MODES.CREATE){
      const expensePayload:ExpensePayload={
        amount:paymentForm.amount.value,
        vendor:paymentForm.vendor.value,
        date:paymentForm.date.value,
        description:paymentForm.description.value,
        category:paymentForm.category.value,
        employeeID:paymentForm.employeeID.value as userList,
      }
      ProjectService.createExpenseDetailByProjectId(paymentForm.project.value._id,expensePayload).then((res:any)=>{
        getPaymentHistoryData();
        getAssignedProjectsByUserID()
        showSuccessToast("Expense Added Successfully")
        setAddPaymentModalOpen(false)
        setIsLoading(false);
      }).catch((err)=>{
        setAddPaymentModalOpen(false)
        showErrorToast(err)
        setIsLoading(false);
        console.log(err)
      })
     }else if(mode===SCREEN_MODES.EDIT){
      const payment:any= paymentHistory.find((item:PaymentHistory)=>item._id===selectedPaymentId)
      const expensePayload:ExpensePayload={
        _id:payment.expenseId,
        amount:paymentForm.amount.value,
        vendor:paymentForm.vendor.value,
        date:paymentForm.date.value,
        description:paymentForm.description.value,
        category:paymentForm.category.value,
        employeeID:paymentForm.employeeID.value as userList,
        invoiceNumber:paymentForm.invoiceNumber.value
      }
      ProjectService.updateExpenseDetailByProjectId(paymentForm.project.value._id,payment.expenseId,expensePayload).then((res:any)=>{
        getPaymentHistoryData();
        getAssignedProjectsByUserID()
        showSuccessToast("Expense Updated Successfully")
        handleModalClose()
        setIsLoading(false);
      }).catch((err)=>{
        setIsLoading(false);
        showErrorToast(err)
        console.log(err)
      })
    

     }
    
    }
  };

  const handleFilterDrawerOpen=()=>{

  }

  const handleClearFilters=()=>{
    
  }

  const handleDeleteAction = (confirm: boolean) => {
    if (confirm && selectedPaymentId) {
    const payment= paymentHistory.find((item:PaymentHistory)=>item._id===selectedPaymentId)
    const projectId=payment?.projectId._id
    const expenseId=payment?.expenseId
    if(projectId&&expenseId){
      setIsLoading(true);
      ProjectService.deleteExpenseDetailByProjectId(projectId,expenseId).then((res:any)=>{
        console.log("delete expense",res.data.data)
        showSuccessToast("Expense Deleted Successfully")
        setIsDeleteModalOpen(false)
        getPaymentHistoryData();
        getAssignedProjectsByUserID()
        setPaymentForm(INITIAL_PAYMENT_FORM_DATA)
        setIsLoading(false);
      }).catch((err)=>{
        showErrorToast(err)
        setIsLoading(false);
        console.log(err)
        setIsDeleteModalOpen(false)
      })
    }
    }
  };

  const addToProjectHandleInputChange=(property:string,value:any)=>{
    setAddToProjectForm({
      ...addToProjectForm,
      [property]:{
        ...addToProjectForm[property as keyof typeof addToProjectForm],
        value:value
      }
    })
  }
  const addToProjectHandleFocus=(property:string)=>{
    setAddToProjectForm({
      ...addToProjectForm,
      [property]:{
        ...addToProjectForm[property as keyof typeof addToProjectForm],
        error:''
      }
    })
  }

  const handleAddToProjectSave=async ()=>{
    setHelperText(true);
    const [validateData, isValid] = await validateFormData(addToProjectForm);
    setAddToProjectForm(validateData);
    console.log("first",validateData)
    if(isValid){
      setIsLoading(true);
      const employeePayload:EmployeePayload={
        employeeID:addToProjectForm.employeeID.value,
        employeeName:addToProjectForm.employeeName.value,
        email:addToProjectForm.email.value,
        position:addToProjectForm.position.value,
        projectStartedDate:addToProjectForm.projectStartedDate.value
      }
      ProjectService.createEmployeeDetailByProjectId(addToProjectForm.project.value._id,employeePayload).then((res:any)=>{
       
        showSuccessToast("Employee Added Successfully")
        getAssignedProjectsByUserID()
        handleModalClose()
        setIsLoading(false);
      }).catch((err)=>{
        showErrorToast(err)
        console.log(err)   
        setIsLoading(false);
        handleModalClose()
      })
    }

  }
  const oncloseAddProjectModal=()=>{
    setModalOpen(false)
    setAddToProjectForm(INITIAL_ADD_TO_PROJECT_FORM_DATA)
    setAADFormData()
  }
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
          {userData?.name}
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            sx={{
              backgroundColor:userData?.status === 'Active' ? '#F0FAF0' : '#FFF2F0',
              borderRadius: "5px",
              padding: "2px 8px",
            }}
          >
            <Box
              sx={{
                backgroundColor: userData?.status === 'Active' ? '#2D8A39' : '#E2341D', // Conditional color
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                marginRight: '0.5rem',
              }}
            ></Box>
            <Typography sx={{ color: userData?.status === 'Active' ? '#2D8A39' : '#E2341D', fontWeight: '600' }}>
              {userData?.status}
            </Typography>
          </Box>
        </Box>
      </Box>
      {isGetUserDataIsLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '10rem' }}>
          <CircularProgress />
        </Box>
      ) : (
        <EmployeeDetailsBox userData={userData} />
      )}

      <Box p={2} sx={{ border: "1px solid #E0E0E0", borderRadius: "8px", minHeight: "8rem" }}>
  <Box sx={{ justifyContent: "space-between", display: "flex" }}>
    <Typography sx={{ fontWeight: "600", fontSize: "20px", marginBottom: "1rem" }}>
      Projects {projectList.length}
    </Typography>
   {isAdmin && <CustomButton sx={{ backgroundColor: "#437EF7", color: "white", height: "2.5rem", textTransform: "capitalize" }}  loading={isLoading} onClick={handleModalOpen}>
      Add to Project
    </CustomButton>
    }
  </Box>

  {isGetassignedProjectsLoading ? (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '4rem' }}>
      <CircularProgress />
    </Box>
  ) : (
    projectList.length === 0 ? (
      <Typography sx={{ color: "#999", textAlign: "center", marginTop: "2rem" }}>
        No projects assigned
      </Typography>
    ) : (
      <Grid container spacing={3}>
        {projectList.map((project, index) => (
          <Grid item xs={12} md={6} xl={4} key={index}>
            <ProjectMiniCard
              key={project._id}
              projectName={project.projectName}
              role={project.position}
              date={project.projectStartedDate}
            />
          </Grid>
        ))}
      </Grid>
    )
  )}
</Box>


      <Box className={styles.tabBox}>
        <Tabs defaultValue={0} orientation="horizontal">
          <TabsList>
            <Tab>Payment History</Tab>
          </TabsList>
          <TabPanel value={0}>
            <PaymentHistoryTable
              isAdmin={isAdmin}
              isLoading={isGetPaymentDataIsLoading}
              paymentHistory={paymentHistory}
              page={page}
              rowsPerPage={rowsPerPage}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}        
              handleClick={handleClick}
            />
          </TabPanel>
        </Tabs>
      </Box>

      <AddPaymentModal
      isLoading={isLoading}
        categories={CategoryTypes}
        handleInputFocus={handleInputFocus}
        mode={mode}
        open={addPaymentModalOpen}
        onClose={handleModalClose}
        onSave={onSave}
        onInputHandleChange={onInputHandleChange}
        paymentForm={paymentForm}
        helperText={helperText} 
        projects={projectList}      />
        <DeleteConfirmationModal
        isLoading={isLoading}
          handleDeleteAction={handleDeleteAction}
          text={"Payment"}
          onClose={() => setIsDeleteModalOpen(false)}
          open={isDeleteModalOpen}
        />

       < AddToProjectModal
       isLoading={isLoading}
       helperText={helperText}
        open={modalOpen}
        onClose={() => oncloseAddProjectModal()}
        onSave={handleAddToProjectSave}
        projectList={AllProjectList}
        addToProjectForm={addToProjectForm}
        handleInputFocus={addToProjectHandleFocus}
        handleInputChange={addToProjectHandleInputChange}
       />
    </Box>
    
  );
};

export default EmployeeView;

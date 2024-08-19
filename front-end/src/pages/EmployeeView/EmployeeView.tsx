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
import { PaymentHistory, PaymentFormDto, ProjectByUser, EmployeePayloadDto, ExpensePayload, userList } from '../../utilities/models';
import AddPaymentModal from '../../components/AddPaymentModal/AddPaymentModal';
import { validateFormData } from '../../utilities/helpers';
import { showSuccessToast, showErrorToast } from '../../utilities/helpers/alert';
import { CategoryTypes, SCREEN_MODES } from '../../utilities/constants/app.constants';
import { ProjectService } from '../../services/project.service';

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

  const [paymentForm, setPaymentForm] = useState<PaymentFormDto>(INITIAL_PAYMENT_FORM_DATA);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [addPaymentModalOpen, setAddPaymentModalOpen] = useState<boolean>(false);
  const [helperText, setHelperText] = useState<boolean>(false);
  const [projectList,setProjectList]=useState<ProjectByUser[]>([])
  const [userData,setUserData]= useState<EmployeePayloadDto>()
  const [isGetassignedProjectsLoading,setIsGetAssignedProjectsLoading]=useState<boolean>(false)
  const [isGetUserDataIsLoading,setIsGetUserDataIsLoading]=useState<boolean>(false)
  const [isGetPaymentDataIsLoading,setIsGetPaymentDataIsLoading]=useState<boolean>(false)
  useEffect(() => {
    if (id) {
      getPaymentHistoryData();
      getAssignedProjectsByUserID()
      getUserDataByID()
    }
  }, [id]);


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
  }
  }, [id,userData])
  

  const handleBack = () => {
    navigate(-1);
  };
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

  const handleClick = (mode: string, id: string) => {
    if(mode ===SCREEN_MODES.CREATE){
      setAddPaymentModalOpen(true);
    }
    if (mode === 'VIEW') {
      // Implement view functionality
    } else if (mode === 'EDIT') {
      // Implement edit functionality
    }
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setPaymentForm(INITIAL_PAYMENT_FORM_DATA);
    setAddPaymentModalOpen(false);
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

      }).catch((err)=>{
        setAddPaymentModalOpen(false)
        showErrorToast(err)
        console.log(err)
      })
    }
      // Implement the save functionality here
      // Assuming you have a PaymentService to save the payment details

      // Example:
      // PaymentService.savePayment(paymentForm).then((res: any) => {
      //   getPaymentHistoryData();
      //   handleModalClose();
      //   showSuccessToast(res.data.message);
      //   setIsLoading(false);
      // }).catch((error: any) => {
      //   console.log(error);
      //   showErrorToast(error);
      //   setIsLoading(false);
      // });
    }
  };

  const handleFilterDrawerOpen=()=>{

  }

  const handleClearFilters=()=>{
    
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
        <Box>
          <CustomButton
            sx={{ backgroundColor: "#437EF7", color: "white", height: "2.5rem", textTransform: "capitalize" }}
            onClick={handleModalOpen}
          >
            Edit Employee
          </CustomButton>
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
    <CustomButton
      sx={{ backgroundColor: "#437EF7", color: "white", height: "2.5rem", textTransform: "capitalize" }}
    >
      Add to Project
    </CustomButton>
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
              isLoading={isGetPaymentDataIsLoading}
              paymentHistory={paymentHistory}
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

      <AddPaymentModal
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
    </Box>
  );
};

export default EmployeeView;

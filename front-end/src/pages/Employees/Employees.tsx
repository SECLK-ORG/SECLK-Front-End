import React, { useEffect, useState } from 'react';
import { CreateEmployeeModal,  InfoCard } from '../../components';
import EmojiObjectsOutlinedIcon from '@mui/icons-material/EmojiObjectsOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import PauseCircleOutlineOutlinedIcon from '@mui/icons-material/PauseCircleOutlineOutlined';
import { Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EmployeeTable from '../../components/EmployeeTable/EmployeeTable';
import FilterDrawerCategory from '../../components/FilterDrawer/FilterDrawerCategory';
import { SCREEN_MODES } from '../../utilities/constants/app.constants';
import { createEmployeeFormDto, Employee, EmployeePayloadDto, FilterMap, Positions } from '../../utilities/models';
import { UserService } from '../../services/user.service';
import {  showErrorToast, showSuccessToast } from '../../utilities/helpers/alert';
import DeleteConfirmationModal from '../../components/shared/DeleteConfirmationModal/DeleteConfirmationModal';
import { CustomButton } from '../../assets/theme/theme';
import { validateFormData } from '../../utilities/helpers';
import { PositionService } from '../../services/position.service';

const Employees: React.FC = () => {

  const EMPLOYEE_FORM_INITIAL_STATE: createEmployeeFormDto = {
    _id: { value: "", isRequired: false, disable: false, readonly: false, validator: "text", error: "", },
    contactNumber: { value: "", isRequired: true, disable: false, readonly: false, validator: "mobile", error: "", },
    email: { value: "", isRequired: true, disable: false, readonly: false, validator: "email", error: "", },
    position: { value: "", isRequired: true, disable: false, readonly: false, validator: "text", error: "", },
    name: { value: "", isRequired: true, disable: false, readonly: false, validator: "text", error: "", },
    startDate: { value: "", isRequired: true, disable: false, readonly: false, validator: "text", error: "", },
    status: { value: "Active", isRequired: true, disable: false, readonly: false, validator: "text", error: "", },
    role: { value: "User", isRequired: true, disable: false, readonly: false, validator: "text", error: "", },
    workLocation: { value: "", isRequired: true, disable: false, readonly: false, validator: "text", error: "", },
  };

  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFiltered, setIsFiltered] = useState<boolean>(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [employeeForm, setEmployeeForm] = useState<createEmployeeFormDto>(EMPLOYEE_FORM_INITIAL_STATE);
  const [categories, setCategories] = useState<FilterMap[]>([]);
  const [statuses, setStatuses] = useState<FilterMap[]>([]);
  const [helperText, setHelperText] = useState(false);
  const [id, setId] = useState<string>('');
  const [mode, setMode] = useState<string>('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [positions, setPositions] = useState<Positions[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    getAllEmployees();
    fetchFilters();
  }, []);

  useEffect(() => {
    if (isFiltered) {
      handleStatusORCategoryChange();
    }
  }, [statuses, categories, isFiltered]);

  const getAllEmployees = async () => {
    try {
      setIsLoading(true);
      const employeesRes: any = await UserService.getAllUsers();
      if (employeesRes) {
        setEmployees(employeesRes.data.data);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("getAllEmployees error", error);
    }
  };

  const fetchFilters = async () => {
    try {
      const response:any = await PositionService.getPositions();
      if(response.data.data){
       const positions:any[] =response.data.data.map((positions: any) => ({
        ...positions,
        name: positions.positions,
        isSelect: false
      }));
       setCategories(positions)
      }
      setPositions(response.data.data);
      const employeeStatuses: FilterMap[] = [
            { _id: 'active', name: 'Active', isSelect: false },
            { _id: 'inactive', name: 'Inactive', isSelect: false }
          ];
          setStatuses(employeeStatuses);
    } catch (error) {
      console.error('Error fetching positions:', error);
    }
  };

  const handleStatusORCategoryChange = () => {
    const selectedStatuses = statuses.filter(status => status.isSelect);
    const selectedCategories = categories.filter(category => category.isSelect);
    let updated = employees;

    if (selectedStatuses.length > 0) {
      updated = updated.filter(employee =>
        selectedStatuses.some(status => status.name === employee.status)
      );
    }

    if (selectedCategories.length > 0) {
      updated = updated.filter(employee =>
        selectedCategories.some(category => category.name === employee.position)
      );
    }

    setEmployees(updated);
  };

  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleFilterDrawerOpen = () => {
    setFilterDrawerOpen(true);
    if (isFiltered) {
      handleClearFilters();
    }
  };

  const handleFilterDrawerClose = (save: boolean) => {
    setFilterDrawerOpen(false);
    if (save) {
      setIsFiltered(true);
    }
    if (!save) {
      handleClearFilters();
    }
  };

  const handleCategoryChange = (id: string) => {
    const updatedCategories = categories.map(category => {
      if (category._id === id) {
        return { ...category, isSelect: !category.isSelect };
      }
      return category;
    });
    setCategories(updatedCategories);
  };

  const handleStatusChange = (id: string) => {
    const updatedStatuses = statuses.map(status => {
      if (status._id === id) {
        return { ...status, isSelect: !status.isSelect };
      }
      return status;
    });
    setStatuses(updatedStatuses);
  };

  const handleClearFilters = () => {
    setIsFiltered(false);
    setStatuses(statuses.map(status => ({ ...status, isSelect: false })));
    setCategories(categories.map(category => ({ ...category, isSelect: false })));
    getAllEmployees();
  };

  const handleTableAction = (mode: string, id: string) => {
    setMode(mode);
    setId(id);
    if (SCREEN_MODES.VIEW === mode) {
      navigate(`/employees/${id}`);
    }
    if (SCREEN_MODES.DELETE === mode) {
      setIsDeleteModalOpen(true);
    }
    if (SCREEN_MODES.EDIT === mode) {
      const employee: Employee | undefined = employees.find(emp => emp._id === id);
      if (employee) {
        setEmployeeForm({
          ...employeeForm,
          _id: { ...employeeForm._id, value: employee._id },
          name: { ...employeeForm.name, value: employee.name },
          email: { ...employeeForm.email, value: employee.email },
          contactNumber: { ...employeeForm.contactNumber, value: employee.contactNumber },
          position: { ...employeeForm.position, value: employee.position },
          startDate: { ...employeeForm.startDate, value: employee.startDate },
          status: { ...employeeForm.status, value: employee.status },
          workLocation:{...employeeForm.workLocation,value:employee.workLocation},
          role:{...employeeForm.role,value:employee?.role}
        });
        setModalOpen(true);
      }
    }
  };

  const handleModalOpen = () => {
    setMode(SCREEN_MODES.CREATE);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setEmployeeForm(EMPLOYEE_FORM_INITIAL_STATE);
    setModalOpen(false);
  };

  const handleDeleteAction = async (confirm: boolean, property: string) => {
    if (confirm) {
      try {
        await UserService.deleteEmployee(id);  
        await getAllEmployees();
        setIsDeleteModalOpen(false);
        showSuccessToast('Employee deleted successfully');
      } catch (error:any) {
        showErrorToast(error||'Failed to delete employee');
        console.error(error);
      }
    } else {
      setIsDeleteModalOpen(false);
    }
  };

  const onInputHandleChange = (property: string, value: string) => {
    setEmployeeForm({
      ...employeeForm,
      [property]: {
        ...employeeForm[property as keyof typeof employeeForm],
        value: value,
        error: "",
      },
    });
  };

  const handleInputFocus = (property: string) => {
    setEmployeeForm({
      ...employeeForm,
      [property]: {
        ...employeeForm[property as keyof typeof employeeForm],
        error: "",
      },
    });
  };

  const onSave = async () => {
    setHelperText(true);
    const [validateData, isValid] = await validateFormData(employeeForm);
    setEmployeeForm(validateData);
    if (isValid) {
      setIsLoading(true);
      try {
        if (mode === SCREEN_MODES.CREATE) {
          const payload:EmployeePayloadDto={
            name: employeeForm.name.value,
            email: employeeForm.email.value,
            contactNumber: employeeForm.contactNumber.value,
            position: employeeForm.position.value,
            startDate: employeeForm.startDate.value,
            status: employeeForm.status.value,
            role: employeeForm.role.value,
            workLocation: employeeForm.workLocation.value
          }
          console.log("payload",payload)
          await UserService.createUser(payload);  // Replace with actual service call
          showSuccessToast('Employee created successfully');
        } else if (mode === SCREEN_MODES.EDIT) {
          const payload:EmployeePayloadDto={
            _id: employeeForm._id.value,
            name: employeeForm.name.value,
            email: employeeForm.email.value,
            contactNumber: employeeForm.contactNumber.value,
            position: employeeForm.position.value,
            startDate: employeeForm.startDate.value,
            status: employeeForm.status.value,
            role: employeeForm.role.value,
            workLocation: employeeForm.workLocation.value
          }
          await UserService.updateEmployeeDetail(payload);  // Replace with actual service call
          showSuccessToast('Employee updated successfully');
        }
        await getAllEmployees();
        setModalOpen(false);
      } catch (error) {
        showErrorToast('Failed to save employee');
        console.error(error);
      }
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: "30px" }}>
        <Typography sx={{ fontWeight: "700", fontSize: "30px" }}>Employees</Typography>
        <CustomButton
          size="large"
          onClick={handleModalOpen}
        >
          Create Employee
        </CustomButton>
      </div>
      <div>
        <Grid container spacing={2} sx={{ justifyContent: "space-evenly", paddingInline: "30px" }}>
          <Grid item xs={12} sm={12} md={6} xl={4} lg={4}>
            <InfoCard title="Total Employees" value={employees.length} icon={EmojiObjectsOutlinedIcon} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} xl={4} lg={4}>
            <InfoCard title="Active Employees" value={employees.filter(e => e.status === 'Active').length} icon={WorkOutlineOutlinedIcon} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} xl={4} lg={4}>
            <InfoCard title="Inactive Employees" value={employees.filter(e => e.status === 'Inactive').length} icon={PauseCircleOutlineOutlinedIcon} />
          </Grid>
        </Grid>
      </div>

      <EmployeeTable
        isLoading={isLoading}
        page={page}
        employees={employees}
        rowsPerPage={rowsPerPage}
        isFiltered={isFiltered}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        onFilterDrawerOpen={handleFilterDrawerOpen}
        onClearFilters={handleClearFilters}
        handleClick={handleTableAction}
      />

      <FilterDrawerCategory
        type="Position"
        filterDrawerOpen={filterDrawerOpen}
        onFilterDrawerClose={handleFilterDrawerClose}
        onCategoryChange={handleCategoryChange}
        onStatusChange={handleStatusChange}
        categories={categories}
        statuses={statuses}
      />

      <CreateEmployeeModal
      positions={positions}
        open={modalOpen}
        mode={mode}
        onSave={onSave}
        onClose={handleModalClose}
        employeeForm={employeeForm}
        handleInputFocus={handleInputFocus}
        onInputHandleChange={onInputHandleChange}
        helperText={helperText}
      />

      <DeleteConfirmationModal
        handleDeleteAction={handleDeleteAction}
        text={"Employee"}
        onClose={() => setIsDeleteModalOpen(false)}
        open={isDeleteModalOpen}
      />
    </div>
  );
};

export default Employees;

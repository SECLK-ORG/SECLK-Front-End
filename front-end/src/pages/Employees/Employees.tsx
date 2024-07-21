import React, { useEffect, useState } from 'react';
import { CreateEmployeeModal, CustomButton, InfoCard } from '../../components';
import EmojiObjectsOutlinedIcon from '@mui/icons-material/EmojiObjectsOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import PauseCircleOutlineOutlinedIcon from '@mui/icons-material/PauseCircleOutlineOutlined';
import { Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EmployeeTable from '../../components/EmployeeTable/EmployeeTable';
import FilterDrawerCategory from '../../components/FilterDrawer/FilterDrawerCategory';
import { SCREEN_MODES } from '../../utilities/constants/app.constants';

const Employees = () => {
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [positionFilters, setPositionFilters] = useState<{ [key: string]: boolean }>({
    'Software Engineer': false,
    'UX Engineer': false,
    'QA Engineer': false,
  });
  const [statusFilters, setStatusFilters] = useState<{ [key: string]: boolean }>({
    Active: false,
    Inactive: false,
  });
  const [isFiltered, setIsFiltered] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsFiltered(
      Object.values(positionFilters).some(filter => filter) ||
      Object.values(statusFilters).some(filter => filter)
    );
  }, [positionFilters, statusFilters]);

  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleFilterDrawerOpen = () => {
    setFilterDrawerOpen(true);
  };

  const handleFilterDrawerClose = (save: boolean) => {
    setFilterDrawerOpen(false);
    if (!save) {
      setPositionFilters({
        'Software Engineer': false,
        'UX Engineer': false,
        'QA Engineer': false,
      });
      setStatusFilters({
        Active: false,
        Inactive: false,
      });
    }
  };

  const handlePositionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPositionFilters({
      ...positionFilters,
      [event.target.name]: event.target.checked,
    });
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatusFilters({
      ...statusFilters,
      [event.target.name]: event.target.checked,
    });
  };

  const handleClearFilters = () => {
    setPositionFilters({
      'Software Engineer': false,
      'UX Engineer': false,
      'QA Engineer': false,
    });
    setStatusFilters({
      Active: false,
      Inactive: false,
    });
  };

  const handleClick = (mode: string, id: string) => {
    if (SCREEN_MODES.VIEW === mode) {
      navigate(`/employees/${id}`);
    }
    console.log(mode, id);
  };
  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: "30px" }}>
        <Typography sx={{ fontWeight: "700", fontSize: "30px" }}>Employees</Typography>
        <CustomButton
          text="Create Employee"
          size="large"
          backgroundColor="#437EF7"
          color="white"
          height="2.5rem"
          textTransform="capitalize"
          onClick={() => {
            handleModalOpen()
          }}
        />
      </div>
      <div>
        <Grid container spacing={2} sx={{ justifyContent: "space-evenly", paddingInline: "30px" }}>
          <Grid item xs={12} sm={12} md={6} xl={4} lg={4}>
            <InfoCard title="Total Employees" value={12} icon={EmojiObjectsOutlinedIcon} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} xl={4} lg={4}>
            <InfoCard title="Active Employees" value={4} icon={WorkOutlineOutlinedIcon} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} xl={4} lg={4}>
            <InfoCard title="Inactive Employees" value={5} icon={PauseCircleOutlineOutlinedIcon} />
          </Grid>
        </Grid>
      </div>

      <EmployeeTable
        page={page}
        rowsPerPage={rowsPerPage}
        categoryFilters={positionFilters}
        statusFilters={statusFilters}
        isFiltered={isFiltered}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        onFilterDrawerOpen={handleFilterDrawerOpen}
        onClearFilters={handleClearFilters}
        handleClick={handleClick}
      />

      <FilterDrawerCategory
        type="Position"
        filterDrawerOpen={filterDrawerOpen}
        categoryFilters={positionFilters}
        statusFilters={statusFilters}
        onFilterDrawerClose={handleFilterDrawerClose}
        onCategoryChange={handlePositionChange}
        onStatusChange={handleStatusChange}
        categories={["Software Engineer", "UX Engineer", "QA Engineer"]}
        statuses={["Active", "Inactive"]}
      />
      <CreateEmployeeModal open={modalOpen} onClose={handleModalClose} />
    </div>
  );
};

export default Employees;

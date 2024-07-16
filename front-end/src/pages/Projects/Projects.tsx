import React, { useState, useEffect } from 'react';
import ProjectTable from '../../components/ProjectTable/ProjectTable';
import FilterDrawerCategory from '../../components/FilterDrawer/FilterDrawerCategory';
import { CustomButton, InfoCard } from '../../components';
import EmojiObjectsOutlinedIcon from '@mui/icons-material/EmojiObjectsOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import PauseCircleOutlineOutlinedIcon from '@mui/icons-material/PauseCircleOutlineOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import { Button, Grid, Typography } from '@mui/material';
const Projects: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState<boolean>(false);
  const [categoryFilters, setCategoryFilters] = useState<{ [key: string]: boolean }>({
    US: false,
    UK: false,
    Local: false,
    Fiverr: false,
  });
  const [statusFilters, setStatusFilters] = useState<{ [key: string]: boolean }>({
    Active: false,
    Inactive: false,
  });
  const [isFiltered, setIsFiltered] = useState<boolean>(false);

  useEffect(() => {
    setIsFiltered(
      Object.values(categoryFilters).some(filter => filter) ||
      Object.values(statusFilters).some(filter => filter)
    );
  }, [categoryFilters, statusFilters]);

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
      setCategoryFilters({
        US: false,
        UK: false,
        Local: false,
        Fiverr: false,
      });
      setStatusFilters({
        Active: false,
        Inactive: false,
      });
    }
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryFilters({
      ...categoryFilters,
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
    setCategoryFilters({
      US: false,
      UK: false,
      Local: false,
      Fiverr: false,
    });
    setStatusFilters({
      Active: false,
      Inactive: false,
    });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between',padding:"30px"}}>
        <Typography sx={{fontWeight:"700",fontSize:"30px"}}>Projects</Typography>
        <CustomButton
        text="Create Project"
        size="large"
        backgroundColor="#437EF7"
        color="white"
        height="2.5rem"
        textTransform="capitalize"
        onClick={() => {
          console.log('Button clicked');
        }}
      />

      </div>
      <div>
      <Grid container spacing={2} sx={{justifyContent:"space-evenly",paddingInline:"30px" }}>
        <Grid item xs={12} sm={12} md={6}  xl={3} lg={5} >
          <InfoCard title="Total Projects" value={12} icon={EmojiObjectsOutlinedIcon } />
        </Grid>
        <Grid item xs={12} sm={12} md={6} xl={3} lg={5}>
          <InfoCard title="Active Projects" value={4} icon={WorkOutlineOutlinedIcon} />
        </Grid>
        <Grid item xs={12} sm={12} md={6} xl={3} lg={5}>
          <InfoCard title="Projects On-hold" value={5} icon={PauseCircleOutlineOutlinedIcon} />
        </Grid>
        <Grid item xs={12} sm={12} md={6} xl={3} lg={5}>
          <InfoCard title="Inactive Projects" value={1} icon={BlockOutlinedIcon} />
        </Grid>
      </Grid>
      </div>
      <ProjectTable
        page={page}
        rowsPerPage={rowsPerPage}
        categoryFilters={categoryFilters}
        statusFilters={statusFilters}
        isFiltered={isFiltered}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        onFilterDrawerOpen={handleFilterDrawerOpen}
        onClearFilters={handleClearFilters}
      />
      <FilterDrawerCategory
        filterDrawerOpen={filterDrawerOpen}
        categoryFilters={categoryFilters}
        statusFilters={statusFilters}
        onFilterDrawerClose={handleFilterDrawerClose}
        onCategoryChange={handleCategoryChange}
        onStatusChange={handleStatusChange}
        categories={["US", "UK", "Local", "Fiverr"]}
        statuses={["Active", "Inactive"]}
      />
    </div>
  );
};

export default Projects;

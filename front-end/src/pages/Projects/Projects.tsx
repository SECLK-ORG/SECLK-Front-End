import React, { useState, useEffect } from 'react';
import ProjectTable from '../../components/ProjectTable/ProjectTable';
import FilterDrawerCategory from '../../components/FilterDrawer/FilterDrawerCategory';
import { CreateProjectModal, InfoCard } from '../../components';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import PauseCircleOutlineOutlinedIcon from '@mui/icons-material/PauseCircleOutlineOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RunningWithErrorsIcon from '@mui/icons-material/RunningWithErrors';
import {  Grid, Typography } from '@mui/material';
import { SCREEN_MODES } from '../../utilities/constants/app.constants';
import { useNavigate } from 'react-router-dom';
import { CustomButton } from '../../assets/theme/theme';
import { Project, ProjectStatusDto } from '../../utilities/models';
import { ProjectService } from '../../services/project.service';
const Projects: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
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
  const navigate=useNavigate();
  useEffect(() => {
    setIsFiltered(
      Object.values(categoryFilters).some(filter => filter) ||
      Object.values(statusFilters).some(filter => filter)
    );
  }, [categoryFilters, statusFilters]);


//ProjectService
    const[projects,setProjects]=useState<Project[]>([]);
    const[projectCount,setProjectCount]=useState<ProjectStatusDto>();

    useEffect(()=>{
     gerProjects();
    },[])

    const gerProjects=async()=>{
       ProjectService.getProjects().then((res:any)=>{
        setProjects(res.data.data);
       }).catch((err)=>{
          console.log(err);
       })
       ProjectService.getProjectCountByStatus().then((res:any)=>{
        setProjectCount(res.data.data);
       }).catch((err)=>{
          console.log(err);
       })
       
      
    }


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

  const handleClick = (mode:string,id: string) => {
    if(SCREEN_MODES.VIEW === mode){
      console.log('View clicked');
      navigate(`/projects/${id}`);
    }

  
console.log(mode,id)
  }

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between',padding:"30px"}}>
        <Typography sx={{fontWeight:"700",fontSize:"30px"}}>Projects</Typography>
        <CustomButton
        size="large"
        onClick={() => {
          handleModalOpen();
        }}
      >
        Create Project
        </CustomButton>

      </div>
      <div>
      <Grid container spacing={2} sx={{ justifyContent: "space-evenly", paddingInline: "30px" }}>
      <Grid item xs={12} sm={12} md={6} xl={3} lg={6}>
        <InfoCard title="Total Projects" value={projectCount?.total || 0} icon={LibraryBooksOutlinedIcon} />
      </Grid>
      <Grid item xs={12} sm={12} md={6} xl={3} lg={6}>
        <InfoCard title="In Progress Projects" value={projectCount?.['In Progress'] || 0} icon={RunningWithErrorsIcon} />
      </Grid>
      <Grid item xs={12} sm={12} md={6} xl={3} lg={6}>
        <InfoCard title="On-hold Projects" value={projectCount?.['On Hold'] || 0} icon={PauseCircleOutlineOutlinedIcon} />
      </Grid>
      <Grid item xs={12} sm={12} md={6} xl={3} lg={6}>
        <InfoCard title="Completed Projects" value={projectCount?.Completed || 0} icon={CheckCircleOutlineIcon} />
      </Grid>
    </Grid>
      </div>
      <ProjectTable
        projects={projects}
        page={page}
        rowsPerPage={rowsPerPage}
        categoryFilters={categoryFilters}
        statusFilters={statusFilters}
        isFiltered={isFiltered}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        onFilterDrawerOpen={handleFilterDrawerOpen}
        onClearFilters={handleClearFilters}
        handleClick={handleClick}
      />
      <FilterDrawerCategory
        type='Category'
        filterDrawerOpen={filterDrawerOpen}
        categoryFilters={categoryFilters}
        statusFilters={statusFilters}
        onFilterDrawerClose={handleFilterDrawerClose}
        onCategoryChange={handleCategoryChange}
        onStatusChange={handleStatusChange}
        categories={["US", "UK", "Local", "Fiverr"]}
        statuses={["Active", "Inactive"]}
      />
        <CreateProjectModal open={modalOpen} onClose={handleModalClose}
        //  categories={["US", "UK", "Local", "Fiverr"]}
        //  statuses={["Active", "Inactive"]}
        
        />
    </div>
  );
};

export default Projects;

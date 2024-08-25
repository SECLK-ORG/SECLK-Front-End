import React, { useState, useEffect } from 'react';
import ProjectTable from '../../components/ProjectTable/ProjectTable';
import FilterDrawerCategory from '../../components/FilterDrawer/FilterDrawerCategory';
import { CreateProjectModal, InfoCard } from '../../components';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import PauseCircleOutlineOutlinedIcon from '@mui/icons-material/PauseCircleOutlineOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RunningWithErrorsIcon from '@mui/icons-material/RunningWithErrors';
import { Grid, Typography } from '@mui/material';
import { PROJECT_STATUS, PROJECT_STATUSType, SCREEN_MODES } from '../../utilities/constants/app.constants';
import { useNavigate } from 'react-router-dom';
import { CustomButton } from '../../assets/theme/theme';
import { createProjectDto, FilterMap, loginUserData, Project, ProjectFormDto, ProjectStatusDto } from '../../utilities/models';
import { ProjectService } from '../../services/project.service';
import { CategoryService } from '../../services/category.service';
import DeleteConfirmationModal from '../../components/shared/DeleteConfirmationModal/DeleteConfirmationModal';
import { showErrorToast, showSuccessToast } from '../../utilities/helpers/alert';
import { validateFormData } from '../../utilities/helpers';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';


const Projects: React.FC = () => {

  const INITIAL_PROJECT_FORM_DATA: ProjectFormDto= {
    clientContactNumber:{ value: 0, isRequired: true, disable: false, readonly: false, validator: "mobile", error: "" },
    _id: { value: "", isRequired: false, disable: false, readonly: false, validator: "text", error: "", },
    clientEmail: { value: "", isRequired: true, disable: false, readonly: false, validator: "email", error: "", },
    projectName: { value: "", isRequired: true, disable: false, readonly: false, validator: "text", error: "", },
    startDate: { value: "", isRequired: true, disable: false, readonly: false, validator: "date", error: "", },
    endDate: { value: "", isRequired: true, disable: false, readonly: false, validator: "date", error: "", },
    status: { value: "", isRequired: true, disable: false, readonly: false, validator: "text", error: "", },
    createdBy: { value: "", isRequired: true, disable: false, readonly: false, validator: "text", error: "", },
    category: { value: "", isRequired: true, disable: false, readonly: false, validator: "text", error: "", },
  }
  const loginState = useSelector((state: RootState) => state.user.login);

  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState<boolean>(false);
  const [isFiltered, setIsFiltered] = useState<boolean>(false);

  const [categories, setCategories] = useState<FilterMap[]>([]);
  const [statuses, setStatuses] = useState<FilterMap[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectCount, setProjectCount] = useState<ProjectStatusDto>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAdmin,setIsAdmin]=useState<boolean>(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const [id, setId] = useState<string>('');
  const [mode, setMode] = useState<string>('');
  const [projectForm, setProjectForm] = useState<ProjectFormDto>(INITIAL_PROJECT_FORM_DATA);
  const [helperText, setHelperText] = useState(false);
  
  useEffect(() => {
if(loginState.status === 'success'){
  setProjectForm({...projectForm,createdBy:{...projectForm.createdBy,value:loginState.data.userId}})
  setIsAdmin(loginState.data.role==='Admin'?true:false)
}
}, [loginState.data.role, loginState.data.userId, loginState.status, projectForm]);
  
  useEffect(() => {
    getProjects();
    getProjectsCounts();
    fetchFilters();
  }, []);


  useEffect(() => {
    if(isFiltered){
    handleStatusORCategoryChange()
  }
  }, [statuses, categories, isFiltered]);
  


  const handleStatusORCategoryChange = () => {
    const selectedStatuses = statuses.filter(status => status.isSelect);
    const selectedCategories = categories.filter(category => category.isSelect);
    let updated = projects;

    if (selectedStatuses.length > 0) {
        updated = updated.filter((project: Project) => 
            selectedStatuses.some((status: FilterMap) => status.name === project.status)
        );
    }

    if (selectedCategories.length > 0) {
        updated = updated.filter((project: Project) => 
            selectedCategories.some((category: FilterMap) => category.name === project.category)
        );
    }

    setProjects(updated);
  }
 
  const getProjects = async () => {
    try {
      setIsLoading(true);
      const projectRes:any = await ProjectService.getProjects();
      setProjects(projectRes.data.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  const getProjectsCounts = async () => {
    try {
      const projectCountRes:any = await ProjectService.getProjectCountByStatus();
      setProjectCount(projectCountRes.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFilters = async () => {
    const categoryRes:any = await CategoryService.getCategories();
    const fetchedCategories:FilterMap[] = categoryRes.data.data.map((category: any) => ({
      ...category,
      name: category.category,
      isSelect: false
    }));
    setCategories(fetchedCategories);
  const projectStatus:FilterMap[]=PROJECT_STATUS.map((status:any)=>{
    return{
      _id:status._id,
      name:status.name,
      isSelect:false
    }
  })
  setStatuses(projectStatus);

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
    if(isFiltered){
      handleClearFilters()
    }
  };

  const handleFilterDrawerClose = (save: boolean) => {
    setFilterDrawerOpen(false);
    if(save){
      setIsFiltered(true);
    }
    if(!save){
      handleClearFilters()
    }
  };

  const handleCategoryChange = (id: string) => {
  const change=  categories.map((category) => {
      if (category._id === id) {
        return { ...category, isSelect: !category.isSelect };
      }
      return category;})
    setCategories(change);
  };

  const handleStatusChange = (id:string) => {
    const change= statuses.map((statuses) => {
      if (statuses._id === id) {
        return { ...statuses, isSelect: !statuses.isSelect };
      }
      return statuses;})
      setStatuses(change);
  };

  const handleClearFilters = () => {
    setIsFiltered(false);
    const change= statuses.map((statuses) => {
    return { ...statuses, isSelect: false }})
      setStatuses(change);
    const change1= categories.map((category) => {
    return { ...category, isSelect: false }})    
    setCategories(change1);
    getProjects()
  }

  

   

  const handleTableAction = (mode: string, id: string) => {
    setMode(mode);
    setId(id);
    if (SCREEN_MODES.VIEW === mode) {
      console.log('View clicked');
      navigate(`/projects/${id}`);
    }
    if(SCREEN_MODES.DELETE===mode){
      setIsDeleteModalOpen(true)
    }if(SCREEN_MODES.EDIT===mode){
      const project:Project|undefined=projects.find((project)=>project._id===id)
      if(project){
        setProjectForm({
          ...projectForm,
          _id:{...projectForm._id,value:project._id},
          category:{...projectForm.category,value:project.category},
          clientContactNumber:{...projectForm.clientContactNumber,value:Number(project.clientContactNumber)},
          clientEmail:{...projectForm.clientEmail,value:project.clientEmail},
          createdBy:{...projectForm.createdBy,value:project.createdBy},
          endDate:{...projectForm.endDate,value:project.endDate},
          projectName:{...projectForm.projectName,value:project.projectName},
          startDate:{...projectForm.startDate,value:project.startDate},
          status:{...projectForm.status,value:project.status}
        })
        
      }


      setModalOpen(true)
    }
  };

  const handleModalOpen = () => {

    setMode(SCREEN_MODES.CREATE);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setProjectForm(INITIAL_PROJECT_FORM_DATA);
    setModalOpen(false);
  };

const handleDeleteAction=(confirm:boolean,property:string)=>{
  if(confirm){
    ProjectService.deleteProject(id).then((res:any)=>{
      getProjects();
      getProjectsCounts();
      setIsDeleteModalOpen(false)
      showSuccessToast(res.data.message)
    }).catch((error:any)=>{
      console.log(error)
      showErrorToast(error)
      setIsDeleteModalOpen(false)
    })
  }
  if(!confirm){
    setIsDeleteModalOpen(false)
  }

}

const onInputHandleChange = (property: string, value: string) => {
  setProjectForm({
    ...projectForm,
    [property]: {
      ...projectForm[property as keyof typeof projectForm],
      value: value,
      error: "",
    },
  });
}
const handleInputFocus = (property: string) => {
  setProjectForm({
    ...projectForm,
    [property]: {
      ...projectForm[property as keyof typeof projectForm],
      error: "",
    },
  });
}

const onSave=async()=>{
  setHelperText(true);
  const [validateData, isValid] =await validateFormData(projectForm);
  setProjectForm(validateData)
  if(isValid){
    setIsLoading(true)
  

    if(mode===SCREEN_MODES.CREATE){
      const projectData:createProjectDto={
        clientContactNumber:projectForm.clientContactNumber.value,
        clientEmail:projectForm.clientEmail.value,
        projectName:projectForm.projectName.value,
        startDate:projectForm.startDate.value,
        endDate:projectForm.endDate.value,
        status:projectForm.status.value,
        createdBy:projectForm.createdBy.value,
        category:projectForm.category.value,
      }

      ProjectService.createProject(projectData).then(async (res:any)=>{
        await getProjects();
        await getProjectsCounts();
        setModalOpen(false)
        setProjectForm(INITIAL_PROJECT_FORM_DATA)
        showSuccessToast(res.data.message)
        setIsLoading(false)
      }).catch((error:any)=>{
        console.log(error)
        showErrorToast(error)
        setIsLoading(false)
      })
    }
    if(mode===SCREEN_MODES.EDIT){
      const projectData:createProjectDto={
        _id:projectForm._id.value,
        clientContactNumber:projectForm.clientContactNumber.value,
        clientEmail:projectForm.clientEmail.value,
        projectName:projectForm.projectName.value,
        startDate:projectForm.startDate.value,
        endDate:projectForm.endDate.value,
        status:projectForm.status.value,
        createdBy:projectForm.createdBy.value,
        category:projectForm.category.value,
      }
      ProjectService.updateProject(projectData).then(async (res:any)=>{
        await getProjects();
        await getProjectsCounts();
        setModalOpen(false)
        setProjectForm(INITIAL_PROJECT_FORM_DATA)
        showSuccessToast(res.data.message)
        setIsLoading(false)
      }).catch((error:any)=>{
        console.log(error)
        showErrorToast(error)
        setIsLoading(false)
      })
  }
}

}

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: "30px" }}>
        <Typography sx={{ fontWeight: "700", fontSize: "30px" }}>Projects</Typography>
        <CustomButton
          size="large"
          onClick={handleModalOpen}
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
            <InfoCard title="In Progress Projects" value={projectCount?.['In-Progress'] || 0} icon={RunningWithErrorsIcon} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} xl={3} lg={6}>
            <InfoCard title="On-hold Projects" value={projectCount?.['On-Hold'] || 0} icon={PauseCircleOutlineOutlinedIcon} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} xl={3} lg={6}>
            <InfoCard title="Completed Projects" value={projectCount?.Completed || 0} icon={CheckCircleOutlineIcon} />
          </Grid>
        </Grid>
      </div>
      <ProjectTable
        isAdmin={isAdmin}
        isLoading={isLoading}
        projects={projects}
        page={page}
        rowsPerPage={rowsPerPage}
        isFiltered={isFiltered}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        onFilterDrawerOpen={handleFilterDrawerOpen}
        onClearFilters={handleClearFilters}
        handleTableAction={handleTableAction}
      />
      <FilterDrawerCategory
        type='Category'
        filterDrawerOpen={filterDrawerOpen}
        onFilterDrawerClose={handleFilterDrawerClose}
        onCategoryChange={handleCategoryChange}
        onStatusChange={handleStatusChange}
        categories={categories}
        statuses={statuses}
      />
      <CreateProjectModal
      categories={categories}
      onSave={onSave} 
        mode={mode}
        open={modalOpen} 
        onClose={handleModalClose}
        projectForm={projectForm}
        handleInputFocus={handleInputFocus}
        onInputHandleChange={onInputHandleChange}
        helperText={helperText}
       />

      <DeleteConfirmationModal
        handleDeleteAction={handleDeleteAction}
        text={"Project"}
        onClose={() => setIsDeleteModalOpen(false)}
        open={isDeleteModalOpen}
      />
    </div>
  );
};

export default Projects;

import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { CategoryModal, PositionsTable, ProjectCategoriesTable } from '../../components';
import { CategoryService } from '../../services/category.service';
import { PositionService } from '../../services/position.service';
import { Category, CategoryFormDto, Positions } from '../../utilities/models';
import PositionModal from '../../components/PositionModal/PositionModal';
import { CustomButton } from '../../assets/theme/theme';
import { validateFormData } from '../../utilities/helpers';
import { showErrorToast, showSuccessToast } from '../../utilities/helpers/alert';
import { SCREEN_MODES } from '../../utilities/constants/app.constants';
import DeleteConfirmationModal from '../../components/shared/DeleteConfirmationModal/DeleteConfirmationModal';

const Configurations: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [positions, setPositions] = useState<Positions[]>([]);
  const [categoryModalOpen, setCategoryModalOpen] = useState<boolean>(false);
  const [positionModalOpen, setPositionModalOpen] = useState<boolean>(false);
  const [helperText, setHelperText] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isCategoryLoading, setIsCategoryLoading] = useState<boolean>(false);
  const [id, setId] = useState<string>("");
  const [mode, setMode] = useState<string>("");

  const INITIAL_CATEGORY_FORM_DATA: CategoryFormDto = {
    category:{ value: "", isRequired: true, disable: false, readonly: false, validator: "text", error: "", },
    _id: { value: "", isRequired: false, disable: false, readonly: false, validator: "text", error: "", },
  }
  const [categoryForm, setCategoryForm] = useState<CategoryFormDto>(INITIAL_CATEGORY_FORM_DATA);

  useEffect(() => {
    fetchCategories();
    fetchPositions();
  }, []);

  const fetchCategories = async () => {
    try {
      setIsCategoryLoading(true);
      const response:any = await CategoryService.getCategories();
      setCategories(response.data.data);
      setIsCategoryLoading(false);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchPositions = async () => {
    try {
      const response:any = await PositionService.getPositions();
      setPositions(response.data.data);
    } catch (error) {
      console.error('Error fetching positions:', error);
    }
  };

  const handleSaveCategory = async () => {
    setHelperText(true);
    const [validateData, isValid] = await validateFormData(categoryForm);
    setCategoryForm(validateData)
    if (isValid &&( mode!==SCREEN_MODES.VIEW&& mode!==SCREEN_MODES.EDIT)) {
      try {
        await CategoryService.createCategory({ category: categoryForm.category.value });
        fetchCategories(); 
        showSuccessToast('Category added successfully');
        setCategoryModalOpen(false);
        setCategoryForm(INITIAL_CATEGORY_FORM_DATA)
      } catch (error:any) {
        showErrorToast(error)
        console.error('Error saving category:', error);
      }
    }else if(isValid && mode===SCREEN_MODES.EDIT){
      try {
        await CategoryService.updateCategory(categoryForm._id.value,{ category: categoryForm.category.value });
        fetchCategories(); 
        showSuccessToast('Category updated successfully');
        setCategoryModalOpen(false);
        setCategoryForm(INITIAL_CATEGORY_FORM_DATA)
      } catch (error:any) {
        showErrorToast(error)
        console.error('Error saving category:', error);
      }
    }
  
  };

  const handleSavePosition = async (position: string) => {
    try {
      await PositionService.createPosition({ positions: position });
      fetchPositions(); // Refresh the list after adding a new position
    } catch (error) {
      console.error('Error saving position:', error);
    }
  };



  const onInputHandleChange=(property:string,value:string)=>{
    setCategoryForm({
        ...categoryForm,
        [property]: {
          ...categoryForm[property as keyof typeof categoryForm],
          value: value,
          error: null,
        },
      });
}
const handleInputFocus=(property:string)=>{
    setCategoryForm({
        ...categoryForm,
        [property]: {
          ...categoryForm[property as keyof typeof categoryForm],
          error: null,
        },
      });
}
const handleTableAction=(action:string,id:string)=>{
  setMode(action)
  if(action===SCREEN_MODES.DELETE){
    setIsDeleteModalOpen(true)
    setId(id)
  }
  if(action===SCREEN_MODES.EDIT){
 const  item= categories.filter((category)=>{
      if(category._id===id)return category})
  
      setCategoryForm(
       { ...categoryForm,
        _id:{...categoryForm._id,value:item[0]._id},
        category:{...categoryForm.category,value:item[0].category}

       })
       setCategoryModalOpen(true)
      }
  if(action===SCREEN_MODES.VIEW){
    const  item= categories.filter((category)=>{
      if(category._id===id)return category})
  
      setCategoryForm(
       { ...categoryForm,
        _id:{...categoryForm._id,value:item[0]._id,disable:true},
        category:{...categoryForm.category,value:item[0].category,disable:true}

       })
       setCategoryModalOpen(true)
      
  }

}
 
const handleCategoryDeleteAction=(isConfirm:boolean,text:string)=>{
  if(text==="Category" && isConfirm){
    CategoryService.deleteCategory(id).then((result:any)=>{
      showSuccessToast(result.data.message)
      fetchCategories()
      setIsDeleteModalOpen(false)
    }).catch((error:any)=>{
      showErrorToast(error)
      setIsDeleteModalOpen(false)
    })
  }
  if(text==="Position" && isConfirm){
    PositionService.deletePosition(id).then((result:any)=>{
      showSuccessToast(result.data.message)
      fetchPositions()
      setIsDeleteModalOpen(false)
    }).catch((error:any)=>{
      showErrorToast(error)
      setIsDeleteModalOpen(false)
    })
  }
  else{
    setIsDeleteModalOpen(false)
  }
}

const hanldeModlaClose=()=>{
  setCategoryForm(INITIAL_CATEGORY_FORM_DATA)
  setCategoryModalOpen(false)
}
return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '30px' }}>
        <Typography sx={{ fontWeight: '700', fontSize: '30px' }}>Configurations</Typography>
      </div>
      <Grid container sx={{ justifyContent: "space-evenly", paddingInline: "30px" }}>
        <Grid item xs={12} sx={{ border: "1px solid rgba(0, 0, 0, 0.2)", borderRadius: "10px", margin: "1rem", paddingBlock: "1rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", margin: "1rem" }}>
            <Typography sx={{ fontWeight: "600", fontSize: "18px" }}>Project Categories</Typography>
            <CustomButton
              size="large"
              height="2.5rem"
              onClick={() => {
                setCategoryModalOpen(true);
                setMode(SCREEN_MODES.CREATE);
              }}
            >Create Category
               </CustomButton>
          </div>
          <Grid item xs={12}>
            <ProjectCategoriesTable 
            isCategoryLoading={isCategoryLoading}
            categories={categories} 
            handleTableAction={handleTableAction}/>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ border: "1px solid rgba(0, 0, 0, 0.2)", borderRadius: "10px", margin: "1rem", paddingBlock: "1rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", margin: "1rem" }}>
            <Typography sx={{ fontWeight: "600", fontSize: "18px" }}>Positions</Typography>
            <CustomButton
            size="large"
            height="2.5rem"
            onClick={() => {setPositionModalOpen(true);}}
              
            >Create Position
              </CustomButton>
          </div>
          <PositionsTable positions={positions} />
        </Grid>
      </Grid>
      <CategoryModal
      mode={mode}
       open={categoryModalOpen} 
       onClose={() => hanldeModlaClose()} 
       handleInputFocus={handleInputFocus}
       onInputHandleChange={onInputHandleChange}
       helperText={helperText}
       onSave={handleSaveCategory} 
       categoryForm={categoryForm}
       
       />
      <PositionModal open={positionModalOpen} onClose={() => setPositionModalOpen(false)} onSave={handleSavePosition} />


     < DeleteConfirmationModal
     handleCategoryDeleteAction={handleCategoryDeleteAction}
     text={"Category"}
     onClose={() => setIsDeleteModalOpen(false)}
     open={isDeleteModalOpen}

     /> 
    </div>
  );
};

export default Configurations;

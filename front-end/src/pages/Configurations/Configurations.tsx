import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { CategoryModal, PositionsTable, ProjectCategoriesTable } from '../../components';
import { CategoryService } from '../../services/category.service';
import { PositionService } from '../../services/position.service';
import { Category, CategoryFormDto, PositionFormDto, Positions } from '../../utilities/models';
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
  const [isDeleteCategoryModalOpen, setIsDeleteCategoryModalOpen] = useState<boolean>(false);
  const [isDeletePositionModalOpen, setIsDeletePositionModalOpen] = useState<boolean>(false);
  const [isCategoryLoading, setIsCategoryLoading] = useState<boolean>(false);
  const [isPositionLoading, setIsPositionLoading] = useState<boolean>(false);
  const [id, setId] = useState<string>("");
  const [mode, setMode] = useState<string>("");

  const INITIAL_CATEGORY_FORM_DATA: CategoryFormDto = {
    category:{ value: "", isRequired: true, disable: false, readonly: false, validator: "text", error: "", },
    _id: { value: "", isRequired: false, disable: false, readonly: false, validator: "text", error: "", },
  }
  const INITIAL_POSITION_FORM_DATA: PositionFormDto = {
    position:{ value: "", isRequired: true, disable: false, readonly: false, validator: "text", error: "", },
    _id: { value: "", isRequired: false, disable: false, readonly: false, validator: "text", error: "", },
  }
  const [categoryForm, setCategoryForm] = useState<CategoryFormDto>(INITIAL_CATEGORY_FORM_DATA);
  const [positionForm, setPositionForm] = useState<PositionFormDto>(INITIAL_POSITION_FORM_DATA);

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
      setIsPositionLoading(true);
      const response:any = await PositionService.getPositions();
      setPositions(response.data.data);
      setIsPositionLoading(false);
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
    } else if(isValid && mode===SCREEN_MODES.EDIT){
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

  const handleSavePosition = async () => {
    setHelperText(true);
    const [validateData, isValid] = await validateFormData(positionForm);
    setPositionForm(validateData)
    if (isValid &&( mode!==SCREEN_MODES.VIEW&& mode!==SCREEN_MODES.EDIT)) {
      try {
        await PositionService.createPosition({ positions: positionForm.position.value });
        fetchPositions(); 
        showSuccessToast('Position added successfully');
        setPositionModalOpen(false);
        setPositionForm(INITIAL_POSITION_FORM_DATA)
      } catch (error:any) {
        showErrorToast(error)
        console.error('Error saving position:', error);
      }
    } else if(isValid && mode===SCREEN_MODES.EDIT){
      try {
        await PositionService.updatePosition(positionForm._id.value,{ positions: positionForm.position.value  });
        fetchPositions(); 
        showSuccessToast('Position updated successfully');
        setPositionModalOpen(false);
        setPositionForm(INITIAL_POSITION_FORM_DATA)
      } catch (error:any) {
        showErrorToast(error)
        console.error('Error saving position:', error);
      }
    }
  };

  const onInputHandleChange = (property: string, value: string, formType: 'category' | 'position') => {
    if (formType === 'category') {
      setCategoryForm({
        ...categoryForm,
        [property]: {
          ...categoryForm[property as keyof typeof categoryForm],
          value: value,
          error: null,
        },
      });
    } else if (formType === 'position') {
      setPositionForm({
        ...positionForm,
        [property]: {
          ...positionForm[property as keyof typeof positionForm],
          value: value,
          error: null,
        },
      });
    }
  }

  const handleInputFocus = (property: string, formType: 'category' | 'position') => {
    if (formType === 'category') {
      setCategoryForm({
        ...categoryForm,
        [property]: {
          ...categoryForm[property as keyof typeof categoryForm],
          error: null,
        },
      });
    } else if (formType === 'position') {
      setPositionForm({
        ...positionForm,
        [property]: {
          ...positionForm[property as keyof typeof positionForm],
          error: null,
        },
      });
    }
  }

  const handleTableAction = (action: string, id: string, type: 'category' | 'position') => {
    setMode(action);
    setId(id);

    if (type === 'category') {
      if (action === SCREEN_MODES.DELETE) {
        setIsDeleteCategoryModalOpen(true);
      } else if (action === SCREEN_MODES.EDIT || action === SCREEN_MODES.VIEW) {
        const item = categories.find((category) => category._id === id);
        if (item) {
          setCategoryForm({
            ...categoryForm,
            _id: { ...categoryForm._id, value: item._id },
            category: { ...categoryForm.category, value: item.category, disable: action === SCREEN_MODES.VIEW },
          });
          setCategoryModalOpen(true);
        }
      }
    } else if (type === 'position') {
      if (action === SCREEN_MODES.DELETE) {
        setIsDeletePositionModalOpen(true);
      } else if (action === SCREEN_MODES.EDIT || action === SCREEN_MODES.VIEW) {
        const item = positions.find((position) => position._id === id);
        if (item) {
          setPositionForm({
            ...positionForm,
            _id: { ...positionForm._id, value: item._id },
            position: { ...positionForm.position, value: item.positions, disable: action === SCREEN_MODES.VIEW },
          });
          setPositionModalOpen(true);
        }
      }
    }
  }

  const handleCategoryDeleteAction = async (isConfirm: boolean, type: 'category' | 'position') => {
    if (isConfirm) {
      try {
        if (type === 'category') {
          await CategoryService.deleteCategory(id);
          showSuccessToast('Category deleted successfully');
          fetchCategories();
          setIsDeleteCategoryModalOpen(false);
        } else if (type === 'position') {
          await PositionService.deletePosition(id);
          showSuccessToast('Position deleted successfully');
          fetchPositions();
          setIsDeletePositionModalOpen(false);
        }
      } catch (error:any) {
        showErrorToast(error);
        if (type === 'category') {
          setIsDeleteCategoryModalOpen(false);
        } else if (type === 'position') {
          setIsDeletePositionModalOpen(false);
        }
      }
    } else {
      if (type === 'category') {
        setIsDeleteCategoryModalOpen(false);
      } else if (type === 'position') {
        setIsDeletePositionModalOpen(false);
      }
    }
  }

  const handleModalClose = () => {
    setCategoryForm(INITIAL_CATEGORY_FORM_DATA);
    setPositionForm(INITIAL_POSITION_FORM_DATA);
    setCategoryModalOpen(false);
    setPositionModalOpen(false);
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
              handleTableAction={(action, id) => handleTableAction(action, id, 'category')}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ border: "1px solid rgba(0, 0, 0, 0.2)", borderRadius: "10px", margin: "1rem", paddingBlock: "1rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", margin: "1rem" }}>
            <Typography sx={{ fontWeight: "600", fontSize: "18px" }}>Positions</Typography>
            <CustomButton
              size="large"
              height="2.5rem"
              onClick={() => {
                setPositionModalOpen(true);
                setMode(SCREEN_MODES.CREATE);
              }}
            >Create Position
            </CustomButton>
          </div>
          <PositionsTable 
            positions={positions} 
            isPositionLoading={isPositionLoading}
            handleTableAction={(action, id) => handleTableAction(action, id, 'position')}
          />
        </Grid>
      </Grid>
      <CategoryModal
        mode={mode}
        open={categoryModalOpen} 
        onClose={handleModalClose} 
        handleInputFocus={(property) => handleInputFocus(property, 'category')}
        onInputHandleChange={(property, value) => onInputHandleChange(property, value, 'category')}
        helperText={helperText}
        onSave={handleSaveCategory} 
        categoryForm={categoryForm}
      />
      <PositionModal
        mode={mode}
        open={positionModalOpen}
        onClose={handleModalClose}
        onSave={handleSavePosition}
        handleInputFocus={(property) => handleInputFocus(property, 'position')}
        onInputHandleChange={(property, value) => onInputHandleChange(property, value, 'position')}
        helperText={helperText}
        positionForm={positionForm}
      />
      <DeleteConfirmationModal
        handleCategoryDeleteAction={(isConfirm) => handleCategoryDeleteAction(isConfirm, 'category')}
        text={"Category"}
        onClose={() => setIsDeleteCategoryModalOpen(false)}
        open={isDeleteCategoryModalOpen}
      />
      <DeleteConfirmationModal
        handleCategoryDeleteAction={(isConfirm) => handleCategoryDeleteAction(isConfirm, 'position')}
        text={"Position"}
        onClose={() => setIsDeletePositionModalOpen(false)}
        open={isDeletePositionModalOpen}
      />
    </div>
  );
};

export default Configurations;

import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { CategoryModal, PositionsTable, ProjectCategoriesTable } from '../../components';
import { CategoryService } from '../../services/category.service';
import { PositionService } from '../../services/position.service';
import { Category, Positions } from '../../utilities/models';
import PositionModal from '../../components/PositionModal/PositionModal';
import { CustomButton } from '../../assets/theme/theme';

const Configurations: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [positions, setPositions] = useState<Positions[]>([]);
  const [categoryModalOpen, setCategoryModalOpen] = useState<boolean>(false);
  const [positionModalOpen, setPositionModalOpen] = useState<boolean>(false);
  useEffect(() => {
    fetchCategories();
    fetchPositions();
  }, []);

  const fetchCategories = async () => {
    try {
      const response:any = await CategoryService.getCategories();
      setCategories(response.data.data);
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

  const handleSaveCategory = async (category: string) => {
    try {
      await CategoryService.createCategory({ category });
      fetchCategories(); // Refresh the list after adding a new category
      setCategoryModalOpen(false); // Close the modal
    } catch (error) {
      console.error('Error saving category:', error);
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
              }}
            >Create Category
               </CustomButton>
          </div>
          <Grid item xs={12}>
            <ProjectCategoriesTable categories={categories} />
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ border: "1px solid rgba(0, 0, 0, 0.2)", borderRadius: "10px", margin: "1rem", paddingBlock: "1rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", margin: "1rem" }}>
            <Typography sx={{ fontWeight: "600", fontSize: "18px" }}>Positions</Typography>
            <CustomButton
            size="large"
            height="2.5rem"
            textTransform="capitalize"
            onClick={() => {setPositionModalOpen(true);}}
              
            >Create Position
              </CustomButton>
          </div>
          <PositionsTable positions={positions} />
        </Grid>
      </Grid>
      <CategoryModal open={categoryModalOpen} onClose={() => setCategoryModalOpen(false)} onSave={handleSaveCategory} />
      <PositionModal open={positionModalOpen} onClose={() => setPositionModalOpen(false)} onSave={handleSavePosition} />
    </div>
  );
};

export default Configurations;

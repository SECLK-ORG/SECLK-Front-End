import React from 'react';
import { Grid, Typography } from '@mui/material';
import { CustomButton, PositionsTable, ProjectCategoriesTable } from '../../components';


const categories: string[] = ['UK', 'USA', 'Local', 'Fiverr'];
const positions: string[] = ['UX Designer', 'Software Engineer', 'QA Engineer', 'Project Manager'];

const Configurations: React.FC = () => {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '30px',}}>
        <Typography sx={{ fontWeight: '700', fontSize: '30px' }}>Configurations</Typography>
      </div>
      <Grid container spacing={2} sx={{justifyContent:"space-evenly",paddingInline:"30px"  }}>
      <Grid item xs={12} sx={{border:" 1px solid rgba(0, 0, 0, 0.2)", borderRadius:"18px",margin:"1rem",paddingBlock:"1rem"}}>
      <div style={{display:"flex", justifyContent:"space-between", margin:"1rem"}}>
      <Typography sx={{fontWeight:"600",fontSize:"18px"}}>Project Categories</Typography>
      <CustomButton
      
        variant='outlined'
        text="Create Category"
        size="large"
        color="#437EF7"
        height="2.5rem"
        textTransform="capitalize"
        onClick={() => {
          console.log('Button clicked');
        }}
      />
      </div>
      <Grid item xs={12}>
        <ProjectCategoriesTable categories={categories} />
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{border:" 1px solid rgba(0, 0, 0, 0.2)", borderRadius:"18px",margin:"1rem",paddingBlock:"1rem"}}>
      <div style={{display:"flex", justifyContent:"space-between", margin:"1rem"}}>
      <Typography sx={{fontWeight:"600",fontSize:"18px"}}>Positions</Typography>
      <CustomButton
         variant='outlined'
        text="Create Position"
        size="large"
        color="#437EF7"
        height="2.5rem"
        textTransform="capitalize"
        onClick={() => {
          console.log('Button clicked');
        }}
      />
      </div>
        <PositionsTable positions={positions} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Configurations;

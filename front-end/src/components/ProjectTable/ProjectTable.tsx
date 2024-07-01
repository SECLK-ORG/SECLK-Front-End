import React from 'react';
import {
  TableContainer, Paper, Table, TableHead, TableRow, TableBody,
  IconButton, TextField, InputAdornment, Button, Drawer, FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox, Box, Pagination, PaginationItem
} from '@mui/material';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { Visibility, Edit, Search , ArrowBack, ArrowForward } from '@mui/icons-material';
import { CustomButton, StickyTableCell, StyledTableCell, StyledTableRow, StyledTextField } from '../../assets/theme/theme';
import styles from './ProjectTable.module.scss';
interface ProjectTableProps {
  page: number;
  rowsPerPage: number;
  filterDrawerOpen: boolean;
  categoryFilters: { [key: string]: boolean };
  onChangePage: (event: React.ChangeEvent<unknown>, newPage: number) => void;
  onChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFilterDrawerOpen: () => void;
  onFilterDrawerClose: () => void;
  onCategoryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProjectTable: React.FC<ProjectTableProps> = ({
  page,
  rowsPerPage,
  filterDrawerOpen,
  categoryFilters,
  onChangePage,
  onChangeRowsPerPage,
  onFilterDrawerOpen,
  onFilterDrawerClose,
  onCategoryChange
}) => {
  const projects = [
    { name: 'ZenSpace Mobile App', startDate: '23/08/2023', endDate: '12/12/2024', category: 'US', resourcesCount: 20, status: 'Active' },
    { name: 'Luminous Landing Page', startDate: '23/08/2023', endDate: '25/08/2023', category: 'UK', resourcesCount: 12, status: 'Active' },
    { name: 'Navigation Overhaul', startDate: '23/08/2023', endDate: '', category: 'Local', resourcesCount: 3, status: 'Active' },
    { name: 'Mosaic Admin Panel', startDate: '23/08/2023', endDate: '-', category: 'Local', resourcesCount: 13, status: 'Active' },
    { name: 'Echo Portfolio Site', startDate: '23/08/2023', endDate: '-', category: 'US', resourcesCount: 13, status: 'Inactive' },
    { name: 'Mosaic Admin Panel', startDate: '23/08/2023', endDate: '-', category: 'Local', resourcesCount: 13, status: 'Active' },
    { name: 'Echo Portfolio Site', startDate: '23/08/2023', endDate: '-', category: 'US', resourcesCount: 13, status: 'Inactive' },
    { name: 'Mosaic Admin Panel', startDate: '23/08/2023', endDate: '-', category: 'Local', resourcesCount: 13, status: 'Active' },
    { name: 'Echo Portfolio Site', startDate: '23/08/2023', endDate: '-', category: 'US', resourcesCount: 13, status: 'Inactive' },
    { name: 'Mosaic Admin Panel', startDate: '23/08/2023', endDate: '-', category: 'Local', resourcesCount: 13, status: 'Active' },
    { name: 'Echo Portfolio Site', startDate: '23/08/2023', endDate: '-', category: 'US', resourcesCount: 13, status: 'Inactive' },
    // Add more projects as needed
  ];

  const filteredProjects = projects.filter((project) =>
    (categoryFilters.US && project.category === 'US') ||
    (categoryFilters.UK && project.category === 'UK') ||
    (categoryFilters.Local && project.category === 'Local') ||
    (categoryFilters.Fiverr && project.category === 'Fiverr') ||
    (!categoryFilters.US && !categoryFilters.UK && !categoryFilters.Local && !categoryFilters.Fiverr)
  );

  return (
    <div style={{    margin: "1rem", padding: "1rem" }}>
      <TableContainer component={Paper} className={styles.grid}>
      <div className={styles.gridContainer}>
   
        <StyledTextField
          variant="outlined"
          placeholder="Search"
          
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
            style: { backgroundColor: 'white',width:"25rem" }
          }}
          style={{ marginRight: '10px' }}
        />
      
      
        <CustomButton
          variant="outlined"
          endIcon={<FilterAltOutlinedIcon    />}
          style={{ textTransform: 'full-width', backgroundColor: 'white'}}
          onClick={onFilterDrawerOpen}
        >
          Filters
        </CustomButton>
    
      </div>
        <Table className={styles.table}>
          <TableHead>
            <TableRow>
              <StyledTableCell width={180}>Project Name</StyledTableCell>
              <StyledTableCell width={180}>Start Date</StyledTableCell>
              <StyledTableCell width={180}>End Date</StyledTableCell>
              <StyledTableCell width={180}>Category</StyledTableCell>
              <StyledTableCell width={180}>Resources Count</StyledTableCell>
              <StyledTableCell width={180}>Status</StyledTableCell>
              <StickyTableCell width={180}>Actions</StickyTableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{}}>
            {filteredProjects.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage).map((project, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell>{project.name}</StyledTableCell>
                <StyledTableCell>{project.startDate}</StyledTableCell>
                <StyledTableCell>{project.endDate}</StyledTableCell>
                <StyledTableCell>{project.category}</StyledTableCell>
                <StyledTableCell>{project.resourcesCount}</StyledTableCell>
                <StyledTableCell>
                  <span style={{ color: project.status === 'Active' ? 'green' : 'red',
                    backgroundColor: project.status === 'Active' ? '#d1e7dd' : '#f8d7da',
                    width: 'fit-content',
                    padding: '5px',
                   }}>
                    {project.status}
                  </span>
                </StyledTableCell>
                <StickyTableCell >
                  <IconButton>
                    <Visibility />
                  </IconButton>
                  <IconButton>
                    <Edit />
                  </IconButton>
                </StickyTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        <Box display="flex" justifyContent="center" sx={{borderTop:"1px solid #dee2e6",borderRadius:"1px", padding:"1rem"}}  >
          <Pagination
            count={Math.ceil(filteredProjects.length / rowsPerPage)}
            page={page}
            onChange={onChangePage}
            
            renderItem={(item) => (
              <PaginationItem
                components={{ previous: ArrowBack, next: ArrowForward }}
                {...item}
              />
            )}
          />
        </Box>
      </TableContainer>
    
      <Drawer
        anchor="right"
        open={filterDrawerOpen}
        onClose={onFilterDrawerClose}
      >
        <div style={{ width: 250, padding: '20px' }}>
          <h2>Filters</h2>
          <FormControl component="fieldset">
            <FormLabel component="legend">Category</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={categoryFilters.US} onChange={onCategoryChange} name="US" />}
                label="US"
              />
              <FormControlLabel
                control={<Checkbox checked={categoryFilters.UK} onChange={onCategoryChange} name="UK" />}
                label="UK"
              />
              <FormControlLabel
                control={<Checkbox checked={categoryFilters.Local} onChange={onCategoryChange} name="Local" />}
                label="Local"
              />
              <FormControlLabel
                control={<Checkbox checked={categoryFilters.Fiverr} onChange={onCategoryChange} name="Fiverr" />}
                label="Fiverr"
              />
            </FormGroup>
          </FormControl>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
            <Button onClick={onFilterDrawerClose} style={{ marginRight: '10px' }}>Cancel</Button>
            <Button variant="contained" color="primary" onClick={onFilterDrawerClose}>Save</Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default ProjectTable;

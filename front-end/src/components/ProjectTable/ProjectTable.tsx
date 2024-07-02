import React from 'react';
import {
  TableContainer, Paper, Table, TableHead, TableRow, TableBody,
  IconButton, TextField, InputAdornment, Box, Pagination, PaginationItem,
  Typography
} from '@mui/material';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';

import { Visibility, Edit, Search, ArrowBack, ArrowForward } from '@mui/icons-material';
import { CustomButton, StickyTableCell, StyledTableCell, StyledTableRow, StyledTextField } from '../../assets/theme/theme';
import styles from './ProjectTable.module.scss';
import CustomPagination from '../CustomPagination/CustomPagination';

interface ProjectTableProps {
  page: number;
  rowsPerPage: number;
  categoryFilters: { [key: string]: boolean };
  onChangePage: (event: React.ChangeEvent<unknown>, newPage: number) => void;
  onChangeRowsPerPage: (event:any,) => void;
  onFilterDrawerOpen: () => void;
  isFiltered: boolean;
  statusFilters: { [key: string]: boolean };
  onClearFilters: () => void;
}

const ProjectTable: React.FC<ProjectTableProps> = ({
  page,
  rowsPerPage,
  categoryFilters,
  onChangePage,
  onChangeRowsPerPage,
  onFilterDrawerOpen,
  onClearFilters,
  isFiltered,
  statusFilters
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
  ];

  
  
  const filteredProjects = projects.filter((project) =>
    (categoryFilters.US && project.category === 'US') ||
    (categoryFilters.UK && project.category === 'UK') ||
    (categoryFilters.Local && project.category === 'Local') ||
    (categoryFilters.Fiverr && project.category === 'Fiverr') ||
    (!categoryFilters.US && !categoryFilters.UK && !categoryFilters.Local && !categoryFilters.Fiverr)
  ).filter((project) =>
    (statusFilters.Active && project.status === 'Active') ||
    (statusFilters.Inactive && project.status === 'Inactive') ||
    (!statusFilters.Active && !statusFilters.Inactive)
  );


  return (
    <div style={{ margin: "1rem", padding: "1rem" }}>
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
              style: { backgroundColor: 'white', width: "25rem" }
            }}
            style={{ marginRight: '10px' }}
          />
          <div>
          {isFiltered && (
            <CustomButton
              variant="contained"
              
              style={{  background: "#437EF7", color: "white", marginInline: "1rem"}}
              onClick={onClearFilters}
            >
              Clear Filters
            </CustomButton>
          )}
          <CustomButton
            variant="outlined"
            endIcon={<FilterAltOutlinedIcon />}
            style={{ textTransform: 'full-width', backgroundColor: 'white' }}
            onClick={onFilterDrawerOpen}
          >
            Filters
          </CustomButton>
          </div>
        </div>
        <Table className={styles.table}>
          <TableHead className={styles.tableHead}>
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
          <TableBody>
            {filteredProjects.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage).map((project, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell>{project.name}</StyledTableCell>
                <StyledTableCell>{project.startDate}</StyledTableCell>
                <StyledTableCell>{project.endDate}</StyledTableCell>
                <StyledTableCell>{project.category}</StyledTableCell>
                <StyledTableCell>{project.resourcesCount}</StyledTableCell>
                <StyledTableCell>
                  <span style={{
                    color: project.status === 'Active' ? 'green' : 'red',
                    backgroundColor: project.status === 'Active' ? '#d1e7dd' : '#f8d7da',
                    width: 'fit-content',
                    padding: '5px',
                  }}>
                    {project.status}
                  </span>
                </StyledTableCell>
                <StickyTableCell>
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
        <Box display="flex" justifyContent="center" sx={{ borderTop: "1px solid #dee2e6", borderRadius: "1px", padding: "1rem" }}>
          {/* <Pagination
            count={Math.ceil(filteredProjects.length / rowsPerPage)}
            page={page}
            onChange={onChangePage}
            size='large'
            // showFirstButton
            // showLastButton
            shape="circular"
            variant="text"
            renderItem={(item) => (
              <PaginationItem
              sx={{ justifyContent:"space-evenly", color: "black", }}
                components={{  previous:()=>(
                  <> 
                  <IconButton>
                    <ArrowBack />
                  </IconButton>
                  <h6>Prev</h6>
                  </>
                  
                  
                ), next: ()=>(
                  <> 
                   <h6>Next</h6>
                  <IconButton>
                    <ArrowForward />
                  </IconButton>
                  </>
               
                ) 
              // ,first:()=>(
              //   <>
              //   <h6>First</h6>

              //    <IconButton>
              //    </IconButton>
              //   </>
               
              // ),
              // last:()=>(
              //   <>
              //   <h6>Last</h6>

              //    <IconButton>
              //    </IconButton>
              //   </>
                
              // )
            
            }}
              
                {...item}
              />
            )}
          /> */}
          {/* <Pagination
            count={Math.ceil(filteredProjects.length / rowsPerPage)}
            page={page}
            onChange={onChangePage}
            size="large"
            shape="circular"
            variant="text"
            renderItem={(item) => (
              <PaginationItem
                components={{
                  previous: () => (
                    <Box display="flex" alignItems="center">
                      <IconButton>
                        <ArrowBack />
                      </IconButton>
                      <Typography variant="body2">Prev</Typography>
                    </Box>
                  ),
                  next: () => (
                    <Box display="flex" alignItems="center">
                      <Typography variant="body2">Next</Typography>
                      <IconButton>
                        <ArrowForward />
                      </IconButton>
                    </Box>
                  ),
                }}
                {...item}
                sx={{
                  '&.MuiPaginationItem-page': {
                    display: 'flex',
                    justifyContent: 'center',
                  },
                  '&.MuiPaginationItem-previous, &.MuiPaginationItem-next': {
                    minWidth: 'auto',
                  },
                }}
              />
            )}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          /> */}


<CustomPagination
  count={Math.ceil(filteredProjects.length / rowsPerPage)}
  page={page}
  onChangePage={onChangePage}
  filteredProjects={filteredProjects}
  rowsPerPage={rowsPerPage}
  onChangeRowsPerPage={onChangeRowsPerPage}
/>

  {/* <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
    <Box display="flex" alignItems="center">
      <IconButton onClick={(e) => onChangePage(e, page - 1)} disabled={page === 1}>
        <ArrowBack />
      <Typography variant="body2" sx={{color:"#5F6D7E"}}>Prev</Typography>

      </IconButton>
    </Box>
    <Pagination
      count={Math.ceil(filteredProjects.length / rowsPerPage)}
      page={page}
      onChange={onChangePage}
      size="large"
      shape="circular"
      variant="text"
      renderItem={(item) => (
        <PaginationItem
        components={{
          previous: () => (
              <></>
          ),
          next: () => (
            <></>
          ),
        }}
          {...item}
          sx={{
            '&.MuiPaginationItem-page': {
              display: 'flex',
              justifyContent: 'center',
            },
            '&.MuiPaginationItem-page.Mui-selected': {
              backgroundColor: 'white',
              color: '#437EF7',
            },
            '&.MuiPaginationItem-page:hover': {
              backgroundColor: 'none',
            },
            '&.MuiPaginationItem-previous, &.MuiPaginationItem-next': {
              display:"none"
            },
          }}
        />
      )}
    />
    <Box display="flex" alignItems="center">
      <IconButton onClick={(e) => onChangePage(e, page + 1)} disabled={page === Math.ceil(filteredProjects.length / rowsPerPage)}>
      <Typography variant="body2"sx={{color:"#5F6D7E"}}>Next</Typography>
        <ArrowForward />
      </IconButton>
    </Box>
  </Box>
  </> */}


        </Box>
      </TableContainer>
    </div>
  );
};

export default ProjectTable;

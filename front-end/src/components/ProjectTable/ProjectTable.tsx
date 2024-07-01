import React, { useState } from 'react';
import {
  TableContainer, Paper, Table, TableHead, TableRow, TableBody,
  IconButton, TextField, InputAdornment, Button, Drawer, FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox, Box, Pagination, PaginationItem
} from '@mui/material';
import { Visibility, Edit, Search, FilterList, FilterAlt as FilterAltIcon, ArrowBack, ArrowForward } from '@mui/icons-material';
import { StickyTableCell, StyledTableCell, StyledTableRow } from '../../assets/theme/theme';

const ProjectTable = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [categoryFilters, setCategoryFilters] = useState({
    US: false,
    UK: false,
    Local: false,
    Fiverr: false,
  });

  const projects = [
    { name: 'ZenSpace Mobile App', startDate: '23/08/2023', endDate: '12/12/2024', category: 'US', resourcesCount: 20, status: 'Active' },
    { name: 'Luminous Landing Page', startDate: '23/08/2023', endDate: '25/08/2023', category: 'UK', resourcesCount: 12, status: 'Active' },
    { name: 'Navigation Overhaul', startDate: '23/08/2023', endDate: '', category: 'Local', resourcesCount: 3, status: 'Active' },
    { name: 'Mosaic Admin Panel', startDate: '23/08/2023', endDate: '-', category: 'Local', resourcesCount: 13, status: 'Active' },
    { name: 'Echo Portfolio Site', startDate: '23/08/2023', endDate: '-', category: 'US', resourcesCount: 13, status: 'Inactive' },
    { name: 'ZenSpace Mobile App', startDate: '23/08/2023', endDate: '12/12/2024', category: 'US', resourcesCount: 20, status: 'Active' },
    { name: 'Luminous Landing Page', startDate: '23/08/2023', endDate: '25/08/2023', category: 'UK', resourcesCount: 12, status: 'Active' },
    { name: 'Navigation Overhaul', startDate: '23/08/2023', endDate: '', category: 'Local', resourcesCount: 3, status: 'Active' },
    { name: 'Mosaic Admin Panel', startDate: '23/08/2023', endDate: '-', category: 'Local', resourcesCount: 13, status: 'Active' },
    { name: 'Echo Portfolio Site', startDate: '23/08/2023', endDate: '-', category: 'US', resourcesCount: 13, status: 'Inactive' },
    { name: 'ZenSpace Mobile App', startDate: '23/08/2023', endDate: '12/12/2024', category: 'US', resourcesCount: 20, status: 'Active' },
    { name: 'Luminous Landing Page', startDate: '23/08/2023', endDate: '25/08/2023', category: 'UK', resourcesCount: 12, status: 'Active' },
    { name: 'Navigation Overhaul', startDate: '23/08/2023', endDate: '', category: 'Local', resourcesCount: 3, status: 'Active' },
    { name: 'Mosaic Admin Panel', startDate: '23/08/2023', endDate: '-', category: 'Local', resourcesCount: 13, status: 'Active' },
    { name: 'Echo Portfolio Site', startDate: '23/08/2023', endDate: '-', category: 'US', resourcesCount: 13, status: 'Inactive' },
    { name: 'ZenSpace Mobile App', startDate: '23/08/2023', endDate: '12/12/2024', category: 'US', resourcesCount: 20, status: 'Active' },
    { name: 'Luminous Landing Page', startDate: '23/08/2023', endDate: '25/08/2023', category: 'UK', resourcesCount: 12, status: 'Active' },
    { name: 'Navigation Overhaul', startDate: '23/08/2023', endDate: '', category: 'Local', resourcesCount: 3, status: 'Active' },
    { name: 'Mosaic Admin Panel', startDate: '23/08/2023', endDate: '-', category: 'Local', resourcesCount: 13, status: 'Active' },
    { name: 'Echo Portfolio Site', startDate: '23/08/2023', endDate: '-', category: 'US', resourcesCount: 13, status: 'Inactive' },
    { name: 'Echo Portfolio Site', startDate: '23/08/2023', endDate: '-', category: 'US', resourcesCount: 13, status: 'Inactive' },
    { name: 'ZenSpace Mobile App', startDate: '23/08/2023', endDate: '12/12/2024', category: 'US', resourcesCount: 20, status: 'Active' },
    { name: 'Luminous Landing Page', startDate: '23/08/2023', endDate: '25/08/2023', category: 'UK', resourcesCount: 12, status: 'Active' },
    { name: 'Navigation Overhaul', startDate: '23/08/2023', endDate: '', category: 'Local', resourcesCount: 3, status: 'Active' },
    { name: 'Mosaic Admin Panel', startDate: '23/08/2023', endDate: '-', category: 'Local', resourcesCount: 13, status: 'Active' },
    { name: 'Echo Portfolio Site', startDate: '23/08/2023', endDate: '-', category: 'US', resourcesCount: 13, status: 'Inactive' },
    { name: 'ZenSpace Mobile App', startDate: '23/08/2023', endDate: '12/12/2024', category: 'US', resourcesCount: 20, status: 'Active' },
    { name: 'Luminous Landing Page', startDate: '23/08/2023', endDate: '25/08/2023', category: 'UK', resourcesCount: 12, status: 'Active' },
    { name: 'Navigation Overhaul', startDate: '23/08/2023', endDate: '', category: 'Local', resourcesCount: 3, status: 'Active' },
    { name: 'Mosaic Admin Panel', startDate: '23/08/2023', endDate: '-', category: 'Local', resourcesCount: 13, status: 'Active' },
    { name: 'Echo Portfolio Site', startDate: '23/08/2023', endDate: '-', category: 'US', resourcesCount: 13, status: 'Inactive' },
    { name: 'Echo Portfolio Site', startDate: '23/08/2023', endDate: '-', category: 'US', resourcesCount: 13, status: 'Inactive' },
    { name: 'ZenSpace Mobile App', startDate: '23/08/2023', endDate: '12/12/2024', category: 'US', resourcesCount: 20, status: 'Active' },
    { name: 'Luminous Landing Page', startDate: '23/08/2023', endDate: '25/08/2023', category: 'UK', resourcesCount: 12, status: 'Active' },
    { name: 'Navigation Overhaul', startDate: '23/08/2023', endDate: '', category: 'Local', resourcesCount: 3, status: 'Active' },
    { name: 'Mosaic Admin Panel', startDate: '23/08/2023', endDate: '-', category: 'Local', resourcesCount: 13, status: 'Active' },
    { name: 'Echo Portfolio Site', startDate: '23/08/2023', endDate: '-', category: 'US', resourcesCount: 13, status: 'Inactive' },
    { name: 'ZenSpace Mobile App', startDate: '23/08/2023', endDate: '12/12/2024', category: 'US', resourcesCount: 20, status: 'Active' },
    { name: 'Luminous Landing Page', startDate: '23/08/2023', endDate: '25/08/2023', category: 'UK', resourcesCount: 12, status: 'Active' },
    { name: 'Navigation Overhaul', startDate: '23/08/2023', endDate: '', category: 'Local', resourcesCount: 3, status: 'Active' },
    { name: 'Mosaic Admin Panel', startDate: '23/08/2023', endDate: '-', category: 'Local', resourcesCount: 13, status: 'Active' },
    { name: 'Echo Portfolio Site', startDate: '23/08/2023', endDate: '-', category: 'US', resourcesCount: 13, status: 'Inactive' },
    { name: 'Echo Portfolio Site', startDate: '23/08/2023', endDate: '-', category: 'US', resourcesCount: 13, status: 'Inactive' },
    { name: 'ZenSpace Mobile App', startDate: '23/08/2023', endDate: '12/12/2024', category: 'US', resourcesCount: 20, status: 'Active' },
    { name: 'Luminous Landing Page', startDate: '23/08/2023', endDate: '25/08/2023', category: 'UK', resourcesCount: 12, status: 'Active' },
    { name: 'Navigation Overhaul', startDate: '23/08/2023', endDate: '', category: 'Local', resourcesCount: 3, status: 'Active' },
    { name: 'Mosaic Admin Panel', startDate: '23/08/2023', endDate: '-', category: 'Local', resourcesCount: 13, status: 'Active' },
    { name: 'Echo Portfolio Site', startDate: '23/08/2023', endDate: '-', category: 'US', resourcesCount: 13, status: 'Inactive' },
    { name: 'ZenSpace Mobile App', startDate: '23/08/2023', endDate: '12/12/2024', category: 'US', resourcesCount: 20, status: 'Active' },
    { name: 'Luminous Landing Page', startDate: '23/08/2023', endDate: '25/08/2023', category: 'UK', resourcesCount: 12, status: 'Active' },
    { name: 'Navigation Overhaul', startDate: '23/08/2023', endDate: '', category: 'Local', resourcesCount: 3, status: 'Active' },
    { name: 'Mosaic Admin Panel', startDate: '23/08/2023', endDate: '-', category: 'Local', resourcesCount: 13, status: 'Active' },
    { name: 'Echo Portfolio Site', startDate: '23/08/2023', endDate: '-', category: 'US', resourcesCount: 13, status: 'Inactive' },
    // Add more projects as needed
  ];

  const handleChangePage = (event: any, newPage: React.SetStateAction<number>) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: { target: { value: string; }; }) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleFilterDrawerOpen = () => {
    setFilterDrawerOpen(true);
  };

  const handleFilterDrawerClose = () => {
    setFilterDrawerOpen(false);
  };

  const handleCategoryChange = (event: { target: { name: any; checked: any; }; }) => {
    setCategoryFilters({
      ...categoryFilters,
      [event.target.name]: event.target.checked,
    });
  };

  const filteredProjects = projects.filter((project) =>
    (categoryFilters.US && project.category === 'US') ||
    (categoryFilters.UK && project.category === 'UK') ||
    (categoryFilters.Local && project.category === 'Local') ||
    (categoryFilters.Fiverr && project.category === 'Fiverr') ||
    (!categoryFilters.US && !categoryFilters.UK && !categoryFilters.Local && !categoryFilters.Fiverr)
  );

  return (
    <div style={{ border: "1px solid #0003", borderRadius: "1rem", margin: "1rem", padding: "1rem" }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
        <TextField
          variant="outlined"
          placeholder="Search"
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
            style: { backgroundColor: 'white' }
          }}
          style={{ marginRight: '10px' }}
        />
        <Button
          variant="outlined"
          endIcon={<FilterAltIcon />}
          style={{ textTransform: 'none' }}
          onClick={handleFilterDrawerOpen}
        >
          Filters
        </Button>
      </div>
      <TableContainer component={Paper} sx={{ minHeight: "30rem" }}>
        <Table stickyHeader sx={{ minHeight: "30rem" }}>
          <TableHead>
            <TableRow>
              <StickyTableCell>Project Name</StickyTableCell>
              <StyledTableCell>Start Date</StyledTableCell>
              <StyledTableCell>End Date</StyledTableCell>
              <StyledTableCell>Category</StyledTableCell>
              <StyledTableCell>Resources Count</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProjects.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage).map((project, index) => (
              <StyledTableRow key={index}>
                <StickyTableCell>{project.name}</StickyTableCell>
                <StyledTableCell>{project.startDate}</StyledTableCell>
                <StyledTableCell>{project.endDate}</StyledTableCell>
                <StyledTableCell>{project.category}</StyledTableCell>
                <StyledTableCell>{project.resourcesCount}</StyledTableCell>
                <StyledTableCell>
                  <span style={{ color: project.status === 'Active' ? 'green' : 'red' }}>
                    {project.status}
                  </span>
                </StyledTableCell>
                <StyledTableCell>
                  <IconButton>
                    <Visibility />
                  </IconButton>
                  <IconButton>
                    <Edit />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        <Box display="flex" justifyContent="center" mt={2}>
          <Pagination
            count={Math.ceil(filteredProjects.length / rowsPerPage)}
            page={page}
            onChange={handleChangePage}
            color="primary"
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
        onClose={handleFilterDrawerClose}
      >
        <div style={{ width: 250, padding: '20px' }}>
          <h2>Filters</h2>
          <FormControl component="fieldset">
            <FormLabel component="legend">Category</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={categoryFilters.US} onChange={handleCategoryChange} name="US" />}
                label="US"
              />
              <FormControlLabel
                control={<Checkbox checked={categoryFilters.UK} onChange={handleCategoryChange} name="UK" />}
                label="UK"
              />
              <FormControlLabel
                control={<Checkbox checked={categoryFilters.Local} onChange={handleCategoryChange} name="Local" />}
                label="Local"
              />
              <FormControlLabel
                control={<Checkbox checked={categoryFilters.Fiverr} onChange={handleCategoryChange} name="Fiverr" />}
                label="Fiverr"
              />
            </FormGroup>
          </FormControl>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
            <Button onClick={handleFilterDrawerClose} style={{ marginRight: '10px' }}>Cancel</Button>
            <Button variant="contained" color="primary" onClick={handleFilterDrawerClose}>Save</Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default ProjectTable;

import React, { useState } from 'react';
import {
  TableContainer, Paper, Table, TableHead, TableRow, TableBody,
  IconButton, InputAdornment, Box,
  TableCell,
  CircularProgress
} from '@mui/material';
import { Visibility, Edit, Search, Delete } from '@mui/icons-material';
import CustomPagination from '../CustomPagination/CustomPagination';
import CustomButton from '../shared/CustomButton/CustomButton';
import { StyledTextField } from '../../assets/theme/theme';
import { SCREEN_MODES } from '../../utilities/constants/app.constants';
import { employee } from '../../utilities/models';
import moment from 'moment';

interface ProjectEmployeesTableProps {
  page: number;
  rowsPerPage: number;
  onChangePage: (event: React.ChangeEvent<unknown>, newPage: number) => void;
  onChangeRowsPerPage: (event: any) => void;
  onFilterDrawerOpen: () => void;
  onClearFilters: () => void;
  isFiltered: boolean;
  isEmployeeLoading?: boolean;
  employees: employee[];
  handleClick: (mode: string, employeeId: string) => void;
}

const ProjectEmployeesTable: React.FC<ProjectEmployeesTableProps> = ({
  page,
  rowsPerPage,
  onChangePage,
  onChangeRowsPerPage,
  onFilterDrawerOpen,
  onClearFilters,
  isFiltered,
  handleClick,
  employees,
  isEmployeeLoading
}) => {

  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const filteredEmployees = employees.filter((employee) =>employee.employeeName.toLowerCase().includes(searchValue.toLowerCase()))
  return (
    <div>
      <TableContainer component={Paper}>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', borderBottom: "1px solid #e0e0e0" }}>
          <StyledTextField
            variant="outlined"
            placeholder="Search"
             size='small'
            value={searchValue}
            onChange={handleSearchChange}
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
              <IconButton
                style={{ background: "#437EF7", color: "white", marginInline: "1rem" }}
                onClick={onClearFilters}
              >
                Clear Filters
              </IconButton>
            )}
            <CustomButton
              text='Add Employee'
              backgroundColor='#437EF7'
              color='white'
              variant='contained'
              onClick={() => handleClick(SCREEN_MODES.CREATE, "")}
            />
          </div>
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee Name</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Project Started Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isEmployeeLoading ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : filteredEmployees.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No records found
                </TableCell>
              </TableRow>
            ) : (
              filteredEmployees.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage).map((employee, index) => (
                <TableRow key={index}>
                  <TableCell>{employee.employeeName}</TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{moment(employee.projectStartedDate).format('YYYY-MM-DD')}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => { handleClick(SCREEN_MODES.VIEW, employee._id) }}>
                      <Visibility />
                    </IconButton>
                    {/* <IconButton onClick={() => { handleClick(SCREEN_MODES.EDIT, employee._id) }}> 
                      <Edit />
                    </IconButton> */}
                    <IconButton onClick={() => { handleClick(SCREEN_MODES.DELETE, employee._id) }}>
                      <Delete />
                    </IconButton>
                    
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <Box display="flex" justifyContent="center" sx={{ borderTop: "1px solid #dee2e6", borderRadius: "1px", padding: "1rem" }}>
          <CustomPagination
            count={Math.ceil(filteredEmployees.length / rowsPerPage)}
            page={page}
            onChangePage={onChangePage}
            rowsPerPage={rowsPerPage}
            onChangeRowsPerPage={onChangeRowsPerPage}
            filteredProjects={filteredEmployees}
          />
        </Box>
      </TableContainer>
    </div>
  );
};

export default ProjectEmployeesTable;

import React, { useState } from 'react';
import {
  TableContainer, Paper, Table, TableHead, TableRow, TableBody,
  IconButton, InputAdornment, Box, Typography, CircularProgress
} from '@mui/material';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { Visibility, Edit, Search, Delete } from '@mui/icons-material';
import { CustomButton, StyledTableCell, StyledTableRow, StyledTextField } from '../../assets/theme/theme';
import CustomPagination from '../CustomPagination/CustomPagination';
import { Employee } from '../../utilities/models';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface EmployeeTableProps {
  page: number;
  rowsPerPage: number;
  onChangePage: (event: React.ChangeEvent<unknown>, newPage: number) => void;
  onChangeRowsPerPage: (event: any) => void;
  onFilterDrawerOpen: () => void;
  onClearFilters: () => void;
  isFiltered: boolean;
  handleClick: (mode: string, employeeId: string) => void;
  employees: Employee[];
  isLoading: boolean;
  isAdmin: boolean;
}

const getStatusStyles = (status: 'Active' | 'Inactive') => {
  if (status === 'Active') {
    return {
      dotColor: '#2D8A39',
      backgroundColor: '#F0FAF0',
      textColor: '#2D8A39'
    };
  } else {
    return {
      dotColor: '#E2341D',
      backgroundColor: '#FFF2F0',
      textColor: '#E2341D'
    };
  }
};

const EmployeeTable: React.FC<EmployeeTableProps> = ({
  isAdmin,
  page,
  rowsPerPage,
  onChangePage,
  onChangeRowsPerPage,
  onFilterDrawerOpen,
  onClearFilters,
  isFiltered,
  handleClick,
  employees,
  isLoading
}) => {
  const [searchValue, setSearchValue] = useState('');
  const loginState = useSelector((state: RootState) => state.user.login);
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div style={{ margin: "1rem", padding: "1rem" }}>
      <TableContainer component={Paper}>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', border: "1px solid #dee2e6", borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }}>
          <StyledTextField
            variant="outlined"
            placeholder="Search By Employee Name"
            value={searchValue}
            onChange={handleSearchChange}
            size='small'
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
                sx={{ background: "#437EF7", color: "white", marginInline: "1rem" }}
                onClick={onClearFilters}
              >
                Clear Filters
              </CustomButton>
            )}
         <CustomButton
              variant="outlined"
              sx={{ background: "white", color: "#437EF7", marginInline: "1rem" }}
              endIcon={<FilterAltOutlinedIcon />}
              onClick={onFilterDrawerOpen}
            >
              Filters
            </CustomButton>
          </div>
        </div>
    
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Employee Name</StyledTableCell>
                  <StyledTableCell>Email</StyledTableCell>
                  <StyledTableCell>Hired Date</StyledTableCell>
                  <StyledTableCell>Phone Number</StyledTableCell>
                  <StyledTableCell>Position</StyledTableCell>
                  <StyledTableCell>Status</StyledTableCell>
                  <StyledTableCell>Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading ? (
                <StyledTableRow>
                <StyledTableCell colSpan={7} align="center">
                   <CircularProgress />
                </StyledTableCell>
              </StyledTableRow>
        ) :filteredEmployees.length > 0 ? (
                  filteredEmployees.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage).map((employee, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell>{employee.name}</StyledTableCell>
                      <StyledTableCell>{employee.email}</StyledTableCell>
                      <StyledTableCell>{moment(employee.startDate).format('YYYY-MM-DD')}</StyledTableCell>
                      <StyledTableCell>{employee.contactNumber}</StyledTableCell>
                      <StyledTableCell>{employee.position}</StyledTableCell>
                      <StyledTableCell>
                        <Box
                          display="flex"
                          alignItems="center"
                          sx={{
                            backgroundColor: getStatusStyles(employee.status).backgroundColor,
                            borderRadius: '5px',
                            padding: '2px 8px',
                            maxWidth: '5.3rem'
                          }}
                        >
                          <Box
                            sx={{
                              backgroundColor: getStatusStyles(employee.status).dotColor,
                              width: '8px',
                              height: '8px',
                              borderRadius: '50%',
                              marginRight: '0.5rem'
                            }}
                          ></Box>
                          <Typography
                            sx={{
                              color: getStatusStyles(employee.status).textColor,
                              fontWeight: '600'
                            }}
                          >
                            {employee.status}
                          </Typography>
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell>
                        {(isAdmin || (!isAdmin && employee._id === loginState.data.userId)) && (
                              <IconButton onClick={() => handleClick('VIEW', employee._id)}>
                                <Visibility />
                              </IconButton>
                            )}
                          { isAdmin &&     <IconButton onClick={() => handleClick('EDIT', employee._id)}>
                          <Edit />
                        </IconButton>}
                        { isAdmin &&    <IconButton onClick={() => handleClick('DELETE', employee._id)}>
                          <Delete />
                        </IconButton>}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))
                ) : (
                  <StyledTableRow>
                    <StyledTableCell colSpan={7} align="center">
                      No Records Found
                    </StyledTableCell>
                  </StyledTableRow>
                )}
              </TableBody>
            </Table>
            <Box display="flex" justifyContent="center" sx={{ borderTop: "1px solid #dee2e6", borderRadius: "1px", padding: "1rem" }}>
              <CustomPagination
                count={Math.ceil(filteredEmployees.length / rowsPerPage)}
                page={page}
                onChangePage={onChangePage}
                filteredProjects={filteredEmployees}
                rowsPerPage={rowsPerPage}
                onChangeRowsPerPage={onChangeRowsPerPage}
              />
            </Box>
        
      </TableContainer>
    </div>
  );
};

export default EmployeeTable;

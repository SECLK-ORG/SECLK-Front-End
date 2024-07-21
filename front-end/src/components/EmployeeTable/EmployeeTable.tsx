import React from 'react';
import {
  TableContainer, Paper, Table, TableHead, TableRow, TableBody,
  IconButton, TextField, InputAdornment, Box, Typography, TableCell
} from '@mui/material';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { Visibility, Edit, Search } from '@mui/icons-material';
import { CustomButton } from '../../assets/theme/theme';
import CustomPagination from '../CustomPagination/CustomPagination';

interface Employee {
  name: string;
  email: string;
  hireDate: string;
  phoneNumber: string;
  position: string;
  status: 'Active' | 'Inactive';
}

interface EmployeeTableProps {
  page: number;
  rowsPerPage: number;
  categoryFilters: { [key: string]: boolean };
  onChangePage: (event: React.ChangeEvent<unknown>, newPage: number) => void;
  onChangeRowsPerPage: (event: any) => void;
  onFilterDrawerOpen: () => void;
  onClearFilters: () => void;
  isFiltered: boolean;
  handleClick: (mode: string, employeeId: string) => void;
  statusFilters: { [key: string]: boolean };
}

const employees: Employee[] = [
  { name: 'Chaminda Silva', email: 'chaminda.silva@seclk.com', hireDate: '23/08/2023', phoneNumber: '+94 77 1234567', position: 'Software Engineer', status: 'Active' },
  { name: 'Nimal Perera', email: 'nimal.perera@seclk.com', hireDate: '23/08/2023', phoneNumber: '+94 71 2345678', position: 'Software Engineer', status: 'Active' },
  { name: 'Malini Fernando', email: 'malini.fernando@seclk.com', hireDate: '23/08/2023', phoneNumber: '+94 76 3456789', position: 'Software Engineer', status: 'Active' },
  { name: 'Saman Bandara', email: 'saman.bandara@seclk.com', hireDate: '23/08/2023', phoneNumber: '+94 70 4567890', position: 'UX Engineer', status: 'Active' },
  { name: 'Priya Rajapakse', email: 'priya.rajapakse@seclk.com', hireDate: '23/08/2023', phoneNumber: '+94 76 5678901', position: 'QA Engineer', status: 'Inactive' },
  { name: 'Saman Bandara', email: 'saman.bandara@seclk.com', hireDate: '23/08/2023', phoneNumber: '+94 70 4567890', position: 'UX Engineer', status: 'Active' },
  { name: 'Priya Rajapakse', email: 'priya.rajapakse@seclk.com', hireDate: '23/08/2023', phoneNumber: '+94 76 5678901', position: 'QA Engineer', status: 'Inactive' },
  { name: 'Saman Bandara', email: 'saman.bandara@seclk.com', hireDate: '23/08/2023', phoneNumber: '+94 70 4567890', position: 'UX Engineer', status: 'Active' },
  { name: 'Priya Rajapakse', email: 'priya.rajapakse@seclk.com', hireDate: '23/08/2023', phoneNumber: '+94 76 5678901', position: 'QA Engineer', status: 'Inactive' },
  { name: 'Priya Rajapakse', email: 'priya.rajapakse@seclk.com', hireDate: '23/08/2023', phoneNumber: '+94 76 5678901', position: 'QA Engineer', status: 'Inactive' },
  { name: 'Saman Bandara', email: 'saman.bandara@seclk.com', hireDate: '23/08/2023', phoneNumber: '+94 70 4567890', position: 'UX Engineer', status: 'Active' },
  { name: 'Priya Rajapakse', email: 'priya.rajapakse@seclk.com', hireDate: '23/08/2023', phoneNumber: '+94 76 5678901', position: 'QA Engineer', status: 'Inactive' },
  { name: 'Saman Bandara', email: 'saman.bandara@seclk.com', hireDate: '23/08/2023', phoneNumber: '+94 70 4567890', position: 'UX Engineer', status: 'Active' },
  { name: 'Priya Rajapakse', email: 'priya.rajapakse@seclk.com', hireDate: '23/08/2023', phoneNumber: '+94 76 5678901', position: 'QA Engineer', status: 'Inactive' },
];

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
  page,
  rowsPerPage,
  categoryFilters,
  statusFilters,
  onChangePage,
  onChangeRowsPerPage,
  onFilterDrawerOpen,
  onClearFilters,
  isFiltered,
  handleClick
}) => {
  // Filter employees based on position and status filters
  const filteredEmployees = employees
    .filter((employee) =>
      (categoryFilters['Software Engineer'] && employee.position === 'Software Engineer') ||
      (categoryFilters['UX Engineer'] && employee.position === 'UX Engineer') ||
      (categoryFilters['QA Engineer'] && employee.position === 'QA Engineer') ||
      (!categoryFilters['Software Engineer'] && !categoryFilters['UX Engineer'] && !categoryFilters['QA Engineer'])
    )
    .filter((employee) =>
      (statusFilters['Active'] && employee.status === 'Active') ||
      (statusFilters['Inactive'] && employee.status === 'Inactive') ||
      (!statusFilters['Active'] && !statusFilters['Inactive'])
    );

  return (
    <div style={{ margin: "1rem", padding: "1rem" }}>
      <TableContainer component={Paper}>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', border: "1px solid #dee2e6",borderTopLeftRadius:"8px",borderTopRightRadius:"8px" }}>
          <TextField
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
                sx={{ background: "white", color: "#437EF7", marginInline: "1rem" }}
                onClick={onClearFilters}
              >
                Clear Filters
              </CustomButton>
            )}
            <CustomButton
              variant="outlined"
              endIcon={<FilterAltOutlinedIcon />}
              sx={{ background: "white", color: "#437EF7", marginInline: "1rem" }}
              onClick={onFilterDrawerOpen}
            >
              Filters
            </CustomButton>
          </div>
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Hired Date</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEmployees.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage).map((employee, index) => (
              <TableRow key={index}>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.hireDate}</TableCell>
                <TableCell>{employee.phoneNumber}</TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell>
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
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => { handleClick('VIEW', "234") }}>
                    <Visibility />
                  </IconButton>
                  <IconButton>
                    <Edit />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
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

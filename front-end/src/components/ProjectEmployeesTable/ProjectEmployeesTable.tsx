import React from 'react';
import {
  TableContainer, Paper, Table, TableHead, TableRow, TableBody,
  IconButton, InputAdornment, Box, Typography,
  TableCell
} from '@mui/material';
import { Visibility, Edit, Search, FilterAltOutlined } from '@mui/icons-material';
import CustomPagination from '../CustomPagination/CustomPagination';
import CustomButton from '../shared/CustomButton/CustomButton';
import { StyledTextField } from '../../assets/theme/theme';

interface ProjectEmployees {
  name: string;
  position: string;
  email: string;
  projectStartedDate: string;
}

interface ProjectEmployeesTableProps {
  page: number;
  rowsPerPage: number;
  onChangePage: (event: React.ChangeEvent<unknown>, newPage: number) => void;
  onChangeRowsPerPage: (event: any) => void;
  onFilterDrawerOpen: () => void;
  onClearFilters: () => void;
  isFiltered: boolean;
  handleClick: (mode: string, employeeId: string) => void;
}

const employees: ProjectEmployees[] = [
  { name: 'Amali Wijesinghe', position: 'QA Engineer', email: 'amali.wijesinghe@gmail.com', projectStartedDate: '23/08/2023' },
  { name: 'Dinesh Kumarasinghe', position: 'Business Analyst', email: 'dinesh.kumarasinghe@gmail.com', projectStartedDate: '23/08/2023' },
  { name: 'Ruwan Jayasinghe', position: 'Software Engineer', email: 'ruwan.jayasinghe@gmail.com', projectStartedDate: '23/08/2023' },
  { name: 'Kavindi Senanayake', position: 'UI/UX Designer', email: 'kavindi.senanayake@gmail.com', projectStartedDate: '23/08/2023' },
  { name: 'Mahesh Bandara', position: 'QA Engineer', email: 'mahesh.bandara@gmail.com', projectStartedDate: '23/08/2023' },
];

const ProjectEmployeesTable: React.FC<ProjectEmployeesTableProps> = ({
  page,
  rowsPerPage,
  onChangePage,
  onChangeRowsPerPage,
  onFilterDrawerOpen,
  onClearFilters,
  isFiltered,
  handleClick
}) => {
  return (
    <div>
      <TableContainer component={Paper}>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', borderBottom: "1px solid #e0e0e0" }}>
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
              onClick={onFilterDrawerOpen}
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
            {employees.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage).map((employee, index) => (
              <TableRow key={index}>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.projectStartedDate}</TableCell>
                <TableCell>
                  <IconButton onClick={() => { handleClick('VIEW', employee.name) }}>
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
                  count={Math.ceil(employees.length / rowsPerPage)}
                  page={page}
                  onChangePage={onChangePage}
                  rowsPerPage={rowsPerPage}
                  onChangeRowsPerPage={onChangeRowsPerPage}
                   filteredProjects={employees}        />
                    </Box>
      </TableContainer>
    
    </div>
  );
};

export default ProjectEmployeesTable;

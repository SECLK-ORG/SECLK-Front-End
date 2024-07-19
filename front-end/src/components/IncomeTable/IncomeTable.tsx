import React from 'react';
import {
  TableContainer, Paper, Table, TableHead, TableRow, TableBody,
  IconButton, TextField, InputAdornment, Box, Typography,
  TableCell
} from '@mui/material';
import { Visibility, Edit, Search, FilterAltOutlined } from '@mui/icons-material';
import CustomPagination from '../CustomPagination/CustomPagination';
import CustomButton from '../shared/CustomButton/CustomButton';

interface Income {
  amount: string;
  invoiceNumber: string;
  receivedBy: string;
  date: string;
}

interface IncomeTableProps {
  page: number;
  rowsPerPage: number;
  onChangePage: (event: React.ChangeEvent<unknown>, newPage: number) => void;
  onChangeRowsPerPage: (event: any) => void;
  onFilterDrawerOpen: () => void;
  onClearFilters: () => void;
  isFiltered: boolean;
  handleClick: (mode: string, incomeId: string) => void;
}

const incomes: Income[] = [
  { amount: '$200', invoiceNumber: '100 200 300', receivedBy: 'Lahiru Perera', date: '23/08/2023' },
  { amount: '$25', invoiceNumber: '101 202 303', receivedBy: 'Lahiru Perera', date: '23/08/2023' },
  { amount: '$100', invoiceNumber: '102 203 304', receivedBy: 'Lahiru Perera', date: '23/08/2023' },
  { amount: '$150', invoiceNumber: '103 204 305', receivedBy: 'Lahiru Perera', date: '23/08/2023' },
  { amount: '$250', invoiceNumber: '104 205 306', receivedBy: 'Lahiru Perera', date: '23/08/2023' },
];

const IncomeTable: React.FC<IncomeTableProps> = ({
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
              <IconButton
                style={{ background: "#437EF7", color: "white", marginInline: "1rem" }}
                onClick={onClearFilters}
              >
                Clear Filters
              </IconButton>
            )}
            <CustomButton
              text='Add Income'
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
              <TableCell>Amount</TableCell>
              <TableCell>Invoice Number</TableCell>
              <TableCell>Received By</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {incomes.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage).map((income, index) => (
              <TableRow key={index}>
                <TableCell>{income.amount}</TableCell>
                <TableCell>{income.invoiceNumber}</TableCell>
                <TableCell>{income.receivedBy}</TableCell>
                <TableCell>{income.date}</TableCell>
                <TableCell>
                  <IconButton onClick={() => { handleClick('VIEW', income.invoiceNumber) }}>
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
        <CustomPagination
                  count={Math.ceil(incomes.length / rowsPerPage)}
                  page={page}
                  onChangePage={onChangePage}
                  rowsPerPage={rowsPerPage}
                  onChangeRowsPerPage={onChangeRowsPerPage} 
                  filteredProjects={[]}        />
      </TableContainer>
    </div>
  );
};

export default IncomeTable;

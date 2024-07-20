// PaymentHistoryTable.tsx
import React from 'react';
import {
  TableContainer, Paper, Table, TableHead, TableRow, TableBody,
  IconButton, TextField, InputAdornment, Box, TableCell
} from '@mui/material';
import { Visibility, Edit, Search } from '@mui/icons-material';
import CustomPagination from '../CustomPagination/CustomPagination';
import CustomButton from '../shared/CustomButton/CustomButton';

interface PaymentHistory {
  project: string;
  category: string;
  amount: string;
  description: string;
  invoiceNumber: string;
  date: string;
}

interface PaymentHistoryTableProps {
  page: number;
  rowsPerPage: number;
  onChangePage: (event: React.ChangeEvent<unknown>, newPage: number) => void;
  onChangeRowsPerPage: (event: any) => void;
  onFilterDrawerOpen: () => void;
  onClearFilters: () => void;
  isFiltered: boolean;
  handleClick: (mode: string, invoiceNumber: string) => void;
}

const payments: PaymentHistory[] = [
  { project: 'ZenSpace Mobile App', category: 'Salary', amount: '$200', description: 'Monthly Payment', invoiceNumber: '100 200 300', date: '23/08/2023' },
  { project: 'ZenSpace Mobile App', category: 'Salary', amount: '$25', description: 'Monthly Payment', invoiceNumber: '101 202 303', date: '23/07/2023' },
  { project: 'Navigation Overhaul', category: 'Salary', amount: '$100', description: 'Monthly Payment', invoiceNumber: '102 203 304', date: '23/06/2023' },
  { project: 'Navigation Overhaul', category: 'Salary', amount: '$150', description: 'Monthly Payment', invoiceNumber: '103 204 305', date: '23/05/2023' },
  { project: 'Navigation Overhaul', category: 'Salary', amount: '$250', description: 'Monthly Payment', invoiceNumber: '104 205 306', date: '23/04/2023' },
];

const PaymentHistoryTable: React.FC<PaymentHistoryTableProps> = ({
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
              text='Add Payment'
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
              <TableCell>Project</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Invoice Number</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage).map((payment, index) => (
              <TableRow key={index}>
                <TableCell>{payment.project}</TableCell>
                <TableCell>{payment.category}</TableCell>
                <TableCell>{payment.amount}</TableCell>
                <TableCell>{payment.description}</TableCell>
                <TableCell>{payment.invoiceNumber}</TableCell>
                <TableCell>{payment.date}</TableCell>
                <TableCell>
                  <IconButton onClick={() => { handleClick('VIEW', payment.invoiceNumber) }}>
                    <Visibility />
                  </IconButton>
                  <IconButton onClick={() => { handleClick('EDIT', payment.invoiceNumber) }}>
                    <Edit />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box display="flex" justifyContent="center" sx={{ borderTop: "1px solid #dee2e6", borderRadius: "1px", padding: "1rem" }}>
          <CustomPagination
            count={Math.ceil(payments.length / rowsPerPage)}
            page={page}
            onChangePage={onChangePage}
            rowsPerPage={rowsPerPage}
            onChangeRowsPerPage={onChangeRowsPerPage}
            filteredProjects={payments} // Adjust this if necessary
          />
        </Box>
      </TableContainer>
    </div>
  );
};

export default PaymentHistoryTable;

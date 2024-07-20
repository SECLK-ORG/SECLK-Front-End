import React from 'react';
import {
  TableContainer, Paper, Table, TableHead, TableRow, TableBody,
  IconButton, TextField, InputAdornment, Box, Typography,
  TableCell
} from '@mui/material';
import { Visibility, Edit, Search, FilterAltOutlined } from '@mui/icons-material';
import { Pagination } from '@mui/material';
import CustomPagination from '../CustomPagination/CustomPagination';
import CustomButton from '../shared/CustomButton/CustomButton';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';

interface Expense {
  name: string;
  category: string;
  vendor: string;
  amount: string;
  description: string;
  invoiceNumber: string;
  date: string;
}

interface ExpensesTableProps {
  page: number;
  rowsPerPage: number;
  onChangePage: (event: React.ChangeEvent<unknown>, newPage: number) => void;
  onChangeRowsPerPage: (event:any,) => void;
  onFilterDrawerOpen: () => void;
  onClearFilters: () => void;
  isFiltered: boolean;
  handleClick: (mode: string, expenseId: string) => void;
}

const expenses: Expense[] = [
  {
    name: 'Expense 1',
    category: 'Salary',
    vendor: 'Kalana Malith',
    amount: '$200',
    description: 'Software Engineer',
    invoiceNumber: '100 200 300',
    date: '23/08/2023',
  },
  {
    name: 'Expense 2',
    category: 'Subscription',
    vendor: 'Freepik',
    amount: '$25',
    description: 'Subscription payment',
    invoiceNumber: '101 202 303',
    date: '23/08/2023',
  },
  {
    name: 'Expense 3',
    category: 'Salary',
    vendor: 'Nuwan Thushara',
    amount: '$100',
    description: 'UX Designer',
    invoiceNumber: '102 203 304',
    date: '23/08/2023',
  },
  {
    name: 'Expense 4',
    category: 'Salary',
    vendor: 'Kalana Perera',
    amount: '$150',
    description: 'QA Engineer',
    invoiceNumber: '103 204 305',
    date: '23/08/2023',
  },
  {
    name: 'Expense 5',
    category: 'Salary',
    vendor: 'Kesara Charith',
    amount: '$250',
    description: 'QA Engineer',
    invoiceNumber: '104 205 306',
    date: '23/08/2023',
  },
];

const ExpensesTable: React.FC<ExpensesTableProps> = ({
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
    <div style={{  }}>
      <TableContainer component={Paper}>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem',borderBottom:"1px solid #e0e0e0" }}>
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
            {/* <CustomButton
               variant="outlined"
               endIcon={<FilterAltOutlinedIcon />}
               style={{ textTransform: 'full-width', backgroundColor: 'white' }}
               onClick={onFilterDrawerOpen}

            >
              Filters
            </CustomButton> */}
            <CustomButton
            text='add Expense'
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
              <TableCell>Category</TableCell>
              <TableCell>Vendor</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Invoice Number</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage).map((expense, index) => (
              <TableRow key={index}>
                <TableCell>{expense.category}</TableCell>
                <TableCell>{expense.vendor}</TableCell>
                <TableCell>{expense.amount}</TableCell>
                <TableCell>{expense.description}</TableCell>
                <TableCell>{expense.invoiceNumber}</TableCell>
                <TableCell>{expense.date}</TableCell>
                <TableCell>
                  <IconButton onClick={() => { handleClick('VIEW', expense.name) }}>
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
  count={Math.ceil(expenses.length / rowsPerPage)}
  page={page}
  onChangePage={onChangePage}
  filteredProjects={expenses}
  rowsPerPage={rowsPerPage}
  onChangeRowsPerPage={onChangeRowsPerPage}
/>
</Box>
      </TableContainer>
    </div>
  );
};

export default ExpensesTable;

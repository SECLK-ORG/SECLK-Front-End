import React, { useState } from 'react';
import {
  TableContainer, Paper, Table, TableHead, TableRow, TableBody,
  IconButton, InputAdornment, Box, Typography,
  TableCell,
  CircularProgress
} from '@mui/material';
import { Visibility, Edit, Search, Delete } from '@mui/icons-material';
import CustomPagination from '../CustomPagination/CustomPagination';
import CustomButton from '../shared/CustomButton/CustomButton';
import { StyledTextField } from '../../assets/theme/theme';
import { Expense, predefinedRanges } from '../../utilities/models';
import { SCREEN_MODES } from '../../utilities/constants/app.constants';
import moment from 'moment';
import { DateRangePicker } from 'rsuite';
import { addDays } from 'date-fns';
import 'rsuite/dist/rsuite-no-reset.min.css';
// import 'rsuite/DateRangePicker/styles/index.css';

interface ExpensesTableProps {
  page: number;
  rowsPerPage: number;
  onChangePage: (event: React.ChangeEvent<unknown>, newPage: number) => void;
  onChangeRowsPerPage: (event: any) => void;
  onFilterDrawerOpen: () => void;
  onClearFilters: () => void;
  isFiltered: boolean;
  handleClick: (mode: string, expenseId: string) => void;
  expenses: Expense[];
  isExpensesLoading?: boolean;
}

const ExpensesTable: React.FC<ExpensesTableProps> = ({
  page,
  rowsPerPage,
  onChangePage,
  onChangeRowsPerPage,
  onFilterDrawerOpen,
  onClearFilters,
  isFiltered,
  handleClick,
  expenses,
  isExpensesLoading
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [dateRange, setDateRange] = useState<[Date, Date] | null>(null);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const filterExpenses = expenses.filter((expense) => {
    const matchesSearch = expense.vendor.toLowerCase().includes(searchValue.toLowerCase());
    const matchesDateRange =
      (!dateRange || 
        (moment(expense.date).isSameOrAfter(dateRange[0], 'day') &&
         moment(expense.date).isSameOrBefore(dateRange[1], 'day')));

    return matchesSearch && matchesDateRange;
  });

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
        <DateRangePicker
            showOneCalendar
            ranges={predefinedRanges}
            value={dateRange}
            onChange={(newValue) => setDateRange(newValue as [Date, Date] | null)}
            format="MM/dd/yyyy"
            placeholder="Select Date Range"
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
              text='Add Expense'
              backgroundColor='#437EF7'
              color='white'
              variant='contained'
              onClick={() => { handleClick(SCREEN_MODES.CREATE, "") }}
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
            {isExpensesLoading ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : filterExpenses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No records found
                </TableCell>
              </TableRow>
            ) : (
              filterExpenses.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage).map((expense, index) => (
                <TableRow key={index}>
                  <TableCell>{expense.category}</TableCell>
                  <TableCell>{expense.vendor}</TableCell>
                  <TableCell>{expense.amount}</TableCell>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell>{expense.invoiceNumber}</TableCell>
                  <TableCell>{moment(expense.date).format('YYYY-MM-DD')}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => { handleClick(SCREEN_MODES.VIEW, expense._id) }}>
                      <Visibility />
                    </IconButton>
                    <IconButton onClick={() => { handleClick(SCREEN_MODES.EDIT, expense._id) }}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => { handleClick(SCREEN_MODES.DELETE, expense._id) }}>
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
            count={Math.ceil(filterExpenses.length / rowsPerPage)}
            page={page}
            onChangePage={onChangePage}
            filteredProjects={filterExpenses}
            rowsPerPage={rowsPerPage}
            onChangeRowsPerPage={onChangeRowsPerPage}
          />
        </Box>
      </TableContainer>
    </div>
  );
};

export default ExpensesTable;

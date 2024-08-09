import React from 'react';
import {
  TableContainer, Paper, Table, TableHead, TableRow, TableBody,
  IconButton, InputAdornment, Box, Typography,
  TableCell,
  TextField,
  CircularProgress
} from '@mui/material';
import { Visibility, Edit, Search } from '@mui/icons-material';
import CustomPagination from '../CustomPagination/CustomPagination';
import CustomButton from '../shared/CustomButton/CustomButton';
import { Income } from '../../utilities/models';
import { SCREEN_MODES } from '../../utilities/constants/app.constants';

interface IncomeTableProps {
  page: number;
  isIncomeLoading: boolean;
  rowsPerPage: number;
  onChangePage: (event: React.ChangeEvent<unknown>, newPage: number) => void;
  onChangeRowsPerPage: (event: any) => void;
  onFilterDrawerOpen: () => void;
  onClearFilters: () => void;
  isFiltered: boolean;
  handleClick: (mode: string, incomeId: string) => void;
  incomes: Income[];
}

const IncomeTable: React.FC<IncomeTableProps> = ({
  page,
  rowsPerPage,
  onChangePage,
  onChangeRowsPerPage,
  onFilterDrawerOpen,
  onClearFilters,
  isFiltered,
  handleClick,
  incomes,
  isIncomeLoading
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
              onClick={() => { handleClick(SCREEN_MODES.CREATE, '') }}
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
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isIncomeLoading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : incomes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No records found
                </TableCell>
              </TableRow>
            ) : (
              incomes.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage).map((income, index) => (
                <TableRow key={income._id}>
                  <TableCell>{income.amount}</TableCell>
                  <TableCell>{income.invoiceNumber}</TableCell>
                  <TableCell>{income.receivedBy}</TableCell>
                  <TableCell>{income.date}</TableCell>
                  <TableCell>{income.description}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => { handleClick(SCREEN_MODES.VIEW, income.invoiceNumber) }}>
                      <Visibility />
                    </IconButton>
                    <IconButton>
                      <Edit />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <Box display="flex" justifyContent="center" sx={{ borderTop: "1px solid #dee2e6", borderRadius: "1px", padding: "1rem" }}>
          <CustomPagination
            count={Math.ceil(incomes.length / rowsPerPage)}
            page={page}
            onChangePage={onChangePage}
            rowsPerPage={rowsPerPage}
            onChangeRowsPerPage={onChangeRowsPerPage}
            filteredProjects={incomes}
          />
        </Box>
      </TableContainer>
    </div>
  );
};

export default IncomeTable;

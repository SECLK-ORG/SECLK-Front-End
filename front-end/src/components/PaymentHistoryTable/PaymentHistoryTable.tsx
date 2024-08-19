import React, { useState } from 'react';
import {
  TableContainer, Paper, Table, TableHead, TableRow, TableBody,
  IconButton, InputAdornment, Box, Typography, CircularProgress, TableCell
} from '@mui/material';
import { Visibility, Edit, Search } from '@mui/icons-material';
import CustomPagination from '../CustomPagination/CustomPagination';
import { CustomButton as CSBtn, StyledTextField } from '../../assets/theme/theme';
import { PaymentHistory, predefinedRanges } from '../../utilities/models';
import { SCREEN_MODES } from '../../utilities/constants/app.constants';
import CustomButton from '../shared/CustomButton/CustomButton';
import moment from 'moment';
import { DateRangePicker } from 'rsuite';

interface PaymentHistoryTableProps {
  page: number;
  rowsPerPage: number;
  onChangePage: (event: React.ChangeEvent<unknown>, newPage: number) => void;
  onChangeRowsPerPage: (event: any) => void;
  onFilterDrawerOpen: () => void;
  onClearFilters: () => void;
  isFiltered: boolean;
  handleClick: (mode: string, id: any) => void;
  paymentHistory: PaymentHistory[];
  isLoading: boolean;
}

const PaymentHistoryTable: React.FC<PaymentHistoryTableProps> = ({
  page,
  rowsPerPage,
  onChangePage,
  onChangeRowsPerPage,
  onFilterDrawerOpen,
  onClearFilters,
  isFiltered,
  handleClick,
  paymentHistory,
  isLoading
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [dateRange, setDateRange] = useState<[Date, Date] | null>(null);
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };


  const filteredPayments = paymentHistory.filter((payment) => {
    const matchesSearch =   payment.projectId.projectName.toLowerCase().includes(searchValue.toLowerCase())
    const matchesDateRange =
      (!dateRange || 
        (moment(payment.date).isSameOrAfter(dateRange[0], 'day') &&
         moment(payment.date).isSameOrBefore(dateRange[1], 'day')));

    return matchesSearch && matchesDateRange;
  });

  return (
    <div style={{ margin: "1rem", padding: "1rem" }}>
      <TableContainer component={Paper}>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', borderBottom: "1px solid #e0e0e0" }}>
          <StyledTextField
            variant="outlined"
            placeholder="Search By Project Name"
            value={searchValue}
            onChange={handleSearchChange}
            size="small"
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
          <div style={{justifyContent:"space-evenly", display:"flex"}}>
          <DateRangePicker
            showOneCalendar
            ranges={predefinedRanges}
            value={dateRange}
            onChange={(newValue) => setDateRange(newValue as [Date, Date] | null)}
            format="MM/dd/yyyy"
            placeholder="Select Date Range"
          />
          <div style={{marginInline:"1rem"}}>
          </div>
         <CustomButton
              text='Add Payment'
              backgroundColor='#437EF7'
              color='white'
              variant='contained'
              onClick={()=>{handleClick(SCREEN_MODES.CREATE,'')}}          />
              </div>
             
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
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : filteredPayments.length > 0 ? (
              filteredPayments.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage).map((payment) => (
                <TableRow key={payment._id}>
                  <TableCell>{payment.projectId.projectName}</TableCell>
                  <TableCell>{payment.category}</TableCell>
                  <TableCell>{payment.amount}</TableCell>
                  <TableCell>{payment.description}</TableCell>
                  <TableCell>{payment.invoiceNumber}</TableCell>
                  <TableCell>{moment(payment.date).format('YYYY-MM-DD')}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleClick('VIEW', payment.invoiceNumber)}>
                      <Visibility />
                    </IconButton>
                    <IconButton onClick={() => handleClick('EDIT', payment.invoiceNumber)}>
                      <Edit />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No Records Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <Box display="flex" justifyContent="center" sx={{ borderTop: "1px solid #dee2e6", borderRadius: "1px", padding: "1rem" }}>
          <CustomPagination
            count={Math.ceil(filteredPayments.length / rowsPerPage)}
            page={page}
            onChangePage={onChangePage}
            rowsPerPage={rowsPerPage}
            onChangeRowsPerPage={onChangeRowsPerPage} 
            filteredProjects={filteredPayments}          />
        </Box>
      </TableContainer>
    </div>
  );
};

export default PaymentHistoryTable;

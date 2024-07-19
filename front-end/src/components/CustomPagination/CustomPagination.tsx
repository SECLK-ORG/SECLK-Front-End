import React from 'react';
import { Pagination, PaginationItem, Box, IconButton, Typography, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

interface CustomPaginationProps {
  count: number;
  page: number;
  onChangePage: (event: React.ChangeEvent<unknown>, page: number) => void;
  filteredProjects: any[];
  rowsPerPage: number;
  onChangeRowsPerPage: (event: SelectChangeEvent<number>) => void;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  count,
  page,
  onChangePage,
  filteredProjects,
  rowsPerPage,
  onChangeRowsPerPage,
}) => {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
      <Box display="flex" alignItems="center">
        <IconButton onClick={(e) => onChangePage(e, page - 1)} disabled={page === 1}>
          <ArrowBack />
          <Typography variant="body2" sx={{ color: "#5F6D7E" }}>Prev</Typography>
        </IconButton>
      </Box>
      <Box display="flex" alignItems="center">
        <Pagination
          count={Math.ceil(filteredProjects.length / rowsPerPage)}
          page={page}
          onChange={onChangePage}
          size="large"
          shape="circular"
          variant="text"
          renderItem={(item) => (
            <PaginationItem
              components={{
                previous: () => (
                  <></>
                ),
                next: () => (
                  <></>
                ),
              }}
              {...item}
              sx={{
                '&.MuiPaginationItem-page': {
                  display: 'flex',
                  justifyContent: 'center',
                },
                '&.MuiPaginationItem-page.Mui-selected': {
                  backgroundColor: 'white',
                  color: '#437EF7',
                },
                '&.MuiPaginationItem-page:hover': {
                  backgroundColor: 'none',
                },
                '&.MuiPaginationItem-previous, &.MuiPaginationItem-next': {
                  display: "none"
                },
              }}
            />
          )}
        />
        <Box sx={{ justifyContent:"flex-end" }}>
        <FormControl variant="outlined" sx={{ minWidth: 80,maxHeight:60}}>
          <Select
            labelId="rows-per-page-label"
            value={rowsPerPage}
            onChange={onChangeRowsPerPage}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
          </Select>
        </FormControl>
        </Box>
      </Box>
      <Box display="flex" alignItems="center">
        <IconButton onClick={(e) => onChangePage(e, page + 1)} disabled={page === count}>
          <Typography variant="body2" sx={{ color: "#5F6D7E" }}>Next</Typography>
          <ArrowForward />
        </IconButton>
      </Box>
    </Box>
  );
};

export default CustomPagination;

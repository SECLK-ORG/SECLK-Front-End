import React, { useState } from 'react';
import {
  TableContainer, Paper, Table, TableHead, TableRow, TableBody,
  IconButton, InputAdornment, Box, Typography
} from '@mui/material';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';

import { Visibility, Edit, Search } from '@mui/icons-material';
import { CustomButton, StickyTableCell, StyledTableCell, StyledTableRow, StyledTextField } from '../../assets/theme/theme';
import styles from './ProjectTable.module.scss';
import CustomPagination from '../CustomPagination/CustomPagination';
import { SCREEN_MODES } from '../../utilities/constants/app.constants';
import { Project } from '../../utilities/models';
import {ProjectStatus} from '../../utilities/models/common.model';
import moment from 'moment';

interface ProjectTableProps {
  projects: Project[];
  page: number;
  rowsPerPage: number;
  categoryFilters: { [key: string]: boolean };
  onChangePage: (event: React.ChangeEvent<unknown>, newPage: number) => void;
  onChangeRowsPerPage: (event:any,) => void;
  onFilterDrawerOpen: () => void;
  isFiltered: boolean;
  statusFilters: { [key: string]: boolean };
  onClearFilters: () => void;
  handleClick(Mode: string, projectId: string): void;
}

const ProjectTable: React.FC<ProjectTableProps> = ({
  projects,
  page,
  rowsPerPage,
  categoryFilters,
  onChangePage,
  onChangeRowsPerPage,
  onFilterDrawerOpen,
  onClearFilters,
  isFiltered,
  statusFilters,
  handleClick
}) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };


  const filteredProjects = projects.filter((project) =>
    (categoryFilters.US && project.category === 'US') ||
    (categoryFilters.UK && project.category === 'UK') ||
    (categoryFilters.Local && project.category === 'Local') ||
    (categoryFilters.Fiverr && project.category === 'Fiverr') ||
    (!categoryFilters.US && !categoryFilters.UK && !categoryFilters.Local && !categoryFilters.Fiverr)
  ).filter((project) =>
    (statusFilters.Completed && project.status === ProjectStatus.COMPLETED) ||
    (statusFilters.InProgress && project.status === ProjectStatus.IN_PROGRESS) ||
    (statusFilters.OnHold && project.status === ProjectStatus.ON_HOLD) ||
    (!statusFilters.Completed && !statusFilters.InProgress && !statusFilters.OnHold)
  ).filter((project) =>
    project.projectName.toLowerCase().includes(searchValue.toLowerCase()) ||
    moment(project.startDate).format('YYYY-MM-DD').includes(searchValue) ||
    moment(project.endDate).format('YYYY-MM-DD').includes(searchValue) ||
    project.category.toLowerCase().includes(searchValue.toLowerCase()) ||
    project.status.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div style={{ margin: "1rem", padding: "1rem" }}>
      <TableContainer component={Paper} className={styles.grid}>
        <div className={styles.gridContainer}>
          <StyledTextField
            variant="outlined"
            placeholder="Search By Project Name, Start Date, End Date, Category, Status"
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
          <div>
            {isFiltered && (
              <CustomButton
                variant="contained"
                style={{ background: "#437EF7", color: "black", marginInline: "1rem" }}
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
        <Table className={styles.table}>
          <TableHead className={styles.tableHead}>
            <TableRow>
              <StyledTableCell width={180}>Project Name</StyledTableCell>
              <StyledTableCell width={180}>Start Date</StyledTableCell>
              <StyledTableCell width={180}>End Date</StyledTableCell>
              <StyledTableCell width={180}>Category</StyledTableCell>
              <StyledTableCell width={180}>Resources Count</StyledTableCell>
              <StyledTableCell width={180}>Status</StyledTableCell>
              <StickyTableCell width={180}>Actions</StickyTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProjects.length > 0 ? (
              filteredProjects.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage).map((project) => (
                <StyledTableRow key={project._id}>
                  <StyledTableCell>{project.projectName}</StyledTableCell>
                  <StyledTableCell>{moment(project?.startDate).format('YYYY-MM-DD ')}</StyledTableCell>
                  <StyledTableCell>{moment(project?.endDate).format('YYYY-MM-DD ')}</StyledTableCell>
                  <StyledTableCell>{project.category}</StyledTableCell>
                  <StyledTableCell>{project.employees.length}</StyledTableCell>
                  <StyledTableCell>
                    <Box
                      display="flex"
                      alignItems="center"
                      sx={{
                        backgroundColor: project.status === 'Completed' ? '#F0FAF0' : '#FFF2F0',
                        borderRadius: '5px',
                        padding: '2px 8px',
                        maxWidth: '5.3rem'
                      }}
                    >
                      <Box
                        sx={{
                          backgroundColor: project.status === 'Completed' ? '#2D8A39' : '#E2341D',
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          marginRight: '0.5rem'
                        }}
                      ></Box>
                      <Typography
                        sx={{
                          color: project.status === 'Completed' ? '#2D8A39' : '#E2341D',
                          fontWeight: '600'
                        }}
                      >
                        {project.status}
                      </Typography>
                    </Box>
                  </StyledTableCell>
                  <StickyTableCell>
                    <IconButton onClick={() => { handleClick(SCREEN_MODES.VIEW, project._id) }}>
                      <Visibility />
                    </IconButton>
                    <IconButton>
                      <Edit />
                    </IconButton>
                  </StickyTableCell>
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
            count={Math.ceil(filteredProjects.length / rowsPerPage)}
            page={page}
            onChangePage={onChangePage}
            filteredProjects={filteredProjects}
            rowsPerPage={rowsPerPage}
            onChangeRowsPerPage={onChangeRowsPerPage}
          />
        </Box>
      </TableContainer>
    </div>
  );
};

export default ProjectTable;

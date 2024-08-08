import React, { useState } from 'react';
import {
  TableContainer, Paper, Table, TableHead, TableRow, TableBody,
  IconButton, InputAdornment, Box, Typography, CircularProgress
} from '@mui/material';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { Visibility, Edit, Search, Delete } from '@mui/icons-material';
import { CustomButton, StickyTableCell, StyledTableCell, StyledTableRow, StyledTextField } from '../../assets/theme/theme';
import styles from './ProjectTable.module.scss';
import CustomPagination from '../CustomPagination/CustomPagination';
import { SCREEN_MODES } from '../../utilities/constants/app.constants';
import { Project } from '../../utilities/models';
import { ProjectStatus } from '../../utilities/models/common.model';
import moment from 'moment';

interface ProjectTableProps {
  projects: Project[];
  page: number;
  rowsPerPage: number;
  onChangePage: (event: React.ChangeEvent<unknown>, newPage: number) => void;
  onChangeRowsPerPage: (event: any) => void;
  onFilterDrawerOpen: () => void;
  isFiltered: boolean;
  onClearFilters: () => void;
  handleTableAction(Mode: string, projectId: string): void;
  isLoading: boolean;
  isAdmin:boolean
}

const ProjectTable: React.FC<ProjectTableProps> = ({
  isAdmin,
  projects,
  page,
  rowsPerPage,
  onChangePage,
  onChangeRowsPerPage,
  onFilterDrawerOpen,
  onClearFilters,
  isFiltered,
  handleTableAction,
  isLoading
}) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const filteredProjects = projects.filter((project) =>
    project.projectName.toLowerCase().includes(searchValue.toLowerCase()) 
  );



  return (
    <div style={{ margin: "1rem", padding: "1rem" }}>
      <TableContainer component={Paper} className={styles.grid}>
        <div className={styles.gridContainer}>
          <StyledTextField
            variant="outlined"
            placeholder="Search By Project Name"
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
                sx={{ background: "#437EF7", color: "white", marginInline: "1rem" }}
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
        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
            <CircularProgress />
          </Box>
        ) : (
          <>
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
                            backgroundColor: project.status === ProjectStatus.COMPLETED ? '#F0FAF0' :
                              project.status === ProjectStatus.IN_PROGRESS ? '#FFF8E1' : '#FFF2F0',
                            borderRadius: '5px',
                            padding: '2px 8px',
                            maxWidth: '7.5rem'
                          }}
                        >
                          <Box
                            sx={{
                              backgroundColor: project.status === ProjectStatus.COMPLETED ? '#2D8A39' :
                                project.status === ProjectStatus.IN_PROGRESS ? '#FFA500' :
                                  project.status === ProjectStatus.ON_HOLD ? '#E2341D' : '#000000',
                              width: '8px',
                              height: '8px',
                              borderRadius: '50%',
                              marginRight: '0.5rem'
                            }}
                          ></Box>
                          <Typography
                            sx={{
                              color: project.status === ProjectStatus.COMPLETED ? '#2D8A39' :
                                project.status === ProjectStatus.IN_PROGRESS ? '#FFA500' :
                                  '#E2341D',
                              fontWeight: '600'
                            }}
                          >
                            {project.status}
                          </Typography>
                        </Box>
                      </StyledTableCell>
                      <StickyTableCell>
                        <IconButton onClick={() => { handleTableAction(SCREEN_MODES.VIEW, project._id) }}>
                          <Visibility />
                        </IconButton>
                    {isAdmin && <>    
                    <IconButton onClick={() => { handleTableAction(SCREEN_MODES.EDIT, project._id) }}>
                          <Edit  />
                        </IconButton>
                        <IconButton onClick={() => { handleTableAction(SCREEN_MODES.DELETE, project._id) }}>
                        <Delete />
                      </IconButton>
                      </>}
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
          </>
        )}
      </TableContainer>
    </div>
  );
};

export default ProjectTable;

import React from 'react';
import { TableContainer, Paper, Table, TableHead, TableRow, TableBody, IconButton, TableCell, TablePagination } from '@mui/material';
import { Visibility, Edit } from '@mui/icons-material';
import styles from './ProjectTable.module.scss';
import { CustomButton, StyledTableCell, StyledTableRow } from '../../assets/theme/theme';

interface ProjectCategoriesTableProps {
  categories: string[];
}

const ProjectCategoriesTable: React.FC<ProjectCategoriesTableProps> = ({ categories }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <TableContainer component={Paper} className={styles.grid}>
        <Table className={styles.table}>
          <TableHead className={styles.tableHead}>
            <TableRow>
              <TableCell sx={{fontWeight:"700",fontSize:"16px",color:"#A5ACBA"}}>Category</TableCell>
              <TableCell align="right" sx={{fontWeight:"700",fontSize:"16px",color:"#A5ACBA"}}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={styles.tableBody} >
            {categories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((category, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell>{category}</StyledTableCell>
                <StyledTableCell align="right">
                  <IconButton>
                    <Visibility />
                  </IconButton>
                  <IconButton>
                    <Edit />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      
      </TableContainer>
    </div>
  );
};

export default ProjectCategoriesTable;

import React from 'react';
import { TableContainer, Paper, Table, TableHead, TableRow, TableBody, IconButton, TableCell, TablePagination } from '@mui/material';
import { Visibility, Edit, Delete } from '@mui/icons-material';
import styles from './ProjectTable.module.scss';
import { StyledTableCell, StyledTableRow } from '../../assets/theme/theme';
import { Category } from '../../utilities/models';
import { SCREEN_MODES } from '../../utilities/constants/app.constants';


interface ProjectCategoriesTableProps {
  categories: Category[];
  handleTableAction(type: string, id: string): void;
}

const ProjectCategoriesTable: React.FC<ProjectCategoriesTableProps> = ({ categories,handleTableAction }) => {
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
              <TableCell sx={{ fontWeight: "700", fontSize: "16px", color: "#A5ACBA" }}>Category</TableCell>
              <TableCell align="right" sx={{ fontWeight: "700", fontSize: "16px", color: "#A5ACBA" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={styles.tableBody}>
            {categories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((category) => (
              <StyledTableRow key={category._id}>
                <StyledTableCell>{category.category}</StyledTableCell>
                <StyledTableCell align="right">
                  <IconButton>
                    <Visibility onClick={()=>{handleTableAction(SCREEN_MODES.VIEW,category._id)}}/>
                  </IconButton>
                  <IconButton>
                    <Edit onClick={()=>{handleTableAction(SCREEN_MODES.EDIT,category._id)}}/>
                  </IconButton>
                  <IconButton onClick={()=>{handleTableAction(SCREEN_MODES.DELETE,category._id)}}>
                    <Delete   />
                  </IconButton>
                  
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={categories.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default ProjectCategoriesTable;

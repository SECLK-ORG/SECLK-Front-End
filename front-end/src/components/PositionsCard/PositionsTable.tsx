import React from 'react';
import { TableContainer, Paper, Table, TableHead, TableRow, TableBody, IconButton, TableCell, TablePagination, CircularProgress } from '@mui/material';
import { Visibility, Edit, Delete } from '@mui/icons-material';
import styles from './ProjectTable.module.scss';
import { StyledTableCell, StyledTableRow } from '../../assets/theme/theme';
import { Positions } from '../../utilities/models';
import { SCREEN_MODES } from '../../utilities/constants/app.constants';

interface PositionsTableProps {
  positions: Positions[];
  handleTableAction(type: string, id: string): void;
  isPositionLoading: boolean;
}

const PositionsTable: React.FC<PositionsTableProps> = ({ positions, handleTableAction, isPositionLoading }) => {
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
      {isPositionLoading ? (
        <div className={styles.loadingContainer}>
          <CircularProgress />
        </div>
      ) : (
        <>
          <TableContainer component={Paper} className={styles.grid}>
            <Table className={styles.table}>
              <TableHead className={styles.tableHead}>
                <TableRow>
                  <TableCell sx={{ fontWeight: "700", fontSize: "16px", color: "#A5ACBA" }}>Position</TableCell>
                  <TableCell align="right" sx={{ fontWeight: "700", fontSize: "16px", color: "#A5ACBA" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className={styles.tableBody}>
                {positions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((position) => (
                  <StyledTableRow key={position._id}>
                    <StyledTableCell>{position.positions}</StyledTableCell>
                    <StyledTableCell align="right">
                      <IconButton onClick={() => { handleTableAction(SCREEN_MODES.VIEW, position._id) }}>
                        <Visibility />
                      </IconButton>
                      <IconButton onClick={() => { handleTableAction(SCREEN_MODES.EDIT, position._id) }}>
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => { handleTableAction(SCREEN_MODES.DELETE, position._id) }}>
                        <Delete />
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
            count={positions.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
    </div>
  );
};

export default PositionsTable;

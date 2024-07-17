import React from 'react'
import { Box, Card, CardContent, Typography, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import { ProjectDetailsBox, ProjectInfoCard } from '../../components';

const expenses = [
  { category: 'Salary', vendor: 'Kalana Malith', amount: 200, description: 'Software Engineer', invoiceNumber: '100 200 300', date: '23/08/2023' },
  { category: 'Subscription', vendor: 'Freepik', amount: 25, description: 'Subscription payment', invoiceNumber: '101 202 303', date: '23/08/2023' },
  { category: 'Salary', vendor: 'Nuwan Thushara', amount: 100, description: 'UX Designer', invoiceNumber: '102 203 304', date: '23/08/2023' },
  { category: 'Salary', vendor: 'Kalana Perera', amount: 150, description: 'QA Engineer', invoiceNumber: '103 204 305', date: '23/08/2023' },
  { category: 'Salary', vendor: 'Kesara Charith', amount: 250, description: 'QA Engineer', invoiceNumber: '104 205 306', date: '23/08/2023' },
];

const ProjectView = () => {
const navigate=useNavigate();

const handleBack=()=>{
    navigate(-1);
}
  return (
    <Box p={3} >
       <Box sx={{display:'flex' ,justifyContent:"left",alignItems:"center",marginBottom:"1rem"}}>
       <IconButton onClick={handleBack}>
        <ArrowBackIcon sx={{color:"black",}} />
      </IconButton>
      <Typography sx={{fontWeight:"600",fontSize:"28px", marginInline:"1rem"}}>ZenSpace Mobile App</Typography>
     <Box display="flex" alignItems="center" sx={{ backgroundColor: '#F0FAF0', borderRadius: '5px', padding:"2px 8px"  }}>
        <Box sx={{ backgroundColor: '#2D8A39', width: '8px', height: '8px', borderRadius: '50%', marginRight: '0.5rem' }}></Box>
        <Typography sx={{ color: '#2D8A39', fontWeight:"600" }}>Active</Typography>
      </Box>
    </Box> 

      <ProjectDetailsBox/>

      <Box mt={3} mb={3}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <ProjectInfoCard 
            title="Total Income"
            totalValue="$2500"
            currentValue="$1742"
            currentLabel="This Month"
            remaining="25"
            remainingLabel="25% Remaining"
            color="green"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <ProjectInfoCard 
            title="Total Expenses"
            totalValue="$1300"
            currentValue="$331"
            currentLabel="Remaining"
            color="red"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <ProjectInfoCard 
            title="Profit"
            totalValue="$1300"
            currentValue="$331"
            currentLabel="This Month"
            color="green"
          />
        </Grid>
      </Grid>
      </Box>
      <Button variant="contained" color="primary" style={{ marginBottom: '1rem' }}>Add Expense</Button>
      <TableContainer component={Paper}>
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
            {expenses.map((expense, index) => (
              <TableRow key={index}>
                <TableCell>{expense.category}</TableCell>
                <TableCell>{expense.vendor}</TableCell>
                <TableCell>${expense.amount}</TableCell>
                <TableCell>{expense.description}</TableCell>
                <TableCell>{expense.invoiceNumber}</TableCell>
                <TableCell>{expense.date}</TableCell>
                <TableCell>
                  <IconButton>
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default ProjectView;

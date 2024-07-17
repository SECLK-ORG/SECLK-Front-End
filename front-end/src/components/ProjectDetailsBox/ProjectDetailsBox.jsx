import React from 'react'
import { Grid, Typography } from '@mui/material'

const ProjectDetailsBox = () => {
  return (
    <Grid container spacing={3}>
    <Grid item xs={6} sm={6} xl={3}sx={{ display:"flex",alignItems:"center"}}>
          <Typography sx={{color:"#5F6D7E",fontSize:"1rem",fontWeight:"400",lineHeight:"24px" }}>Start Date</Typography>
          <Typography sx={{color:"#272D37",fontSize:"1rem",fontWeight:"600",lineHeight:"24px",marginInline:"4rem",letterSpacing:"-1" }}>23/08/2023</Typography>
    </Grid>
    <Grid item xs={6} sm={6} xl={3}sx={{ display:"flex",alignItems:"center"}}>
    <Typography sx={{color:"#5F6D7E",fontSize:"1rem",fontWeight:"400",lineHeight:"24px" }}>End Date</Typography>
    <Typography sx={{color:"#272D37",fontSize:"1rem",fontWeight:"600",lineHeight:"24px",marginInline:"3rem"  }}>23/08/2023</Typography>
    </Grid>
    <Grid item xs={6} sm={6} xl={3} sx={{ display:"flex",alignItems:"center"}}>
          <Typography sx={{color:"#5F6D7E",fontSize:"1rem",fontWeight:"400",lineHeight:"24px" }}>Contact Number</Typography>
          <Typography sx={{color:"#272D37",fontSize:"1rem",fontWeight:"600",lineHeight:"24px",marginInline:"1rem" }}>+1 234567890</Typography>
    </Grid>
    <Grid item xs={6} sm={6} xl={3} sx={{ display:"flex",alignItems:"center"}}>
    <Typography sx={{color:"#5F6D7E",fontSize:"1rem",fontWeight:"400",lineHeight:"24px" }}>Contact email</Typography>
    <Typography sx={{color:"#272D37",fontSize:"1rem",fontWeight:"600",lineHeight:"24px",marginInline:"1rem"  }}>Johncena@celled.com</Typography>
     
    </Grid>
  </Grid>
  
  )
}

export default ProjectDetailsBox
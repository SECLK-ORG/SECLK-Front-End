import React from 'react';
import { Card, CardContent, Typography, Box, Grid } from '@mui/material';
import { BorderLinearProgress } from '../../assets/theme/theme';
import styles from './ProjectInfoCard.module.scss';

interface ProjectInfoCardProps {
  agreementAmount?: number;
  title: string;
  Value: number;
  label: string;
  Value2: number;
  label2: string;
  remaining?: string;
  remainingLabel?: string;
  color?: string;
  Progress?:any;
}



const ProjectInfoCard: React.FC<ProjectInfoCardProps> = ({ title, label,Value, Value2, label2, remaining, remainingLabel, color,Progress,agreementAmount }) => {
  
  
  return (
    <Card className={styles.projectCard}>
      <CardContent sx={{boxShadow:"none"}}>
      <Grid container spacing={2} alignItems="center">
          <Grid sm={6} item  >
          <Typography variant="h5">
            { title}  
        </Typography>
    
          </Grid>
          {title==="Profit"&& <Grid sm={6} item>
          </Grid>
          }
          {title!=="Profit"&&<>  <Grid sm={6} item>
          <BorderLinearProgress variant="determinate" value={Progress ?? 100} />
          </Grid>
         <Grid sm={6} item >
            <Typography className={styles.commonText}>All time</Typography>
          </Grid>
          <Grid sm={6}  item>
          <Typography  className={styles.remainTex}>{`${(100-Progress).toFixed(2)}% remaining`}</Typography>
          </Grid>
          </>  }
          <Grid sm={5} item>
           <Box className={styles.valueBox}>
            <Typography className={styles.value}>{Value}</Typography>
            <Typography className={styles.valueDesc}>{label}</Typography>
           </Box>
          </Grid>
          <Grid sm={2} item></Grid>
          <Grid sm={5} item>
          <Box className={styles.valueBox}>
            <Typography  sx={{color:color, fontWeight:600,fontSize:"16px"}} className={styles.value}>{Value2}</Typography>
            <Typography className={styles.valueDesc}>{label2}</Typography>
           </Box>
          </Grid>

      </Grid>


        {/* <BorderLinearProgress variant="determinate" value={50} />
        <Typography variant="body2" color="textSecondary">All time</Typography>
        <Box my={2}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h4">{totalValue}</Typography>
            <Typography variant="body2" color="textSecondary">{label2}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" sx={{ color }}>{currentValue}</Typography>
          </Box>
        </Box>
        {remaining && (
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" sx={{ color: parsedRemaining !== null && parsedRemaining < 0 ? 'red' : 'inherit' }}>{remainingLabel}</Typography>
            <Typography variant="h6" sx={{ color: parsedRemaining !== null && parsedRemaining < 0 ? 'red' : 'inherit' }}>{remaining}</Typography>
          </Box>
        )} */}
      </CardContent>
    </Card>
  );
};

export default ProjectInfoCard;

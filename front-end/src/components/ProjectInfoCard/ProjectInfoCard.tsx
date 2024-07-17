import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { BorderLinearProgress } from '../../assets/theme/theme';


interface ProjectInfoCardProps {
  title: string;
  totalValue: string;
  currentValue: string;
  currentLabel?: string;
  remaining?: string;
  remainingLabel?: string;
  color?: string;
}



const ProjectInfoCard: React.FC<ProjectInfoCardProps> = ({ title, totalValue, currentValue, currentLabel, remaining, remainingLabel, color }) => {
  const parsedRemaining = remaining ? parseFloat(remaining) : null;
  
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <BorderLinearProgress variant="determinate" value={50} />
        <Typography variant="body2" color="textSecondary">All time</Typography>
        <Box my={2}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h4">{totalValue}</Typography>
            <Typography variant="body2" color="textSecondary">{currentLabel}</Typography>
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
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectInfoCard;

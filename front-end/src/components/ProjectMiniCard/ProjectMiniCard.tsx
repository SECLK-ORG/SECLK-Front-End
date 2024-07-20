import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

interface ProjectMiniCardProps {
  projectName: string;
  role: string;
  date: string;
}

const isCurrentMonth = (date: string): boolean => {
  const today = new Date();
  const projectDate = new Date(date);
  return (
    today.getFullYear() === projectDate.getFullYear() &&
    today.getMonth() === projectDate.getMonth()
  );
};

const ProjectMiniCard: React.FC<ProjectMiniCardProps> = ({ projectName, role, date }) => {
  const newTag = isCurrentMonth(date);

  return (
    <Card variant="outlined" sx={{ display: 'flex', alignItems: 'center', padding: '1rem', margin: '0.5rem',borderRadius:"8px" }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
          {projectName}
          {newTag && (
            <Typography
              component="span"
              sx={{
                backgroundColor: '#F5FAFF',
                color: '#437EF7',
                borderRadius: '4px',
                padding: '0.2rem 0.5rem',
                marginLeft: '0.5rem',
                fontSize: '0.75rem',
              }}
            >
              New
            </Typography>
          )}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {role}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProjectMiniCard;

import React from 'react';
import { Card, CardContent, Typography, useMediaQuery } from '@mui/material';
import styles from './InfoCard.module.scss';
interface InfoCardProps {
  title: string;
  value: number;
  icon: React.ElementType;
}
const InfoCard: React.FC<InfoCardProps> = ({ title, value, icon: Icon }) => {
  const isSmallScreen = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
    return (
      <Card className={`${styles.card} ${isSmallScreen ? styles.smallCard : styles.largeCard}`}>
        <Icon className={styles.icon} />
        <CardContent className={styles.content}>
        <Typography className={styles.value}>
            {value}
          </Typography>
          <Typography className={styles.title} gutterBottom>
            {title}
          </Typography>
         
        </CardContent>
      </Card>
    );
  };
  

export default InfoCard;

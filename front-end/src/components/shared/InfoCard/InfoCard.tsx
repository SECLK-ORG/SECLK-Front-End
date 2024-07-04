import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { EmojiObjects } from '@mui/icons-material';
import styles from './InfoCard.module.scss';
interface InfoCardProps {
  title: string;
  value: number;
  icon: React.ElementType;
}
const InfoCard: React.FC<InfoCardProps> = ({ title, value, icon: Icon }) => {
    return (
      <Card className={styles.card}>
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

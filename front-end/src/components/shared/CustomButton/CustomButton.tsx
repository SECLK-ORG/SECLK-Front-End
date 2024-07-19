import React from 'react';
import { Button } from '@mui/material';

interface CustomButtonProps {
  text: string;
  size?: 'small' | 'medium' | 'large';
  backgroundColor?: string;
  color?: string;
  height?: string;
  textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase';
  variant?: 'text' | 'outlined' | 'contained';
  onClick: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  variant,
  size = 'medium',
  backgroundColor,
  color = 'white',
  height = '2.125rem',
  textTransform = 'capitalize',
  onClick,
}) => {
  return (
    <Button
      variant={variant}
      sx={{
        background: backgroundColor,
        color: color,
        minWidth: size === 'small' ? '5rem' : size === 'large' ? '10rem' : '7rem',
        height: height,
        textTransform: textTransform,
        borderRadius: "5px",
        border: variant === 'outlined' ? "1px solid #437EF7" : "none",
      }}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export default CustomButton;

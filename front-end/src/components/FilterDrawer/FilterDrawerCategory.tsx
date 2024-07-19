// FilterDrawer.tsx
import React from 'react';
import {
  Drawer, FormControl, FormGroup, FormControlLabel, Checkbox, Button,
  Divider,
  Typography
} from '@mui/material';
import styles from './FilterDrawerCategory.module.scss';

interface FilterDrawerProps {
  filterDrawerOpen: boolean;
  categoryFilters: { [key: string]: boolean };
  statusFilters: { [key: string]: boolean };
  onFilterDrawerClose: (save: boolean) => void;
  onCategoryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onStatusChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  categories: string[];
  statuses: string[];
  type: string;
}

const FilterDrawerCategory: React.FC<FilterDrawerProps> = ({
  filterDrawerOpen,
  categoryFilters,
  statusFilters,
  onFilterDrawerClose,
  onCategoryChange,
  onStatusChange,
  categories,
  statuses,
  type
}) => {
  return (
    <Drawer
      anchor="right"
      open={filterDrawerOpen}
      onClose={() => onFilterDrawerClose(false)}
    >
      <div className={styles.head}>
        <div className={styles.headerContainer}>
          <Typography
            sx={{
              fontWeight: 'bold',
              paddingLeft: '10px',
              padding:"15px",
              fontSize: '1.5rem'
            }}
          >
            Filters
          </Typography>
          <Divider />
        </div>
        <div className={styles.drawerContent}>
          <div className={styles.drawerContentCategory}>
            <Typography
              sx={{
                padding: '12px',
                fontWeight: 'bold',
                paddingLeft: '20px',
                fontSize: '1rem'
              }}
            >
              {type}
            </Typography>
            <Divider />
            <FormControl component="fieldset" sx={{ paddingInline: "20px", marginBottom: "1rem" }}>
              <FormGroup>
                {categories.map((category) => (
                  <FormControlLabel
                    key={category}
                    control={<Checkbox checked={categoryFilters[category]} onChange={onCategoryChange} name={category} />}
                    label={category}
                  />
                ))}
              </FormGroup>
            </FormControl>
          </div>
          <div className={styles.drawerContentCategory}>
            <Typography
              sx={{
                padding: '12px',
                fontWeight: 'bold',
                paddingLeft: '20px',
                fontSize: '1rem'
              }}
            >
              Status
            </Typography>
            <Divider />
            <FormControl component="fieldset" sx={{ paddingInline: "20px", marginBottom: "1rem" }}>
              <FormGroup>
                {statuses.map((status) => (
                  <FormControlLabel
                    key={status}
                    control={<Checkbox checked={statusFilters[status]} onChange={onStatusChange} name={status} />}
                    label={status}
                  />
                ))}
              </FormGroup>
            </FormControl>
          </div>
        </div>
        <div className={styles.drawerActions}>
          <Divider />
          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
            <Button variant='outlined' onClick={() => onFilterDrawerClose(false)} sx={{ border: "1px solid #e0e0e0", color: "black", minWidth: "7rem" }}>Cancel</Button>
            <Button variant="contained" sx={{ background: "#437EF7", color: "white", minWidth: "7rem" }} onClick={() => onFilterDrawerClose(true)}>Save</Button>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default FilterDrawerCategory;

import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PeopleIcon from '@mui/icons-material/People';
import UpdateIcon from '@mui/icons-material/Update';
import StarIcon from '@mui/icons-material/Star';
import SupportIcon from '@mui/icons-material/Support';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from './SideNav.module.scss';
import { logo, flag ,settings} from '../../../assets/images/';
import { useNavigate } from 'react-router-dom';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useEffect } from 'react';
const drawerWidth = 240;

export default function PermanentDrawerLeft() {
  const [selectedItem, setSelectedItem] = React.useState<string>('Projects');
  const navigate = useNavigate();


  const handleNavigate = (value: string) => {
    setSelectedItem(value);
    if (value === "Configurations") {
      navigate("/configurations");
    } else if (value === "Projects") {
      navigate("/projects");
    } else if (value === "Employees") {
      navigate("/employees");
    }
  }

  return (
    <>
      <CssBaseline />
      <Drawer
        className={styles.drawer}
        variant="permanent"
        anchor="left"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            backgroundColor: '#1C2534',
            boxSizing: 'border-box',
            color: '#A5ACBA',
          },
        }}
      >
        <Box className={styles.logo}>
          <img src={logo} alt="Logo" />
        </Box>
        <List>
          <ListItem disablePadding className={selectedItem === 'Configurations' ? styles.selected : ''}>
            <ListItemButton onClick={() => handleNavigate('Configurations')}>
              <ListItemIcon>
                <SettingsOutlinedIcon sx={{ color: selectedItem === 'Configurations' ? '#FFFFFF' : '#A5ACBA' }} />
              </ListItemIcon>
              <ListItemText primary="Configurations" sx={{ color: selectedItem === 'Configurations' ? '#FFFFFF' : '#A5ACBA' }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding className={selectedItem === 'Projects' ? styles.selected : ''}>
            <ListItemButton onClick={() => handleNavigate('Projects')}>
              <ListItemIcon>
                <AssignmentIcon sx={{ color: selectedItem === 'Projects' ? '#FFFFFF' : '#A5ACBA' }} />
                
              </ListItemIcon>
              <ListItemText primary="Projects" sx={{ color: selectedItem === 'Projects' ? '#FFFFFF' : '#A5ACBA' }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding className={selectedItem === 'Employees' ? styles.selected : ''}>
            <ListItemButton onClick={() => handleNavigate('Employees')}>
              <ListItemIcon>
                <GroupsOutlinedIcon sx={{ color: selectedItem === 'Employees' ? '#FFFFFF' : '#A5ACBA' }} />
                {/* <PeopleIcon sx={{ color: selectedItem === 'Employees' ? '#FFFFFF' : '#A5ACBA' }} /> */}
              </ListItemIcon>
              <ListItemText primary="Employees" sx={{ color: selectedItem === 'Employees' ? '#FFFFFF' : '#A5ACBA' }} />
            </ListItemButton>
          </ListItem>
          <Divider />
        </List>
        <Box sx={{ flexGrow: 1 }} />
        <List>
          <ListItem>
            <ListItemText primary="ADMINISTRATION" className={styles.sectionHeader} />
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <UpdateIcon sx={{ color: '#A5ACBA' }} />
              </ListItemIcon>
              <ListItemText primary="Updates" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <StarIcon sx={{ color: '#A5ACBA' }} />
              </ListItemIcon>
              <ListItemText primary="Integrations" />
              <ExpandMoreIcon sx={{ color: '#A5ACBA' }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SupportIcon sx={{ color: '#A5ACBA' }} />
              </ListItemIcon>
              <ListItemText primary="Support" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AccountCircleIcon sx={{ color: '#A5ACBA' }} />
              </ListItemIcon>
              <ListItemText primary="Account" />
              <ExpandMoreIcon sx={{ color: '#A5ACBA' }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ExitToAppIcon sx={{ color: '#A5ACBA' }} />
              </ListItemIcon>
              <ListItemText primary="Sign Out" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}

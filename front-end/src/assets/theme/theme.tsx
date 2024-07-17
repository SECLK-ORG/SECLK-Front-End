import {
    alpha,
    Autocomplete,
    Checkbox,
    createTheme,
    Dialog,
    DialogActions,
    DialogContent,
    DialogProps,
    DialogTitle,
    Select,
    styled,
    Button,
    Switch,
    TableCell,
    tableCellClasses,
    TableRow,
    TextField,
    LinearProgress,
    linearProgressClasses,
  } from "@mui/material";
  import "../theme/constants.scss";
  const primaryFontSize = 14;

  export const PrimaryTheme = createTheme({
    palette: {
      text: {
        primary: "#000000",
        disabled: "#6b6b6b",
      },
      primary: {
        main: "#333B48",
       
      },
      secondary: {
        main: "#274D36",
      },
      success: {
        main: "#00C853",
      },
      error: {
        main: "#FF0001",
      },
      warning: {
        main: "#FFB800",
      },
      
      background: {
        default: "#ooooo", // Set a dark background color
        paper: "white", // Set a dark background color for paper elements
      },
    },
    typography: {
      fontFamily: ["Ubuntu", "sans-serif"].join(","),
      fontSize: primaryFontSize,
      fontWeightLight: 100,
      fontWeightRegular: 400,
      fontWeightBold: 500,
      body1: {
        fontSize: primaryFontSize,
      },
    },
    components: {
      MuiCardContent: {
        styleOverrides: {
          root: {
            padding: "16px",
            boxShadow:"none",
            "&:last-child": {
              paddingBottom: "16px",

            },
          },
        },
      },
      MuiBackdrop: {
        styleOverrides: {
          root: {
            background: "rgba(0, 0, 0, 0.05)",
            backgroundColor: "rgba(0, 0, 0, 0.05)",
          },
        },
      },
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            marginTop: "-2px",
          },
        },
      },
      MuiAccordionDetails: {
        styleOverrides: {
          root: {
            padding: "16px",
            paddingTop: "0",
          },
        },
      },
      MuiFormControlLabel: {
        styleOverrides: {
          root: {
            marginRight: "0px",
          },
        },
      },
    },
  });

  export const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
  }));
  export const StyledTableCell = styled(TableCell, {
    shouldForwardProp: (prop) => prop !== "width",
  })(({ theme, width }) => ({
    [`&.${tableCellClasses.head}`]: {
      fontSize: 14,
      backgroundColor: "#ffffff", // Light gray background for header
      color: "#343a40", // Dark gray text color
      padding: "10px",
      fontWeight: 500, // Correct font weight property
      width: width || "auto",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      padding: "10px",
      fontWeight: 600, // Correct font weight property
      color: "#495057", // Slightly lighter gray text color
      backgroundColor: "#ffffff",
      width: width || "auto",
    },
    "&:last-child": {
      position: "sticky",
      right: 0,
      zIndex: 10,
    },
  }));
  
  export const StickyTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      fontSize: 14,
      backgroundColor: "#ffffff", // Light gray background for header
      color: "#343a40", // Dark gray text color
      padding: "10px",
      fontWeight: 500, // Correct font weight property
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      padding: "10px",
      fontWeight: 600, // Correct font weight property
      color: "#495057", // Slightly lighter gray text color
      backgroundColor: "#ffffff",
    },
    position: "sticky",
    zIndex: 10,
    left: 0,
  }));
  
  export  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  
  export const StyledCheckBox = styled(Checkbox)(({ theme }) => ({
    "&.MuiCheckbox-colorPrimary": {
      color: "#000000",
    },
  }));
  
  export const StyledTextField = styled(TextField)(() => ({
    "& .MuiInputBase-root": {
      height: "2.5rem",
      backgroundColor: "#ffffff",
      color: "#000000",
      borderColor: "#e0e0e0",
    },
    "& .MuiInputLabel-root": {
      color: "#000000",
      pointerEvents: "none",
    },
    "& .MuiInputLabel-root.Mui-required::after": {
      color: "red",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#437EF7",
      opacity: 1,
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#e0e0e0",
        borderWidth: "1px",
      },
      "&:hover fieldset": {
        borderColor: "#437EF7",
      },
      "&.Mui-focused fieldset": {
        color: "#437EF7",
        borderColor: "#437EF7",
        borderWidth: "2px",
      },
      "& input::placeholder": {
        color: "#000000",
      },
    },
    "& .MuiAutocomplete-popupIndicator": {
      color: "#000000",
      "&:focus": {
        color: "#437EF7",
      },
      "&.Mui-focused": {
        color: "#437EF7",
      },
    },
    "& .MuiSvgIcon-root": {
      color: "#437EF7",
      "&:focus": {
        color: "#437EF7",
      },
      "&.Mui-focused": {
        color: "#437EF7",
      },
    },
    "& .MuiInputAdornment-root": {
      "& .MuiSvgIcon-root": {
        color: "#000000",
      },
      "&.Mui-focused .MuiSvgIcon-root": {
        color: "#437EF7",
      }
    },
    "&.Mui-disabled .MuiOutlinedInput-root": {
      borderColor: "red",
    },
  }));
  const StyledSelect = styled(Select)(() => ({
    "& .MuiSelect-root": {
      backgroundColor: "#ffffff",
      color: "#000000",
      borderColor: "#000000",
    },
    "& .MuiInputLabel-root": {
      color: "#000000",
      pointerEvents: "none",
    },
    "& .MuiInputLabel-root.Mui-required::after": {
      color: "#000000",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#000000",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#000000",
      opacity: 1,
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#000000",
        borderWidth: "1px",
      },
      "&:hover fieldset": {
        borderColor: "#000000",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#000000",
        borderWidth: "2px",
      },
      "& input::placeholder": {
        color: "#000000",
      },
    },
    "& .MuiSelect-icon": {
      color: "#000000",
    },
    "&.Mui-disabled .MuiOutlinedInput-root": {
      borderColor: "#000000",
    },
  }));
  
  export  const StyledAutocomplete = styled(Autocomplete)(() => ({
    "& .MuiInputBase-root": {
      color: "#000000",
      backgroundColor: "#ffffff",
      "&:hover": {
        backgroundColor: "#ffffff",
      },
      "&.Mui-focused": {
        backgroundColor: "#ffffff",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#000000",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#000000",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#e0e0e0",
      },
      "&:hover fieldset": {
        borderColor: "#437EF7",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#437EF7",
      },
      "& input::placeholder": {
        color: "#000000",
      },
    },
    "& .MuiAutocomplete-paper": {
      backgroundColor: "#ffffff",
    },
    "& .MuiAutocomplete-popper": {
      "& .MuiPopper-root": {
        backgroundColor: "#ffffff",
      },
    },
    "& .MuiAutocomplete-popupIndicator": {
      color: "#000000",
    },
  }));
  
  export  const StyledSwitch = styled(Switch)(({ theme }) => ({
    "& .MuiSwitch-switchBase": {
      color: "#000000",
    },
    "& .MuiSwitch-thumb": {
      color: "#ffffff",
    },
    "& .MuiSwitch-track": {
      backgroundColor: "#000000",
    },
  }));
  export const CustomButton = styled(Button)(({ theme }) => ({
    textTransform: 'none',
    backgroundColor: 'white',
    color: '#000000',
    borderColor: '#e0e0e0',
    '&:hover': {
      backgroundColor: '#437EF7',
      borderColor: '#437EF7',
      color:"#437EF7"
    },
    '&.Mui-disabled': {
      backgroundColor: '#e0e0e0',
      color: '#6b6b6b',
    },
  }));
  
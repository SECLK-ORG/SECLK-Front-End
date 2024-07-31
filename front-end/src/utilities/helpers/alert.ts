import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Success notification
export const showSuccessToast = (message: string) => {
  toast.success(message);
};

// Error notification
export const showErrorToast = (message: string) => {
  toast.error(message);
};


import { toast } from 'react-toastify';

export const showToast = (props) => {
  const { message, type, toastId } = props;

  toast(message, {
    type,
    toastId,
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    theme: 'light',
  });
};

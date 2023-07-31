import { toast } from "react-hot-toast";

const Notifies = {
  success: (message) => {
    return toast.success(message);
  },

  error: (message) => {
    return toast.error(message);
  },

  notify: (message, icon) => {
    return toast(message, {
      icon: icon,
    });
  },
};

export default Notifies;

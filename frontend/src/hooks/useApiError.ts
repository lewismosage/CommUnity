import { useAppDispatch } from '../store/hooks';
import { addToast } from '../store/slices/toastSlice';

interface ApiError {
  message: string;
  status?: number;
}

const useApiError = () => {
  const dispatch = useAppDispatch();

  const handleError = (error: unknown) => {
    let message = 'An unexpected error occurred';

    if (error && typeof error === 'object' && 'message' in error) {
      message = (error as ApiError).message;
    }

    dispatch(addToast({
      type: 'error',
      message
    }));
  };

  return { handleError };
};

export default useApiError; 
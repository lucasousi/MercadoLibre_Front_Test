import { toast } from 'react-toastify';
import { DEFAULT_TOAST_POSITION } from 'src/constants/constants';

export default function useNotificationService() {
	function showSuccessToast(msg: string, autoClose?: number | false) {
		toast.success(msg, {
			autoClose: autoClose,
			position: DEFAULT_TOAST_POSITION,
		});
	}

	function showErrorToast(msg: string, autoClose?: number | false) {
		toast.error(msg, {
			autoClose: autoClose,
			position: DEFAULT_TOAST_POSITION,
		});
	}

	return { showSuccessToast, showErrorToast };
}

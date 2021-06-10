import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import nprogress from 'nprogress';
import { toast } from 'react-toastify';
import loginStore from 'src/data/login.store';
import userStore from 'src/data/user.store';
import EnvironmentVariables from 'src/models/env.model';
import { Response } from 'src/models/response.model';

import { DEFAULT_TOAST_POSITION } from '../constants/constants';

const BASE_URL = (process.env as EnvironmentVariables).REACT_APP_API_URL;
let CANCEL_TOKEN_SOURCE = axios.CancelToken.source();

function generateNewCancelTokenSource() {
	CANCEL_TOKEN_SOURCE = axios.CancelToken.source();
}

export const axiosInstance: AxiosInstance = axios.create({
	baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
	(config) => {
		nprogress.start();
		const USER_CREDENTIALS = userStore.getCurrentStateSync();
		if (USER_CREDENTIALS?.accessToken) {
			config.headers = {
				Authorization: `Bearer ${USER_CREDENTIALS.accessToken}`,
			};
		}
		return config;
	},
	(error: AxiosError) => {
		nprogress.done();
		return Promise.reject(error);
	},
);

axiosInstance.interceptors.response.use(
	(response) => {
		nprogress.done();
		return response;
	},
	async (error: AxiosError<Response>) => {
		if (error.response?.status === 401) {
			handleUnauthorizedUser(error);
		}
		nprogress.done();
		return handleResponseWithError(error);
	},
);

function handleUnauthorizedUser(error: AxiosError<Response>) {
	userStore.resetState();
	localStorage.clear();
	return Promise.reject(error);
}

function handleResponseWithError(axiosError: AxiosError<Response>) {
	const USER_CREDENTIALS = userStore.getCurrentStateSync();
	if (axiosError.response?.status === 401 && USER_CREDENTIALS.accessToken) {
		toast.error('Seu token expirou, por favor re-faça o login.', {
			autoClose: 3000,
			position: DEFAULT_TOAST_POSITION,
		});
		setTimeout(() => window.location.reload(), 3000);
		return Promise.reject(axiosError);
	} else if (axiosError?.response?.data?.errors?.length) {
		const { errors } = axiosError.response.data;
		errors.forEach((err) =>
			toast.error(err.msg, {
				autoClose: 3000,
				position: DEFAULT_TOAST_POSITION,
			}),
		);

		if (
			errors.some(
				(item) =>
					item.msg ===
					'Sua sessão expirou. Você será redirecionado para o login.',
			)
		) {
			loginStore.logout();
			window.location.reload();
		}

		return Promise.reject(axiosError);
	} else {
		if (axiosError?.message === 'RouteChangeCancelPendingRequests') {
			return Promise.resolve('Pending requests sucessfull canceled');
		} else {
			toast.error('Houve um problema com a chamada na API', {
				autoClose: 3000,
				position: DEFAULT_TOAST_POSITION,
			});
			return Promise.reject(axiosError);
		}
	}
}

const API = {
	get<ParamsType = any, DataResponseType = any>(
		endpoint: string,
		params?: ParamsType,
		headers?: any,
	): Promise<AxiosResponse<Response<DataResponseType>>> {
		return axiosInstance.get<Response<DataResponseType>>(endpoint, {
			params: params,
			headers: headers,
			cancelToken: CANCEL_TOKEN_SOURCE.token,
		});
	},

	download<ParamsType = any, FileType = BlobPart>(
		endpoint: string,
		params?: ParamsType,
		headers?: any,
	): Promise<AxiosResponse<FileType>> {
		return axiosInstance.get<FileType>(endpoint, {
			params: params,
			headers: headers,
			responseType: 'blob',
			cancelToken: CANCEL_TOKEN_SOURCE.token,
		});
	},

	post<RequestType = any, DataResponseType = any>(
		endpoint: string,
		payload: RequestType,
	): Promise<AxiosResponse<Response<DataResponseType>>> {
		return axiosInstance.post(endpoint, payload, {
			headers: {
				'Content-Type': 'application/json',
			},
			cancelToken: CANCEL_TOKEN_SOURCE.token,
		});
	},

	delete<DataResponseType = any>(
		endpoint: string,
		id: number | string,
	): Promise<AxiosResponse<Response<DataResponseType>>> {
		return axiosInstance.delete(`${endpoint}/${id}`, {
			cancelToken: CANCEL_TOKEN_SOURCE.token,
		});
	},

	put<RequestType = any, DataResponseType = any>(
		endpoint: string,
		payload: RequestType,
	): Promise<AxiosResponse<Response<DataResponseType>>> {
		return axiosInstance.put(endpoint, payload, {
			headers: {
				'Content-Type': 'application/json',
			},
			cancelToken: CANCEL_TOKEN_SOURCE.token,
		});
	},

	finishPendingRequests(cancellationReason: string) {
		CANCEL_TOKEN_SOURCE.cancel(cancellationReason);
		generateNewCancelTokenSource();
	},
};

export default API;

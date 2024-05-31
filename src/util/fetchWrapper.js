/* eslint-disable no-param-reassign */
import axios from 'axios';

const fetchWrapper = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
	// timeout: 5000,
	headers: {
		'Content-Type': 'application/json',
	},
});

fetchWrapper.interceptors.request.use(
	config => {
		const token = JSON.parse(localStorage.getItem('auth'));
		if (token?.accessToken) {
			config.headers.Authorization = `Bearer ${token?.accessToken}`;
		}
		return config;
	},
	error => Promise.reject(error)
);

fetchWrapper.interceptors.response.use(
	response => response,
	async error => {
		const originalRequest = error.config;

		// Check if the error is due to an expired token
		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				const newToken = await refreshAccessToken();

				// Update new token
				originalRequest.headers.Authorization = `Bearer ${newToken}`;
				return axios(originalRequest);
			} catch (refreshError) {
				// If token refresh fails, redirect to login or handle as needed
				return Promise.reject(refreshError);
			}
		}

		return Promise.reject(error);
	}
);

// refresh the access token
async function refreshAccessToken() {
	try {
		const user = JSON.parse(localStorage.getItem('user'));

		const response = await fetchWrapper.post('/refreshToken', {
			refreshToken: localStorage.getItem('refreshToken'),
			email: user.emailAddress,
		});

		const { token, refreshToken } = response.data;

		localStorage.setItem('token', token);
		localStorage.setItem('refreshToken', refreshToken);

		return token;
	} catch (error) {
		if (error.response && error.response.status === 401) {
			localStorage.removeItem('token');
		}

		return Promise.reject(error);
	}
}

export default fetchWrapper;

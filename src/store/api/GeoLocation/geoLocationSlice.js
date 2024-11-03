import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	loading: false,
	error: null,
	success: false,
	geoLocationData: {
		lat: null,
		lng: null
	},
};

export const getUserGeoLocation = createAsyncThunk('geoLocation/location', async () => {
	try {
		// const response = await axios.get(`https://ipinfo.io?token=${import.meta.env.VITE_IPINFO_TOKEN}`);
		const response = await axios.get(`${import.meta.env.VITE_API_APP_URL}/get-ip`);
		console.log(response)
		// console.log(response.data.data);

		return response.data.data;
		//return true;
	} catch (error) {
		throw error.response ? error.response.data : error.message;
	}
});

const geoLocationSlice = createSlice({
	name: 'geolocation',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getUserGeoLocation.pending, (state) => {
				state.loading = true;
			})
			.addCase(getUserGeoLocation.fulfilled, (state, action) => {


				state.loading = false;
				state.success = true;
				const lat = action.payload?.loc?.split(',')[0]
				console.log("🚀 ~ .addCase ~ lat:", lat)
				const lng = action.payload?.loc?.split(',')[1]
				console.log("🚀 ~ .addCase ~ lng:", lng)
				// const lat = 24.7460;
				// const lng = 90.4179;
				state.geoLocationData.lat = lat;
				state.geoLocationData.lng = lng;
			})
			.addCase(getUserGeoLocation.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Failed to fetch geolocation data';
			});
	},
});

export default geoLocationSlice.reducer;

export const selectCurrentLatLng = (state) => state.geoLocation.geoLocationData;
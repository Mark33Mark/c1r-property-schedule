import { apiSlice } from './apiSlice';
import { logOut, setCredentials } from './authSlice';

export const authApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (credentials) => ({
				url: '/login',
				method: 'POST',
				body: { ...credentials },
			}),
		}),

		register: builder.mutation({
			query: (credentials) => ({
				url: '/register',
				method: 'POST',
				body: { ...credentials },
			}),
		}),

		sendLogout: builder.mutation({
			query: () => ({
				url: '/logout',
				method: 'POST',
			}),

			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					console.log("logout data = ", data);
					dispatch(logOut());
					window.location.href = "/";
					setTimeout(() => {
						dispatch(apiSlice.util.resetApiState());
					}, 1000);
				} catch (err) {
					console.log(err);
				}
			},
		}),

		refresh: builder.mutation({
			query: () => ({
				url: '/refresh',
				method: 'GET',
			}),

			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					const { accessToken } = data;
					dispatch(setCredentials({ accessToken }));
				} catch (err) {
					console.log(err);
				}
			},
		}),
	}),
});

export const {
	useLoginMutation,
	useRegisterMutation,
	useSendLogoutMutation,
	useRefreshMutation,
} = authApiSlice;

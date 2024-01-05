import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';

const propertiesAdapter = createEntityAdapter({});
const initialState = propertiesAdapter.getInitialState();

console.log('property initialState = ', initialState);

export const propertiesApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({

		getProperties: builder.query({

			query: () => ({
				url: '/property',
				validateStatus: (response, result) => {
					return response.status === 200 && !result.isError;
				},
			}),
			transformResponse: (responseData) => {
				const loadedProperties = responseData.map((properties) => {
					properties.id = properties._id;
					const updatedProperties = {id: properties.id, ...properties}
					return updatedProperties;
				});
				
				return propertiesAdapter.setAll(initialState, loadedProperties);
			},
			providesTags: (result, error, arg) => {
				if (result?.ids) {
					return [
						{ type: 'Property', id: 'LIST' },
						...result.ids.map((id) => ({ type: 'Property', id })),
					];
				} else return [{ type: 'Property', id: 'LIST' }];
			},
		}),
	}),
});

export const { useGetPropertiesQuery } = propertiesApiSlice;

// returns the query result object
export const selectPropertiesResult =
	propertiesApiSlice.endpoints.getProperties.select();

// creates memoized selector
const selectPropertiesData = createSelector(
	selectPropertiesResult,
	(propertiesResult) => propertiesResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
		selectAll: selectAllProperties,
		selectById: selectPropertyById,
		selectIds: selectPropertyIds
		// Pass in a selector that returns the properties slice of state
	} = propertiesAdapter.getSelectors(
		(state) => selectPropertiesData(state) ?? initialState
);

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Welcome, Prefetch, PersistLogin, RequireAuth } from '../Auth';
import { UsersList, EditUser, NewUserForm } from '../Users';
import { NotesList, EditNote, NewNote } from '../Notes';
import { FileUpload } from '../FileUpload';
import { Property } from '../Property';
import { Layout, Public, PageNotFound } from '.';
import { DashLayout } from '../Dash';
import { Login } from '../Login';
import { MapClusteredMarkers } from '../MapClusteredMarkers';

import { ROLES } from '../../config/roles';
import { useTitle } from '../../hooks/useTitle';

export const App = () => {
	useTitle('Property Schedule');

	return (
		<Routes>
			<Route
				path='/'
				element={<Layout />}
			>
				{/* >>> public routes <<< */}
				<Route
					index
					element={<Public />}
				/>
				<Route
					path='login'
					element={<Login />}
				/>

				{/* >>> protected routes <<< */}
				<Route element={<PersistLogin />}>
					<Route
						element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
					>
						<Route element={<Prefetch />}>
							<Route
								path='dash'
								element={<DashLayout />}
							>
								<Route
									index
									element={<Welcome />}
								/>

								<Route
									element={
										<RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]} />
									}
								>
									<Route path='users'>
										<Route
											index
											element={<UsersList />}
										/>
										<Route
											path=':id'
											element={<EditUser />}
										/>
										<Route
											path='new'
											element={<NewUserForm />}
										/>
									</Route>
								</Route>

								<Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
									<Route path='data'>
										<Route
											index
											element={<FileUpload />}
										/>
									</Route>
								</Route>

								<Route path='notes'>
									<Route
										index
										element={<NotesList />}
									/>
									<Route
										path=':id'
										element={<EditNote />}
									/>
									<Route
										path='new'
										element={<NewNote />}
									/>
								</Route>

								<Route path='property'>
									<Route
										index
										element={<Property />}
									/>
									<Route
										path='cluster'
										element={<MapClusteredMarkers />}
									/>
								</Route>
							</Route>
						</Route>
					</Route>
				</Route>

				<Route
					path='*'
					element={<PageNotFound />}
				/>
			</Route>
		</Routes>
	);
};

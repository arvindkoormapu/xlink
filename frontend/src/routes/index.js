import React, { useEffect, useState } from 'react';
import { Routes as RouterRoutes, Route, Navigate } from 'react-router-dom';
import { AUTHENTICATED_ENTRY, UNAUTHENTICATED_ENTRY, APP_PREFIX_PATH } from 'configs/AppConfig';
import { vendorRoutes, platformRoutes, adminRoutes, publicRoutes } from 'configs/RoutesConfig';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import AppRoute from './AppRoute';
import { useSelector } from 'react-redux';

const Routes = () => {

	const { token } = useSelector(state => state.auth)
	const [navTree, setNavTree] = useState([])
	const [path, setPath] = useState()

	useEffect(() => {
		if (token !== null) {
			const getUser = JSON.parse(token)
			if (getUser.roleid == 1) {
				setNavTree(adminRoutes)
				setPath('users')
			}
			if (getUser.roleid == 2) {
				setNavTree(vendorRoutes)
				setPath('vendors')
			}
			if (getUser.roleid == 3) {
				setNavTree(platformRoutes)
				setPath('platforms')
			}
			
		}
	}, [token])

	return (
		<RouterRoutes>
			<Route path="/" element={<ProtectedRoute />}>
				<Route path="/" element={<Navigate replace to={`${APP_PREFIX_PATH}/${path}`} />} />
				{navTree.map((route, index) => {
					return (
						<Route
							key={route.key + index}
							path={route.path}
							element={
								<AppRoute
									routeKey={route.key}
									component={route.component}
									{...route.meta}
								/>
							}
						/>
					)
				})}
				<Route path="*" element={<Navigate to="/" replace />} />
			</Route>
			<Route path="/" element={<PublicRoute />}>
				{publicRoutes.map(route => {
					return (
						<Route
							key={route.path}
							path={route.path}
							element={
								<AppRoute
									routeKey={route.key}
									component={route.component}
									blankLayout={true}
									{...route.meta}
								/>
							}
						/>
					)
				})}
			</Route>
		</RouterRoutes>
	)
}

export default Routes
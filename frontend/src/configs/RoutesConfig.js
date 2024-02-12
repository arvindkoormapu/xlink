import React from 'react'
import { AUTH_PREFIX_PATH, APP_PREFIX_PATH } from 'configs/AppConfig'

export const publicRoutes = [
    {
        key: 'login',
        path: `${AUTH_PREFIX_PATH}/login`,
        component: React.lazy(() => import('views/auth-views/authentication/login')),
    },
    {
        key: 'register',
        path: `${AUTH_PREFIX_PATH}/register`,
        component: React.lazy(() => import('views/auth-views/authentication/register')),
    },
    {
        key: 'forgot-password',
        path: `${AUTH_PREFIX_PATH}/forgot-password`,
        component: React.lazy(() => import('views/auth-views/authentication/forgot-password')),
    }
]

export const vendorRoutes = [
    {
        key: 'vendors',
        path: `${APP_PREFIX_PATH}/vendors`,
        component: React.lazy(() => import('views/app-views/vendor/vendors')),
    },
    {
        key: 'taxes',
        path: `${APP_PREFIX_PATH}/taxes`,
        component: React.lazy(() => import('views/app-views/vendor/taxes')),
    },
    {
        key: 'addons',
        path: `${APP_PREFIX_PATH}/addons`,
        component: React.lazy(() => import('views/app-views/vendor/addons')),
    },
]

export const platformRoutes = [
    {
        key: 'edit-profile',
        path: `${APP_PREFIX_PATH}/edit-profile`,
        component: React.lazy(() => import('views/app-views/platform/edit-profile')),
    },
    {
        key: 'api-keys',
        path: `${APP_PREFIX_PATH}/api-keys`,
        component: React.lazy(() => import('views/app-views/platform/api-keys')),
    },
    {
        key: 'whitelist-vendors',
        path: `${APP_PREFIX_PATH}/whitelist-vendors`,
        component: React.lazy(() => import('views/app-views/platform/whitelist-vendors')),
    },
]

export const adminRoutes = [
    {
        key: 'users',
        path: `${APP_PREFIX_PATH}/users`,
        component: React.lazy(() => import('views/app-views/admin/users')),
    },
    {
        key: 'vendors',
        path: `${APP_PREFIX_PATH}/vendors`,
        component: React.lazy(() => import('views/app-views/admin/vendors')),
    },
    {
        key: 'platforms',
        path: `${APP_PREFIX_PATH}/platforms`,
        component: React.lazy(() => import('views/app-views/admin/platforms')),
    },
]
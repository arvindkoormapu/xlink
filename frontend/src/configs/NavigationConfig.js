import { ContactsOutlined, UsergroupAddOutlined, ShopOutlined } from '@ant-design/icons';
import { APP_PREFIX_PATH } from 'configs/AppConfig'

export const adminNavTree = [
  {
    key: 'users',
    path: `${APP_PREFIX_PATH}/users`,
    title: 'Users',
    icon: UsergroupAddOutlined,
    breadcrumb: false,
    submenu: []
  }, 
  {
    key: 'vendors',
    path: `${APP_PREFIX_PATH}/vendors`,
    title: 'Vendors',
    icon: ContactsOutlined,
    breadcrumb: false,
    submenu: []
  },
  {
    key: 'platforms',
    path: `${APP_PREFIX_PATH}/platforms`,
    title: 'Platforms',
    icon: ShopOutlined,
    breadcrumb: false,
    submenu: []
  },
]

export const vendorNavTree = [
  {
    key: 'vendors',
    path: `${APP_PREFIX_PATH}/vendors`,
    title: 'Vendors',
    icon: ContactsOutlined,
    breadcrumb: false,
    submenu: []
  },
]

export const platformNavTree = [
  {
    key: 'platforms',
    path: `${APP_PREFIX_PATH}/platforms`,
    title: 'Platforms',
    icon: ShopOutlined,
    breadcrumb: false,
    submenu: []
  },
]



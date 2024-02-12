import { ContactsOutlined, UsergroupAddOutlined, ShopOutlined, FileProtectOutlined, KeyOutlined, MoneyCollectOutlined, AppstoreAddOutlined } from '@ant-design/icons';
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
  {
    key: 'taxes',
    path: `${APP_PREFIX_PATH}/taxes`,
    title: 'Taxes',
    icon: MoneyCollectOutlined,
    breadcrumb: false,
    submenu: []
  },
  {
    key: 'addons',
    path: `${APP_PREFIX_PATH}/addons`,
    title: 'Addons',
    icon: AppstoreAddOutlined,
    breadcrumb: false,
    submenu: []
  },
]

export const platformNavTree = [
  {
    key: 'api-keys',
    path: `${APP_PREFIX_PATH}/api-keys`,
    title: 'API keys',
    icon: KeyOutlined,
    breadcrumb: false,
    submenu: []
  },
  {
    key: 'whitelist-vendors',
    path: `${APP_PREFIX_PATH}/whitelist-vendors`,
    title: 'Whitelist vendors',
    icon: FileProtectOutlined,
    breadcrumb: false,
    submenu: []
  },
]



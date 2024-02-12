import React, { useEffect, useState, useContext } from 'react'
import PageHeader from 'components/layout-components/PageHeader';
import { Table, Tag, Tooltip, Button, Card } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import { useDispatch, useSelector } from "react-redux";
import View from './view';
import { getVendorsAction } from "../../../store/actions/vendorActions";
import { AuthContext } from '../../../auth/AuthContext';

// rowSelection objects indicates the need for row selection
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
    getCheckboxProps: (record) => ({
        // Column configuration not to be checked
        vendorid: record.vendorid,
    }),
  };

function VendorsList() {
    const { currentUser } = useContext(AuthContext);
    const dispatch = useDispatch();

    const vendorsList = useSelector((state) => state.vendorReducer).vendors;

    useEffect(() => {
        async function fetchMyAPI() {
            const token = await currentUser.getIdToken();
            dispatch(getVendorsAction(token))
        }

        fetchMyAPI()
    }, [currentUser])

    const [userProfileVisible, setVendorProfileVisible] = useState(false)
    const [selectedUser, setSelectedVendor] = useState(null)

    const showVendorProfile = userInfo => {
        setVendorProfileVisible(true)
        setSelectedVendor(userInfo)
    };

    const closeVendorProfile = () => {
        setVendorProfileVisible(false)
        setSelectedVendor(null)
    }


    const tableColumns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (_, record) => (
                <div className="d-flex">
                    <AvatarStatus src={<img crossOrigin='anonymous' src={`${process.env.REACT_APP_API_BASE_URL}/${record.image}`} alt="avatar" />} name={record.name} subTitle={record.emailaddress1} />
                </div>
            ),
            sorter: {
                compare: (a, b) => {
                    a = a.name.toLowerCase();
                    b = b.name.toLowerCase();
                    return a > b ? -1 : b > a ? 1 : 0;
                },
            },
        },
        {
            title: 'Mobile',
            dataIndex: 'contactnumber'
        },
        {
            title: 'City',
            dataIndex: 'city'
        },
        {
            title: 'URL',
            dataIndex: 'url',
            render: url => (
                <Tag className="text-capitalize" color="cyan">{url}</Tag>
            )
        },
        {
            title: '',
            dataIndex: 'actions',
            render: (_, elm) => (
                <div className="text-right d-flex justify-content-end">
                    <Tooltip title="View">
                        <Button type="default" className="mr-2" icon={<EyeOutlined />} onClick={() => showVendorProfile(elm)} size="small" />
                    </Tooltip>
                </div>
            )
        }
    ];

    return (
        <>
            <PageHeader display={true} title="Whitelist Vendors" />
            <Card bodyStyle={{ 'padding': '0px' }}>
                <div className="table-responsive">
                    <Table rowSelection={rowSelection} columns={tableColumns} dataSource={vendorsList} rowKey='vendorid' />
                </div>
                <View data={selectedUser} visible={userProfileVisible} close={() => closeVendorProfile()} />
            </Card>
        </>
    )
}

export default VendorsList

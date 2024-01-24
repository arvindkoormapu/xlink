import React, { useEffect, useState } from 'react'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import { Table, Tooltip, message, Button, Modal, Form, Input, Select, Popconfirm } from 'antd';
import {
    EyeOutlined,
    DeleteOutlined,
    PlusOutlined,
    EditOutlined
} from '@ant-design/icons';
import Flex from 'components/shared-components/Flex';
import { useDispatch, useSelector } from "react-redux";
import View from '../../vendor/vendor-user/view';
import { getUserProfilesAction, updateUserProfilesAction, deleteUserProfilesAction } from "../../../../store/actions/userProfileActions";
import { getVendorsAction } from "../../../../store/actions/vendorActions";
import UserProfileService from '../../../../services/UserProfileService';

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
};

const CreateForm = ({ visible, isEditEnabled, defaultValues, onCancel }) => {
    const [form] = Form.useForm();

    const vendorsList = useSelector((state) => state.vendorReducer).vendors;

    const dispatch = useDispatch();

    const [messageApi, contextHolder] = message.useMessage();
    const [vendorSelectOptions, setVendorSelectOptions] = useState([]);

    useEffect(() => {
        form.setFieldsValue(defaultValues)
    }, [form, defaultValues])

    useEffect(() => {
        dispatch(getVendorsAction())
    }, [])

    useEffect(() => {
        const newArray = vendorsList.reduce((acc, item) => {
            acc.push({ value: item.vendorid, label: item.name });
            return acc;
        }, []);
        setVendorSelectOptions(newArray)
    }, [vendorsList])

    const onCreate = values => {
        console.log('Received values of form: ', values);
        if (!isEditEnabled) {
            UserProfileService.createUserProfile(values)
                .then((response) => {
                    if (response.success) {
                        dispatch(getUserProfilesAction())
                        messageApi.open({
                            type: 'success',
                            content: 'Successfully added',
                        });
                    }
                })
                .catch((error) => {
                    messageApi.open({
                        type: 'error',
                        content: error,
                    });
                })
        }
        if (isEditEnabled) {
            dispatch(updateUserProfilesAction(defaultValues.id, {'email': values.email, 'vendorid': values.vendorid}))
        }
    };

    return (
        <div>
            {contextHolder}
            <Modal
                open={visible}
                title={isEditEnabled ? 'Edit User profile' : 'Create a User profile'}
                okText={isEditEnabled ? "Update" : "Create"}
                cancelText="Cancel"
                onCancel={onCancel}
                onOk={() => {
                    form
                        .validateFields()
                        .then(values => {
                            form.resetFields();
                            onCreate(values);
                            onCancel()
                        })
                        .catch(info => {
                            console.log('Validate Failed:', info);
                        });
                }}
            >
                <Form
                    {...layout}
                    form={form}
                    name="form_in_modal"
                    initialValues={isEditEnabled && {
                        email: defaultValues.email
                    }}
                >
                    <Form.Item
                        name="email"
                        label="E-mail"
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="vendorid" label="Vendor" rules={[{ required: true }]}>
                        <Select
                            showSearch
                            mode="multiple"
                            allowClear
                            style={{
                                width: '100%',
                            }}
                            placeholder="Select a vendor"
                            options={vendorSelectOptions}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

function UserList() {

    const defaults = {
        id: '',
        email: '',
        vendorid: ''
    }

    const dispatch = useDispatch();

    const userProfilesList = useSelector((state) => state.userProfileReducer).user_profiles;

    const [userProfileVisible, setUserProfileVisible] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isEditEnabled, setIsEditEnabled] = useState(false)
    const [elementValues, setElementValues] = useState(defaults)

    useEffect(() => {
        dispatch(getUserProfilesAction())
    }, [])

    const showUserProfile = userInfo => {
        setUserProfileVisible(true)
        setSelectedUser(userInfo)
    };

    const closeUserProfile = () => {
        setUserProfileVisible(false)
        setSelectedUser(null)
    }

    const onDelete = el => {
        dispatch(deleteUserProfilesAction(el.userprofileid))
    }

    const showEditUserProfile = el => {
        const vendorids = el.vendorprofiles.reduce((acc, item) => {
            acc.push({ value: item.vendorid, label: item.name });
            return acc;
        }, []);
        const newObj = { ...defaults }
        newObj.id = el.userprofileid
        newObj.email = el.email
        newObj.vendorid = vendorids
        setElementValues(newObj)
        setIsModalOpen(true)
        setIsEditEnabled(true)
    }

    const tableColumns = [
        {
            title: 'Email',
            dataIndex: 'email'
        },
        {
            title: 'Vendor',
            dataIndex: 'vendorprofiles',
            render: (vendorprofiles) => vendorprofiles.map(vendorprofile => vendorprofile.name).join(', '),
        },
        {
            title: '',
            dataIndex: 'actions',
            render: (_, elm) => (
                <div className="text-right d-flex justify-content-end">
                    <Tooltip title="View">
                        <Button type="default" className="mr-2" icon={<EyeOutlined />} onClick={() => showUserProfile(elm)} size="small" />
                    </Tooltip>
                    <Tooltip title="Edit">
                        <Button type="default" className="mr-2" icon={<EditOutlined />} onClick={() => showEditUserProfile(elm)} size="small" />
                    </Tooltip>
                    <Popconfirm title="Are you sure?" onConfirm={() => onDelete(elm)}>
                        <Button danger icon={<DeleteOutlined />} size="small" />
                    </Popconfirm>
                </div>
            )
        }
    ];

    return (
        <>
            <PageHeaderAlt className="border-bottom">
                <div className="container-fluid">
                    <Flex justifyContent="space-between" alignItems="center" className="py-4">
                        <h2>Vendor Users</h2>
                        <div>
                            <Button type="primary" className="ml-2" onClick={() => setIsModalOpen(true)}>
                                <PlusOutlined />
                                <span>Add Vendor Users</span>
                            </Button>
                        </div>
                    </Flex>
                </div>
            </PageHeaderAlt>
            <div className="my-4 container">
                <Table columns={tableColumns} dataSource={userProfilesList} rowKey='userprofileid' />
            </div>
            <View data={selectedUser} visible={userProfileVisible} close={() => closeUserProfile()} />
            <CreateForm
                visible={isModalOpen}
                isEditEnabled={isEditEnabled}
                defaultValues={elementValues}
                onCancel={() => {
                    setIsModalOpen(false)
                    setIsEditEnabled(false)
                    setElementValues(defaults)
                }}
            />
        </>
    )
}

export default UserList

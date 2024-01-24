import React, { useEffect, useState, useContext } from 'react'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import { Table, Tooltip, message, Button, Modal, Form, Input, Select, Popconfirm, Tag, Radio } from 'antd';
import {
    EyeOutlined,
    DeleteOutlined,
    PlusOutlined,
    EditOutlined
} from '@ant-design/icons';
import Flex from 'components/shared-components/Flex';
import { useDispatch, useSelector } from "react-redux";
import View from './view';
import { getUserProfilesAction, updateUserProfilesAction, deleteUserProfilesAction } from "../../../store/actions/userProfileActions";
import { getPlatformsAction } from "../../../store/actions/platformActions";
import { getVendorsAction } from "../../../store/actions/vendorActions";
import UserProfileService from '../../../services/UserProfileService';
import { UserRole } from "../../../constants/ApiConstant";
import { AuthContext } from '../../../auth/AuthContext';

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
};

const CreateForm = ({ visible, isEditEnabled, defaultValues, onCancel }) => {
    const { currentUser } = useContext(AuthContext);
    const [form] = Form.useForm();
    const vendorsList = useSelector((state) => state.vendorReducer).vendors;
    const platformsList = useSelector((state) => state.platformReducer).platforms;

    const dispatch = useDispatch();

    const [messageApi, contextHolder] = message.useMessage();
    const [vendorSelectOptions, setVendorSelectOptions] = useState();
    const [platformSelectOptions, setPlatformSelectOptions] = useState();

    useEffect(() => {
        form.setFieldsValue(defaultValues)
        console.log({ defaultValues })
    }, [form, defaultValues])

    useEffect(() => {
        dispatch(getVendorsAction())
        dispatch(getPlatformsAction())
    }, [])

    useEffect(() => {
        const newArray = vendorsList.reduce((acc, item) => {
            acc.push({ value: item.vendorid, label: item.name });
            return acc;
        }, []);
        setVendorSelectOptions(newArray)
    }, [vendorsList])

    useEffect(() => {
        const newArray = platformsList.reduce((acc, item) => {
            acc.push({ value: item.platformid, label: item.name });
            return acc;
        }, []);
        setPlatformSelectOptions(newArray)
    }, [platformsList])

    const onCreate = async (values) => {
        console.log('Received values of form: ', values);
        const token = await currentUser.getIdToken();
        let payload = {}
        payload.email = values.email
        payload.role = values.role
        payload.profileids = values.platformid ? values.platformid : values.vendorid
        if (!isEditEnabled) {
            UserProfileService.createUserProfile(payload)
                .then((response) => {
                    if (response.success) {
                        dispatch(getUserProfilesAction(token))
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
            dispatch(updateUserProfilesAction(defaultValues.id, payload, token))
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
                    <Form.Item label="Role" name="role" rules={[{ required: true }]}>
                        <Radio.Group>
                            <Radio value={UserRole.VENDOR}> Vendor </Radio>
                            <Radio value={UserRole.PLATFORM}> Platform </Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        noStyle
                        shouldUpdate={(prevValues, currentValues) => prevValues.role !== currentValues.role}
                    >
                        {({ getFieldValue }) =>
                            getFieldValue('role') === UserRole.VENDOR ? (
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
                            ) : null
                        }
                    </Form.Item>
                    <Form.Item
                        noStyle
                        shouldUpdate={(prevValues, currentValues) => prevValues.role !== currentValues.role}
                    >
                        {({ getFieldValue }) =>
                            getFieldValue('role') === UserRole.PLATFORM ? (
                                <Form.Item name="platformid" label="Platform" rules={[{ required: true }]}>
                                    <Select
                                        showSearch
                                        mode="multiple"
                                        allowClear
                                        style={{
                                            width: '100%',
                                        }}
                                        placeholder="Select a platform"
                                        options={platformSelectOptions}
                                    />
                                </Form.Item>
                            ) : null
                        }
                    </Form.Item>

                </Form>
            </Modal>
        </div>
    );
};

function UsersList() {
    const { currentUser } = useContext(AuthContext);

    const defaults = {
        id: '',
        email: '',
        role: '',
        vendorid: null,
        platformid: null
    }

    const dispatch = useDispatch();

    const userProfilesList = useSelector((state) => state.userProfileReducer).user_profiles;

    const [userProfileVisible, setUserProfileVisible] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isEditEnabled, setIsEditEnabled] = useState(false)
    const [elementValues, setElementValues] = useState()

    useEffect(() => {
        async function fetchMyAPI() {
            const token = await currentUser.getIdToken();
            dispatch(getUserProfilesAction(token))
        }

        fetchMyAPI()

    }, [currentUser])

    const showUserProfile = userInfo => {
        setUserProfileVisible(true)
        setSelectedUser(userInfo)
    };

    const closeUserProfile = () => {
        setUserProfileVisible(false)
        setSelectedUser(null)
    }

    const onDelete = el => {
        let role
        if (el.roleid == 2) role = UserRole.VENDOR
        if (el.roleid == 3) role = UserRole.PLATFORM
        dispatch(deleteUserProfilesAction(el.userprofileid, role))
    }

    const showEditUserProfile = el => {
        const profileids = el.profiles.reduce((acc, item) => {
            acc.push({ value: el.roleid == 2 ? item.vendorid : item.platformid, label: item.name });
            return acc;
        }, []);
        const newObj = { ...defaults }
        newObj.id = el.userprofileid
        newObj.role = el.roleid == 2 ? UserRole.VENDOR : UserRole.PLATFORM
        newObj.email = el.email
        if (el.roleid == 2) newObj.vendorid = profileids
        if (el.roleid == 3) newObj.platformid = profileids
        setElementValues(newObj)
        setIsModalOpen(true)
        setIsEditEnabled(true)
    }

    const renderCurrentRole = (roleid) => {
        switch (roleid) {
            case 2:
                return 'VENDOR';
            case 3:
                return 'PLATFORM';
            default:
                return null;
        }
    };

    const tableColumns = [
        {
            title: 'Email',
            dataIndex: 'email'
        },
        {
            title: 'Role',
            dataIndex: 'roleid',
            render: (roleid) => (<Tag className="text-capitalize" color={roleid == 2 ? "blue" : "green"}>{renderCurrentRole(roleid)}</Tag>)
        },
        {
            title: 'Mapped Profiles',
            dataIndex: 'profiles',
            render: (profiles) => profiles != null && profiles.map(profile => profile.name).join(', '),
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
                        <h2>Users</h2>
                        <div>
                            <Button type="primary" className="ml-2" onClick={() => setIsModalOpen(true)}>
                                <PlusOutlined />
                                <span>Add Users</span>
                            </Button>
                        </div>
                    </Flex>
                </div>
            </PageHeaderAlt>
            <div className="my-4 container">
                <Table columns={tableColumns} dataSource={userProfilesList} rowKey='userprofileid' />
            </div>
            <View data={selectedUser} visible={userProfileVisible} close={() => closeUserProfile()} />
            {isModalOpen ?
                <CreateForm
                    visible={isModalOpen}
                    isEditEnabled={isEditEnabled}
                    defaultValues={elementValues}
                    onCancel={() => {
                        setIsModalOpen(false)
                        setIsEditEnabled(false)
                        setElementValues(defaults)
                    }}
                /> : null
            }
        </>
    )
}

export default UsersList

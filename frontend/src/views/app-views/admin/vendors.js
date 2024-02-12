import React, { Component, useEffect, useState, useContext } from 'react'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import { Table, Tag, Tooltip, message, Button, Modal, Form, Input, Upload, Popconfirm } from 'antd';
import {
  EyeOutlined,
  DeleteOutlined,
  PlusOutlined,
  UploadOutlined,
  EditOutlined
} from '@ant-design/icons';
import Flex from 'components/shared-components/Flex';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import { useDispatch, useSelector } from "react-redux";
import View from './view';
import { getVendorsAction, createVendorAction, updateVendorAction, deleteVendorAction } from "../../../store/actions/vendorActions";
import { AuthContext } from '../../../auth/AuthContext';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

const CreateForm = ({ visible, isEditEnabled, defaultValues, onCancel }) => {
  const { currentUser } = useContext(AuthContext);

  const dispatch = useDispatch();

  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(defaultValues)
  }, [form, defaultValues])

  const onCreate = async values => {
    console.log('Received values of form: ', values);
    const token = await currentUser.getIdToken();
    if (!isEditEnabled) {
      let formData = new FormData();
      formData.append('name', values.name);
      formData.append('emailaddress1', values.emailaddress1);
      formData.append('contactnumber', values.contactnumber);
      formData.append('url', values.url);
      formData.append('city', values.city);
      formData.append('image', values.image.fileList[0].originFileObj);
      dispatch(createVendorAction(formData, token))
      messageApi.open({
        type: 'success',
        content: 'Successfully added!',
      });
    }
    if (isEditEnabled) {
      const data = {...values}
      data.image = values[defaultValues.image]
      let formData = new FormData();
      formData.append('name', data.name);
      formData.append('emailaddress1', data.emailaddress1);
      formData.append('contactnumber', data.contactnumber);
      formData.append('url', data.url);
      formData.append('city', data.city);
      if (data.image) {
        formData.append('image', data.image.fileList[0].originFileObj);
      }
      dispatch(updateVendorAction(defaultValues.vendorid, formData, token))
    }
  };

  return (
    <div>
      {contextHolder}
      <Modal
        forceRender
        open={visible}
        title={isEditEnabled ? "Edit Vendor profile" : "Create a Vendor profile"}
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
          initialValues={{
            modifier: 'public',
          }}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: 'Please input your name!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="emailaddress1"
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
          <Form.Item
            name="contactnumber"
            label="Phone Number"
            rules={[{ required: true, message: 'Please input your phone number!' }]}
          >
            <Input style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="url"
            label="URL"
            rules={[{ required: true, message: 'Please input your website!' }]}
          >
            <Input style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="city"
            label="City"
            rules={[{ required: true, message: 'Please input your city!' }]}
          >
            <Input style={{ width: '100%' }} />
          </Form.Item>
          {!isEditEnabled ?
            <Form.Item
              name="image"
              label="Profile Image"
            >
              <Upload beforeUpload={() => false} accept="image/*" name="logo" listType="picture" maxCount={1}>
                <Button>
                  <UploadOutlined /> Select File
                </Button>
              </Upload>
            </Form.Item>
            :
            <Form.Item
              name={defaultValues.image}
              label="Profile Image"
            >
              {/* <img crossOrigin='anonymous' src={`${process.env.REACT_APP_API_BASE_URL}/${defaultValues.image}`} alt="avatar" /> */}
              <Upload beforeUpload={() => false} accept="image/*" name="logo" listType="picture" maxCount={1}>
                <Button>
                  <UploadOutlined /> Change profile image
                </Button>
              </Upload>
            </Form.Item>
          }
        </Form>
      </Modal>
    </div>
  );
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
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditEnabled, setIsEditEnabled] = useState(false)
  const [elementValues, setElementValues] = useState(null)

  const showVendorProfile = userInfo => {
    setVendorProfileVisible(true)
    setSelectedVendor(userInfo)
  };

  const closeVendorProfile = () => {
    setVendorProfileVisible(false)
    setSelectedVendor(null)
  }

  const onDelete = el => {
    dispatch(deleteVendorAction(el.vendorid))
  }

  const showEditUserProfile = el => {
    setElementValues(el)
    setIsModalOpen(true)
    setIsEditEnabled(true)
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
            <h2>Vendors</h2>
            <div>
              <Button type="primary" className="ml-2" onClick={() => setIsModalOpen(true)}>
                <PlusOutlined />
                <span>Add Vendor</span>
              </Button>
            </div>
          </Flex>
        </div>
      </PageHeaderAlt>
      <div className="my-4 container">
        <Table columns={tableColumns} dataSource={vendorsList} rowKey='vendorid' />
      </div>
      <View data={selectedUser} visible={userProfileVisible} close={() => closeVendorProfile()} />
      <CreateForm
        visible={isModalOpen}
        isEditEnabled={isEditEnabled}
        defaultValues={elementValues}
        onCancel={() => {
          setIsModalOpen(false)
          setIsEditEnabled(false)
          setElementValues(null)
        }}
      />
    </>
  )
}

export default VendorsList

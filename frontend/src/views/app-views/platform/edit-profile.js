import React, { Component, useEffect, useState, useContext } from 'react'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import { Table, Tag, Tooltip, message, Button, Modal, Form, Input, Upload, Avatar, DatePicker, Row, Col } from 'antd';
import Flex from 'components/shared-components/Flex';
import { useDispatch, useSelector } from "react-redux";
import { getPlatformsAction, createPlatformAction, updatePlatformAction, deletePlatformAction } from "../../../store/actions/platformActions";
import { AuthContext } from '../../../auth/AuthContext';
import { ROW_GUTTER } from 'constants/ThemeConstant';
import PageHeader from 'components/layout-components/PageHeader';

function EditProfile() {
  const { currentUser } = useContext(AuthContext);
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const platformState = useSelector((state) => state.platformReducer).platforms;

  useEffect(() => {
    async function fetchMyAPI() {
      const token = await currentUser.getIdToken();
      dispatch(getPlatformsAction(token))
    }

    fetchMyAPI()
  }, [currentUser])

  useEffect(() => {
    if(platformState && platformState.length > 0) form.setFieldsValue(platformState[0])
  }, [form, platformState.length])

  const onFinish = async (values) => {
    const token = await currentUser.getIdToken();
    const key = 'updatable';
    message.loading({ content: 'Updating...', key });
    const data = { ...values }
    // data.image = values[platformState[0].image]
    let formData = new FormData();
    formData.append('name', data.name);
    formData.append('emailaddress1', data.emailaddress1);
    formData.append('contactnumber', data.contactnumber);
    formData.append('url', data.url);
    formData.append('city', data.city);
    if(data.image){
      formData.append('image', data.image.fileList[0].originFileObj);
    }
    dispatch(updatePlatformAction(platformState[0].platformid, formData, token))
    message.success({ content: 'Done!', key, duration: 2 });

  };

  const onUploadAavater = info => {
    console.log(info)
    const key = 'updatable';
    const data = {...platformState[0]}
    data.image = info
    onFinish(data)
    message.success({ content: 'Uploaded!', key, duration: 1.5 });
  };

  return (
    <>
    <PageHeader display={true} title="Edit profile" />
      <Flex alignItems="center" mobileFlex={false} className="text-center text-md-left">
        {platformState && platformState.length > 0 &&
        <Avatar size={90} src={<img crossOrigin='anonymous' src={`${process.env.REACT_APP_API_BASE_URL}/${platformState[0].image}`} alt="avatar" />}  />

        }
        <div className="ml-3 mt-md-0 mt-3">
          <Upload onChange={onUploadAavater} showUploadList={false}>
            <Button type="primary">Change Avatar</Button>
          </Upload>
          {/* <Button className="ml-2" onClick={onRemoveAvater}>Remove</Button> */}
        </div>
      </Flex>
      <div className="mt-4">
        <Form
          form={form}
          name="basicInformation"
          layout="vertical"
          initialValues={{
            modifier: 'public',
          }}
          onFinish={onFinish}
        >
          <Row>
            <Col xs={24} sm={24} md={24} lg={16}>
              <Row gutter={ROW_GUTTER}>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your name!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    label="Email"
                    name="emailaddress1"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your email!'
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    label="Contact number"
                    name="contactnumber"
                    rules={[{
                      required: true,
                      message: 'Please enter a valid Contact number!'
                    }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    label="City"
                    name="city"
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    label="Website"
                    name="url"
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Button type="primary" htmlType="submit">
                Save Change
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  )
}

export default EditProfile

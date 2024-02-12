import React, { useEffect, useState, useContext } from "react";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import {
  Table,
  Tooltip,
  message,
  Button,
  Modal,
  Form,
  Input,
  Switch,
  Select,
} from "antd";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import Flex from "components/shared-components/Flex";
import { useDispatch, useSelector } from "react-redux";
import {
  getAddonsAction,
  createAddonsAction,
  updateAddonsAction,
} from "../../../store/actions/addonsActions";
import { AuthContext } from "../../../auth/AuthContext";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

const CreateForm = ({ visible, isEditEnabled, defaultValues, onCancel }) => {
  const { currentUser } = useContext(AuthContext);
  const dispatch = useDispatch();

  const [messageApi, contextHolder] = message.useMessage();
  const [vendorSelectOptions, setVendorSelectOptions] = useState();
  const [form] = Form.useForm();

  const vendorsList = useSelector((state) => state.vendorReducer).vendors;

  useEffect(() => {
    form.setFieldsValue(defaultValues);
  }, [form, defaultValues]);

  useEffect(() => {
    const newArray = vendorsList.reduce((acc, item) => {
      acc.push({ value: item.vendorid, label: item.name });
      return acc;
    }, []);
    setVendorSelectOptions(newArray);
  }, [vendorsList]);

  const onCreate = async (values) => {
    const token = await currentUser.getIdToken();
    if (!isEditEnabled) {
      const data = { ...values };
      data.limitedavailability = values.limitedavailability || false;
      dispatch(createAddonsAction(data, token));
      messageApi.open({
        type: "success",
        content: "Successfully added!",
      });
    }
    if (isEditEnabled) {
      const data = { ...values };
      data.limitedavailability = values.limitedavailability || false;
      dispatch(updateAddonsAction(defaultValues.addonid, data, token));
    }
  };

  return (
    <div>
      {contextHolder}
      <Modal
        forceRender
        open={visible}
        title={isEditEnabled ? "Edit taxes" : "Create taxes"}
        okText={isEditEnabled ? "Update" : "Create"}
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onCreate(values);
              onCancel();
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form
          {...layout}
          form={form}
          name="form_in_modal"
          initialValues={{
            modifier: "public",
          }}
        >
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.role !== currentValues.role
            }
          >
            <Form.Item
              name="vendorprofileid"
              label="Vendor"
              rules={[{ required: true }]}
            >
              <Select
                showSearch
                mode="single"
                allowClear
                style={{
                  width: "100%",
                }}
                placeholder="Select a vendor"
                options={vendorSelectOptions}
              />
            </Form.Item>
          </Form.Item>
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Please input name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[
              {
                required: true,
                message: "Please input price!",
              },
            ]}
          >
            <Input style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="pricingoption"
            label="Pricing option"
            rules={[
              {
                required: true,
                message: "Please input pricing option!",
              },
            ]}
          >
            <Input style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please input description" }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="limitedavailability" label="Limited availability" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item
            name="totalquantity"
            label="Total quantity"
            rules={[
              {
                required: true,
                message: "Please input total quantity!",
              },
            ]}
          >
            <Input style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="consumedquantity"
            label="Consumed quantity"
            rules={[
              {
                required: true,
                message: "Please input consumed quantity!",
              },
            ]}
          >
            <Input style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

function AddonsList() {
  const { currentUser } = useContext(AuthContext);
  const dispatch = useDispatch();

  const addonsList = useSelector((state) => state.addonsReducer).addons;
  const vendorsList = useSelector((state) => state.vendorReducer).vendors;

  useEffect(() => {
    async function fetchMyAPI() {
      const token = await currentUser.getIdToken();
      dispatch(getAddonsAction(token));
    }

    fetchMyAPI();
  }, [currentUser]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditEnabled, setIsEditEnabled] = useState(false);
  const [elementValues, setElementValues] = useState(null);

  const showEditUserProfile = (el) => {
    setElementValues(el);
    setIsModalOpen(true);
    setIsEditEnabled(true);
  };

  const tableColumns = [
    {
      title: "Vendor Name",
      dataIndex: "vendorprofileid",
      render: (vendorprofileid) => {
        const vendor = vendorsList.find((v) => v.vendorid === vendorprofileid);
        return vendor ? vendor.name : "Not found";
      },
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Pricing option",
      dataIndex: "pricingoption",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Limited availability",
      dataIndex: "limitedavailability",
      render: (text, record) => (record.priceinclusive ? "Yes" : "No"),
    },
    {
      title: "Total quantity",
      dataIndex: "totalquantity",
    },
    {
      title: "Consumed quantity",
      dataIndex: "consumedquantity",
    },
    {
      title: "",
      dataIndex: "actions",
      render: (_, elm) => (
        <div className="text-right d-flex justify-content-end">
          <Tooltip title="Edit">
            <Button
              type="default"
              className="mr-2"
              icon={<EditOutlined />}
              onClick={() => showEditUserProfile(elm)}
              size="small"
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <>
      <PageHeaderAlt className="border-bottom">
        <div className="container-fluid">
          <Flex
            justifyContent="space-between"
            alignItems="center"
            className="py-4"
          >
            <h2>Addons</h2>
            <div>
              <Button
                type="primary"
                className="ml-2"
                onClick={() => setIsModalOpen(true)}
              >
                <PlusOutlined />
                <span>Add Addons</span>
              </Button>
            </div>
          </Flex>
        </div>
      </PageHeaderAlt>
      <div className="my-4 container">
        <Table columns={tableColumns} dataSource={addonsList} rowKey="id" />
      </div>
      <CreateForm
        visible={isModalOpen}
        isEditEnabled={isEditEnabled}
        defaultValues={elementValues}
        onCancel={() => {
          setIsModalOpen(false);
          setIsEditEnabled(false);
          setElementValues(null);
        }}
      />
    </>
  );
}

export default AddonsList;

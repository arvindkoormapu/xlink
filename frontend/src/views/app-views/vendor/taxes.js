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
  Select
} from "antd";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import Flex from "components/shared-components/Flex";
import { useDispatch, useSelector } from "react-redux";
import View from "./view";
import {
  getTaxesAction,
  createTaxesAction,
  updateTaxesAction,
} from "../../../store/actions/taxesAction";
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
    setVendorSelectOptions(newArray)
}, [vendorsList])

  const onCreate = async (values) => {
    const token = await currentUser.getIdToken();
    if (!isEditEnabled) {
      const data = { ...values };
      data.percentage = values.percentage || false;
      data.priceinclusive = values.priceinclusive || false;
      data.compound = values.compound || false;
      data.isperticket = values.isperticket || false;
      dispatch(createTaxesAction(data, token));
      messageApi.open({
        type: "success",
        content: "Successfully added!",
      });
    }
    if (isEditEnabled) {
      const data = { ...values };
      data.percentage = values.percentage || false;
      data.priceinclusive = values.priceinclusive || false;
      data.compound = values.compound || false;
      data.isperticket = values.isperticket || false;
      dispatch(updateTaxesAction(defaultValues.taxid, data, token));
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
            name="label"
            label="Label"
            rules={[
              {
                required: true,
                message: "Please input label!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="type"
            label="Type"
            rules={[
              {
                required: true,
                message: "Please input type!",
              },
            ]}
          >
            <Input style={{ width: "100%" }} />
          </Form.Item>
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
          <Form.Item name="percentage" label="Percentage" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item name="value" label="Value">
            <Input style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="priceinclusive" label="Price inclusive" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item name="compound" label="Compound" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item name="isperticket" label="Is per ticket" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

function TaxesList() {
  const { currentUser } = useContext(AuthContext);
  const dispatch = useDispatch();

  const taxesList = useSelector((state) => state.taxesReducer).taxes;
  const vendorsList = useSelector((state) => state.vendorReducer).vendors;

  useEffect(() => {
    async function fetchMyAPI() {
      const token = await currentUser.getIdToken();
      dispatch(getTaxesAction(token));
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
      title: "Label",
      dataIndex: "label",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Vendor Name",
      dataIndex: "vendorprofileid", 
      render: (vendorprofileid) => {
        const vendor = vendorsList.find((v) => v.vendorid === vendorprofileid);
        return vendor ? vendor.name : "Not found";
      },
    },
    {
      title: "Percentage",
      dataIndex: "percentage",
      render: (text, record) => (record.percentage ? "Yes" : "No"),
    },
    {
      title: "Value",
      dataIndex: "value",
    },
    {
      title: "Price inclusive",
      dataIndex: "priceinclusive",
      render: (text, record) => (record.priceinclusive ? "Yes" : "No"),
    },
    {
      title: "Compound",
      dataIndex: "compound",
      render: (text, record) => (record.compound ? "Yes" : "No"),
    },
    {
      title: "Is per ticket",
      dataIndex: "isperticket",
      render: (text, record) => (record.isperticket ? "Yes" : "No"),
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
            <h2>Taxes</h2>
            <div>
              <Button
                type="primary"
                className="ml-2"
                onClick={() => setIsModalOpen(true)}
              >
                <PlusOutlined />
                <span>Add taxes</span>
              </Button>
            </div>
          </Flex>
        </div>
      </PageHeaderAlt>
      <div className="my-4 container">
        <Table columns={tableColumns} dataSource={taxesList} rowKey="id" />
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

export default TaxesList;

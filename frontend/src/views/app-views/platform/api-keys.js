/** @jsxImportSource @emotion/react */
import { useState, useContext, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Divider,
  Button,
  message,
  Modal,
  Form,
  Input,
  Select,
} from "antd";
import AvatarStatus from "components/shared-components/AvatarStatus";
import { css } from "@emotion/react";
import { PlusOutlined, EyeOutlined, KeyOutlined } from "@ant-design/icons";
import { Icon } from "components/util-components/Icon";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../../../auth/AuthContext";
import {
  getApikeysAction,
  createApikeyAction,
  updateApikeyActiveStateAction,
  updateApikeySeenStateAction,
} from "../../../store/actions/apikeyAction";
import moment from "moment";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

function maskString(str) {
  if (str.length <= 4) return str;
  const totalLength = str.length;
  const paddingLength = Math.max(0, Math.floor((totalLength - 4) / 2));
  return "*".repeat(paddingLength) + str.substr(-4) + "*".repeat(paddingLength);
}

const CreateForm = ({ visible, onCancel }) => {
  const { currentUser } = useContext(AuthContext);
  const dispatch = useDispatch();

  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const onCreate = async (values) => {
    console.log("Received values of form: ", values);
    const token = await currentUser.getIdToken();
    dispatch(createApikeyAction(values, token));
  };

  return (
    <div>
      {contextHolder}
      <Modal
        forceRender
        open={visible}
        title={"Create api key"}
        okText={"Create"}
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
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please input description" }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="whitelisted_ips"
            label="Whitelist ips"
            rules={[{ required: true, message: "Please input Whitelist ips!" }]}
          >
            <Select
              mode="tags"
              style={{ width: "100%" }}
              placeholder="Enter tags"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

function ApiKeys() {
  const { currentUser } = useContext(AuthContext);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSecreatKey, setShowSecreatKey] = useState("-1");

  const apikeysList = useSelector((state) => state.apikeysReducer).apikeys;

  useEffect(() => {
    async function fetchMyAPI() {
      const token = await currentUser.getIdToken();
      dispatch(getApikeysAction(token));
    }

    fetchMyAPI();
  }, [currentUser]);

  const onChangeSwitch = async (id, active) => {
    const token = await currentUser.getIdToken();
    dispatch(updateApikeyActiveStateAction(id, !active, token));
  };

  const onChangeSeenState = async (index, id) => {
    const token = await currentUser.getIdToken();
    setShowSecreatKey(index);
    dispatch(updateApikeySeenStateAction(id, token));
  };

  return (
    <>
      <div
        css={css`
          align-items: center;
          margin-bottom: 1rem;
          justify-content: space-between;
          display: flex;
        `}
      >
        <h3 className="mb-0 mr-3 font-weight-semibold">API Keys</h3>
        <div>
          <Button
            type="primary"
            className="ml-2"
            onClick={() => setIsModalOpen(true)}
          >
            <PlusOutlined />
            <span>Add Api key</span>
          </Button>
        </div>
      </div>
      <Card>
        <div className="mb-3">
          <Row>
            <Col sm={24} md={22}>
              {apikeysList.map((elm, i) => {
                return (
                  <div
                    className={`${i === apikeysList.length - 1 ? "" : "mb-4"}`}
                    key={`eduction-${i}`}
                  >
                    <AvatarStatus
                      checked={elm.active}
                      onChangeSwitch={() => onChangeSwitch(elm.id, elm.active)}
                      name={elm.name}
                      subTitle={moment(elm.created_at).format(
                        "MMMM Do YYYY, h:mm:ss a"
                      )}
                    />
                    <p className="pl-5 mt-2 mb-0">{elm.description}</p>
                    <Row className="ml-5 mt-2 mb-0">
                      <Col span={12}>
                        <Row className="mb-2" align="middle">
                          <Col span={8}>
                            <Icon
                              type={KeyOutlined}
                              className="text-primary font-size-md"
                            />
                            <span className="text-muted ml-2">Api key:</span>
                          </Col>
                          <Col span={12}>
                            <span className="font-weight-semibold">
                              <code>{elm.apikey}</code>
                            </span>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Row className="ml-5 mt-2 mb-0">
                      <Col xs={24} sm={24} md={12}>
                        <Row className="mb-2" align="middle">
                          <Col xs={12} sm={12} md={8}>
                            <Icon
                              type={KeyOutlined}
                              className="text-primary font-size-md"
                            />
                            <span className="text-muted ml-2">Secret:</span>
                          </Col>
                          <Row>
                            <Col xs={12} sm={12} md={24}>
                              <span className="font-weight-semibold">
                                <code>
                                  {showSecreatKey === i
                                    ? elm.secret
                                    : maskString(elm.secret)}
                                </code>
                              </span>
                              {!elm.seen && (
                                <Button
                                  className="ml-2"
                                  type="primary"
                                  shape="circle"
                                  icon={<EyeOutlined />}
                                  onClick={() => onChangeSeenState(i, elm.id)}
                                ></Button>
                              )}
                            </Col>
                          </Row>
                        </Row>
                      </Col>
                    </Row>
                    <Divider />
                  </div>
                );
              })}
            </Col>
          </Row>
        </div>
      </Card>
      <CreateForm
        visible={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
        }}
      />
    </>
  );
}

export default ApiKeys;

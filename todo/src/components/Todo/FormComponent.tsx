import React, { useState, useContext, useEffect } from "react";
import {
  Layout,
  Form,
  Input,
  DatePicker,
  Button,
  Row,
  Col,
  Alert,
  Radio,
} from "antd";
import moment, { Moment } from "moment";
import { AppContext } from "../../modules/Context";
import { useParams } from "react-router-dom";
const { Content } = Layout;

const { TextArea } = Input;
const STATUSCONSTANTS = [
  {
    key: "Done",
    value: "done",
  },
  {
    key: "Pending",
    value: "pending",
  },
];
type AlertMessageType = "success" | "error" | "info" | "warning" | undefined;

type AlertType = {
  show: boolean;
  message: string;
  type: AlertMessageType;
};

const FormComponent: React.FC = () => {
  const { id: taskId } = useParams<{ id: string }>();
  const { addTodo, updateTodo, refreshState } = useContext(AppContext);
  const [form] = Form.useForm();
  const [alert, setAlert] = useState<AlertType>({
    show: false,
    message: "",
    type: undefined,
  });

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onFinish = async (values: any) => {
    try {
      console.log(values);
      taskId ? await updateTodo(taskId, values) : await addTodo(values);
      setAlert({
        show: true,
        message: " Successsfully,Task added To ToDo list",
        type: "success",
      });
    } catch (err) {
      console.log({ err });
      setAlert({
        show: true,
        message: "Error on Adding task to ToDo list",
        type: "error",
      });
    }
  };
  useEffect(() => {}, [alert]);

  return (
    <Content
      style={{
        padding: 24,
        margin: 0,
        minHeight: 280,
        background: "#ffffff",
      }}
    >
      <Row justify="center">
        <Col span={12}>
          {alert?.show && <Alert message={alert?.message} type={alert?.type} />}

          <Form
            form={form}
            name="todo_form"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
            size="large"
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please enter a name" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Short Description"
              name="shortDescription"
              rules={[
                { required: true, message: "Please enter a short description" },
              ]}
            >
              <TextArea rows={4} />
            </Form.Item>

            <Form.Item
              label="Date Time"
              name="dateTime"
              rules={[
                { required: true, message: "Please select a due date time" },
                // () => ({
                //   validator(_, value) {
                //     if (moment(value).isSameOrBefore(moment())) {
                //       return Promise.reject(
                //         new Error("Datetime must be ahead of current Datetime")
                //       );
                //     }
                //     return Promise.resolve();
                //   },
                // }),
              ]}
            >
              <DatePicker
                format="YYYY-MM-DD h:mm A "
                showTime
                use12Hours
                size="large"
              />
            </Form.Item>
            {taskId && (
              <Form.Item
                name="status"
                label="Task"
                rules={[
                  {
                    required: true,
                    message: "Please select an option",
                  },
                ]}
              >
                <Radio.Group>
                  {STATUSCONSTANTS.map((elem) => (
                    <Radio value={elem.value}>{elem.key}</Radio>
                  ))}
                </Radio.Group>
              </Form.Item>
            )}
            <Form.Item>
              {taskId ? (
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "50%" }}
                >
                  updateTodo
                </Button>
              ) : (
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "50%" }}
                >
                  Add Todo
                </Button>
              )}
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Content>
  );
};

export default FormComponent;

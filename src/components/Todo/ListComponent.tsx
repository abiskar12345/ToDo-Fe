import React, { useContext, useEffect, useState } from "react";
import {
  Radio,
  Row,
  Col,
  List,
  Layout,
  Typography,
  Tag,
  Button,
  Modal,
} from "antd";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { AppContext, Todo } from "../../modules/Context";
import { RadioChangeEvent } from "antd/lib/radio";
const { Title } = Typography;
const { Header, Content } = Layout;

const ListComponent: React.FC = () => {
  const [filter, setFilter] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { todos, deleteTodo, getTodos, refresh } = useContext(AppContext);
  const [selectedTask, setSelectedTask] = useState<string>();
  const navigate = useNavigate();
  const filteredTodos: Todo[] =
    filter === "completed"
      ? todos.filter((todo) => todo.status === "done")
      : filter === "pending"
      ? todos.filter((todo) => todo.status === "pending")
      : filter === "upcoming"
      ? todos.filter(
          (todo) =>
            todo.status !== "done" && moment(todo.dateTime).isAfter(moment())
        )
      : todos;

  const handleFilterChange = (e: RadioChangeEvent) => {
    setFilter(e.target.value);
  };

  const showModal = (id: string) => {
    setSelectedTask(id);
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setSelectedTask(undefined);
    setIsModalOpen(false);
  };
  const handleDelete = async () => {
    try {
      await deleteTodo(selectedTask);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/todo/edit/${id}`);
  };
  console.log(todos);

  useEffect(() => {
    getTodos({});
  }, [getTodos, refresh]);

  return (
    <Layout>
      <Content>
        <Row justify="center">
          <Col span={12}>
            <Modal
              title="Are you sure to Delete Task"
              open={isModalOpen}
              onOk={handleDelete}
              okText="Delete"
              okType="danger"
              onCancel={handleCancel}
            ></Modal>
            <Radio.Group
              value={filter}
              onChange={handleFilterChange}
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: 16,
                backgroundColor: "#f7f7f7",
                padding: "8px",
                borderRadius: "4px",
              }}
              buttonStyle="solid"
            >
              <Radio.Button value="all">All</Radio.Button>
              <Radio.Button value="completed">Completed</Radio.Button>
              <Radio.Button value="pending">Pending</Radio.Button>
              <Radio.Button value="upcoming">Upcoming</Radio.Button>
            </Radio.Group>

            <List
              itemLayout="horizontal"
              dataSource={filteredTodos}
              renderItem={(todo: Todo) => (
                <List.Item
                  style={{
                    backgroundColor: "#fff",
                    border: "1px solid #e8e8e8",
                    borderRadius: "4px",
                    marginBottom: "8px",
                    padding: "16px",
                  }}
                >
                  <List.Item.Meta
                    title={todo.name}
                    description={
                      <div>
                        <div>{todo.shortDescription}</div>
                        <div style={{ marginTop: "8px" }}>
                          <Tag
                            color={todo.status === "done" ? "green" : "yellow"}
                          >
                            {todo.status === "done" ? "Completed" : "pending"}
                          </Tag>
                          <span style={{ marginLeft: "8px" }}>
                            Due:{" "}
                            {moment(todo.dateTime).format(
                              "MMM DD YYYY, h:mm a"
                            )}
                          </span>
                        </div>
                      </div>
                    }
                  />
                  <List.Item
                    actions={[
                      <Button onClick={() => handleEdit(todo._id)}>
                        Edit
                      </Button>,
                      <Button onClick={() => showModal(todo._id)}>
                        Delete
                      </Button>,
                    ]}
                  ></List.Item>
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default ListComponent;

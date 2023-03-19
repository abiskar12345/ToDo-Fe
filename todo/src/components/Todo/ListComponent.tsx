import React, { useContext, useEffect, useState } from "react";
import { Radio, List, Layout, Typography, Tag } from "antd";
import moment from "moment";
import { AppContext, Todo } from "../../modules/Context";
import { RadioChangeEvent } from "antd/lib/radio";
const { Title } = Typography;
const { Header, Content } = Layout;

const ListComponent: React.FC = () => {
  const [filter, setFilter] = useState<string>("all");
  const { todos, deleteTodo, getTodos, refresh } = useContext(AppContext);

  const filteredTodos: Todo[] =
    filter === "completed"
      ? todos.filter((todo) => todo.status === "done")
      : filter === "incomplete"
      ? todos.filter((todo) => todo.status == "pending")
      : filter === "upcoming"
      ? todos.filter(
          (todo) =>
            todo.status !== "done" && moment(todo.dateTime).isAfter(moment())
        )
      : todos;

  const handleFilterChange = (e: RadioChangeEvent) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    getTodos({});
  }, [getTodos, refresh]);

  return (
    <Layout>
      <Content>
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
          <Radio.Button value="incomplete">Incomplete</Radio.Button>
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
                      <Tag color={todo.status === "done" ? "green" : "yellow"}>
                        {todo.status === "done" ? "Completed" : "pending"}
                      </Tag>
                      <span style={{ marginLeft: "8px" }}>
                        Due:{" "}
                        {moment(todo.dateTime).format("MMM DD YYYY, h:mm a")}
                      </span>
                    </div>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </Content>
    </Layout>
  );
};

export default ListComponent;

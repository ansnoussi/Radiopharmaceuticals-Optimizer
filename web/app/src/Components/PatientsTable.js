import React from "react";
import "../App.css";
import "antd/dist/antd.css";

import {
  Table,
  Space,
  Button,
  Popconfirm,
  message,
  Spin,
  Typography,
} from "antd";
import {
  MenuOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import {
  sortableContainer,
  sortableElement,
  sortableHandle,
} from "react-sortable-hoc";
import arrayMove from "array-move";

const { Text } = Typography;

const DragHandle = sortableHandle(() => (
  <MenuOutlined style={{ cursor: "pointer", color: "#999" }} />
));

const SortableItem = sortableElement((props) => <tr {...props} />);
const SortableContainer = sortableContainer((props) => <tbody {...props} />);

function confirm() {
  message.success("Click on Yes");
}

function cancel() {
  message.error("Click on No");
}

const columns = [
  {
    title: "Sort",
    dataIndex: "sort",
    width: 30,
    className: "drag-visible",
    render: (a, b) => {
      if (b.tags[0] === "waiting") {
        return <DragHandle />;
      }
    },
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <Text style={{ color: "#1890ff" }}>{text}</Text>,
  },
  {
    title: "Dose (MBq)",
    dataIndex: "dose",
    key: "dose",
  },
  {
    title: "Test Duration (min)",
    dataIndex: "duration",
    key: "duration",
    render: (text) => <p>{text} minutes</p>,
  },
  {
    title: "Status",
    key: "tags",
    dataIndex: "tags",
    render: (tags) => (
      <>
        {tags.map((tag, idx) => {
          if (tag === "done") {
            return (
              <CheckCircleOutlined
                key={idx}
                style={{ color: "green", fontSize: "23px" }}
              />
            );
          }

          if (tag === "test") {
            return <Spin key={idx} />;
          }

          if (tag === "waiting") {
            return (
              <ClockCircleOutlined
                key={idx}
                style={{ color: "orange", fontSize: "23px" }}
              />
            );
          }

          return (
            <ExclamationCircleOutlined
              key={idx}
              style={{ color: "red", fontSize: "23px" }}
            />
          );
        })}
      </>
    ),
  },
  {
    title: "Actions",
    key: "action",
    render: (text, record) => (
      <Space size="middle">
        <Popconfirm
          title="Are you sure to inject this patient?"
          onConfirm={confirm}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <Button size="small">Inject {record.name}</Button>
        </Popconfirm>
      </Space>
    ),
  },
];

class PatientsTable extends React.Component {
  onSortEnd = ({ oldIndex, newIndex }) => {
    const { dataSource } = this.props;
    if (dataSource[newIndex].tags[0] !== "waiting") {
      return;
    } else if (oldIndex !== newIndex) {
      const newData = arrayMove(
        [].concat(dataSource),
        oldIndex,
        newIndex
      ).filter((el) => !!el);
      // console.log('Sorted items: ', newData);
      this.props.updateData(newData);
    }
  };

  DraggableContainer = (props) => (
    <SortableContainer
      useDragHandle
      disableAutoscroll
      helperClass="row-dragging"
      onSortEnd={this.onSortEnd}
      {...props}
    />
  );

  DraggableBodyRow = ({ className, style, ...restProps }) => {
    const { dataSource } = this.props;
    // function findIndex base on Table rowKey props and should always be a right array index
    const index = dataSource.findIndex(
      (x) => x.index === restProps["data-row-key"]
    );
    return <SortableItem index={index} {...restProps} />;
  };

  render() {
    return (
      <Table
        pagination={false}
        dataSource={this.props.dataSource}
        columns={columns}
        rowKey="index"
        components={{
          body: {
            wrapper: this.DraggableContainer,
            row: this.DraggableBodyRow,
          },
        }}
      />
    );
  }
}

export default PatientsTable;

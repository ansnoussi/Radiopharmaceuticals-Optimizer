import React from "react";
import {
  Space,
  Button,
  Popconfirm,
  message,
  Spin,
  DatePicker,
  Typography,
} from "antd";
import {
  MenuOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  ExperimentOutlined,
} from "@ant-design/icons";
import { sortableHandle } from "react-sortable-hoc";
import { confirmInjection } from "../utils/utils";

const { Text } = Typography;

const DragHandle = sortableHandle(() => (
  <MenuOutlined style={{ cursor: "pointer", color: "#999" }} />
));

const TableColums = (
  modifyPatient,
  deletePatient,
  updateRecordMeasureTime,
  patientsList,
  updateData
) => {
  return [
    {
      title: "",
      fixed: 'left',
      width: 100,
      dataIndex: "sort",
      width: 30,
      className: "drag-visible",
      render: (a, b) => {
        if (b.status === "waiting") {
          return <DragHandle />;
        }
      },
    },
    {
      title: "Name",
      width: 130,
      fixed: 'left',
      dataIndex: "name",
      key: "name",
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: () => {
        return (
          <div style={{ textAlign: "center" }}>
            <ExperimentOutlined /> Injection time
          </div>
        );
      },
      width: 100,
      dataIndex: "expected_injection_time",
      key: "expected_injection_time",
      render(text) {
        return {
          props: {
            style: { background: "rgba(245, 206, 39, 0.41)" },
          },
          children: <Text>{text || "?"}</Text>,
        };
      },
    },
    {
      title: () => {
        return (
          <div style={{ textAlign: "center" }}>
            <ExperimentOutlined /> Injection volume (ml)
          </div>
        );
      },
      width: 100,
      dataIndex: "expected_injection_volume",
      key: "expected_injection_volume",
      render(text) {
        return {
          props: {
            style: { background: "rgba(245, 206, 39, 0.41)" },
          },
          children: <Text>{text || "?"}</Text>,
        };
      },
    },
    {
      title: "Dose (MBq)",
      width: 100,
      dataIndex: "dose",
      key: "dose",
    },
    {
      title: "Test Duration (min)",
      width: 100,
      dataIndex: "duration",
      key: "duration",
      render: (text) => <Text>{text}</Text>,
    },
    {
      title: "Actions",
      width: 300,
      key: "action",
      render: (text, record) => (
        <Space>
          <Button
            size="small"
            type="primary"
            ghost
            disabled={record.status !== "waiting"}
            onClick={() => {
              modifyPatient(record);
            }}
          >
            <EditOutlined />
            Modify
          </Button>

          {record.status === "waiting" ? (
            <Popconfirm
              title={"Proceed to delete ?"}
              icon={<ExclamationCircleOutlined style={{ color: "red" }} />}
              onConfirm={() => {
                deletePatient(record);
              }}
              okText="Delete Patient"
              okButtonProps={{
                danger: true,
              }}
              cancelText="Cancel"
            >
              <Button danger size="small">
                <DeleteOutlined />
                Delete
              </Button>
            </Popconfirm>
          ) : (
            <Button danger size="small" disabled>
              <DeleteOutlined />
              Delete
            </Button>
          )}

          {record.status === "waiting" ? (
            <Popconfirm
              title={
                <>
                  <div>Select Injection Time for {record.name}</div>
                  <DatePicker
                    showTime
                    size="small"
                    style={{
                      width: "100%",
                      marginRight: 10,
                      marginTop: 10,
                      marginBottom: 10,
                    }}
                    onSelect={(mesure_time) => {
                      updateRecordMeasureTime(record, mesure_time);
                    }}
                  />
                </>
              }
              onConfirm={() => {
                if (!record.realInjectionTime) {
                  message.warning("Please select Injection time first.");
                } else {
                  confirmInjection(record, patientsList, updateData);
                }
              }}
              okText="Inject"
              cancelText="Cancel"
            >
              <Button size="small"> 💉 Inject {record.name}</Button>
            </Popconfirm>
          ) : (
            <Button size="small" disabled>
              💉 Inject {record.name}
            </Button>
          )}
        </Space>
      ),
    },
    {
      title: "Status",
      width: 70,
      fixed: 'right',
      key: "status",
      dataIndex: "status",
      render: (status) => {
        switch (status) {
          case "done":
            return (
              <CheckCircleOutlined
                style={{ color: "green", fontSize: "23px" }}
              />
            );
          case "test":
            return <Spin />;
          case "waiting":
            return (
              <ClockCircleOutlined
                style={{ color: "orange", fontSize: "23px" }}
              />
            );
          default:
            return (
              <ExclamationCircleOutlined
                style={{ color: "red", fontSize: "23px" }}
              />
            );
        }
      },
    },
  ];
};

export default TableColums;

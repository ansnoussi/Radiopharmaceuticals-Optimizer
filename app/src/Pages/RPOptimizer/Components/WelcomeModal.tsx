import React, { useContext, useState } from 'react';
import { Typography, Modal, DatePicker, Divider, Button, Col, Row, Input, InputNumber, Tag, message } from 'antd';
import { BankOutlined } from '@ant-design/icons';
import moment from 'moment';
import { sendAmplitudeData, amplitudeLogsTypes } from '../../../utils/amplitude';

import ThemeSwitcher from './ThemeSwitcher';
import { RpSettingsContext, RpSettingsContextType } from '../../../context/RpSettingsContext';

const { Text } = Typography;

const WelcomeModal = ({ isModalVisible, closeModal }: { isModalVisible: any; closeModal: any }) => {
  const {
    rpSettings: {
      labName: initLabName,
      rpActivity: initRpActivity,
      rpVol: initRpVol,
      rpHalfLife: initRpHalfLife,
      mesureTime: initMesureTime,
      wastedVol: initWastedVol,
      unextractableVol: initUnextractableVol,
    },
    setRpSettings,
    setHasInitSettings
  } = useContext(RpSettingsContext) as RpSettingsContextType;

  const [rpActivity, setRpActivity] = useState(initRpActivity);
  const [mesureTime, setMesureTime] = useState(initMesureTime);
  const [rpHalfLife, setRpHalfLife] = useState(initRpHalfLife);
  const [rpVol, setRpVol] = useState(initRpVol);
  const [wastedVol, setWastedVol] = useState(initWastedVol);
  const [unextractableVol, setUnextractableVol] = useState(initUnextractableVol);
  const [labName, setLabName] = useState(initLabName);

  const finishEdit = () => {
    setRpSettings({
      rpActivity,
      mesureTime,
      rpHalfLife,
      rpVol,
      wastedVol,
      unextractableVol,
      labName,
    });
    closeModal();

    setHasInitSettings(true);
    message.success('Session initialized.');
    sendAmplitudeData(amplitudeLogsTypes.UPDATED_RP_SETTINGS);
  };

  return (
    <Modal
      title="Welcome"
      visible={isModalVisible}
      onCancel={closeModal}
      footer={[
        <Button key={1} type="primary" htmlType="submit" onClick={finishEdit} disabled={!mesureTime}>
          Confirm
        </Button>,
      ]}
    >
      <Text type="secondary">Enter your Lab name</Text>
      <Input
        placeholder="Lab name"
        prefix={<BankOutlined />}
        value={labName}
        onChange={(event: React.ChangeEvent<HTMLInputElement>)  => {
          setLabName(event.target.value);
        }}
      />
      <Row gutter={16} style={{ marginBottom: 10, marginTop: 15 }}>
        <Col className="gutter-row" span={10}>
          <Text type="secondary">RP Half Life (min)</Text>
        </Col>
        <Col className="gutter-row" span={14}>
          <InputNumber
            style={{ width: '100%' }}
            value={rpHalfLife}
            onChange={(rpHalfLife: number | null) => {
             if(rpHalfLife) setRpHalfLife(rpHalfLife);
            }}
          />
        </Col>
      </Row>

      <Row gutter={16} style={{ marginBottom: 10 }}>
        <Col className="gutter-row" span={10}>
          <Text type="secondary">RP Activity (MBq)</Text>
        </Col>
        <Col className="gutter-row" span={14}>
          <InputNumber
            style={{ width: '100%' }}
            value={rpActivity}
            onChange={(rpActivity: number | null) => {
              if(rpActivity) setRpActivity(rpActivity);
            }}
          />
        </Col>
      </Row>

      <Row gutter={16} style={{ marginBottom: 10 }}>
        <Col className="gutter-row" span={10}>
          <Text type="secondary">Measure Time</Text>
        </Col>
        <Col className="gutter-row" span={14}>
          <DatePicker
            showTime
            style={{ width: '100%' }}
            value={mesureTime ? moment(mesureTime) : null}
            onChange={(date: moment.Moment | null, dateString: string) => {
              setMesureTime(new Date(dateString));
            }}
          />
        </Col>
      </Row>

      <Row gutter={16} style={{ marginBottom: 10 }}>
        <Col className="gutter-row" span={10}>
          <Text type="secondary">RP Volume (ml)</Text>
        </Col>
        <Col className="gutter-row" span={14}>
          <InputNumber
            style={{ width: '100%' }}
            value={rpVol}
            onChange={(rpVol: number | null) => {
             if(rpVol) setRpVol(rpVol);
            }}
          />
        </Col>
      </Row>

      <Row gutter={16} style={{ marginBottom: 10 }}>
        <Col className="gutter-row" span={10}>
          <Text type="secondary">Wasted Volume (ml)</Text>
        </Col>
        <Col className="gutter-row" span={14}>
          <InputNumber
            style={{ width: '100%' }}
            value={wastedVol}
            onChange={(wastedVol: number | null) => {
              if(wastedVol) setWastedVol(wastedVol);
            }}
          />
        </Col>
      </Row>

      <Row gutter={16} style={{ marginBottom: 10 }}>
        <Col className="gutter-row" span={10}>
          <Text type="secondary">Unextractable Volume (ml)</Text>
        </Col>
        <Col className="gutter-row" span={14}>
          <InputNumber
            style={{ width: '100%' }}
            value={unextractableVol}
            onChange={(unextractableVol: number | null) => {
              if(unextractableVol) setUnextractableVol(unextractableVol);
            }}
          />
        </Col>
      </Row>

      <Divider orientation="left">Settings </Divider>

      <Row gutter={16} style={{ marginBottom: 10 }}>
        <Col className="gutter-row" span={20}>
          <Text type="secondary">
            Dark mode <Tag color="blue">New</Tag>{' '}
          </Text>
        </Col>
        <Col className="gutter-row" span={4}>
          <ThemeSwitcher />
        </Col>
      </Row>
    </Modal>
  );
};

export default WelcomeModal;

import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { sort, now, expect } from '../../utils/sortPatientList';
import { setAmplitudeUserId, sendAmplitudeData, amplitudeLogsTypes } from '../../utils/amplitude';
import { Button, message, Popconfirm } from 'antd';
import { AppHeader, PatientsTable, Expectations, WelcomeModal, NewPatientDrawer } from './Components';
import {
  UserAddOutlined,
  FileSearchOutlined,
  SettingOutlined,
  UsergroupDeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';

const RPOptimizer = () => {
  const [modifiedPatientId, setModifiedPatientId] = useState<string | undefined>(undefined);

  // app status
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [sideMenuKey, setSideMenuKey] = useState(1);

  // expectations values
  const [expected, setExpected] = useState({});
  const [now, setNow] = useState({});

  // FUNCTIONS TO IMPLEMENT
  const sortPatients = () => {};
  const deletAllPatients = () => {};
  const generateExpectations = () => {
    console.log('generating expectations');
  };
  const modifyPatient = (id: string) => {
    setModifiedPatientId(id);
    setIsDrawerVisible(true);
  };

  // // OLD FUNCTIONS

  // useEffect(() => {
  //   const statsInterval = setInterval(generateNowStats, 60000);

  //   // in case this is after refresh
  //   generateNowStats();
  //   generateExpectations();

  //   // init the amplitude user
  //   setAmplitudeUserId(uuidv4());

  //   return () => {
  //     clearInterval(statsInterval);
  //   };
  // }, []);

  // const deletAllPatients = () => {
  //   setPatientsList([]);
  //   setExpected({});
  //   setNow({});

  //   sendAmplitudeData(amplitudeLogsTypes.DELETE_ALL_PATIENTS);
  // };

  // const generateNowStats = () => {
  //   if (patientsList?.length > 0) {
  //     const nowDict = now(patientsList, getRpSetting());
  //     setNow({ ...nowDict });
  //   }
  // };

  // const generateExpectations = () => {
  //   if (patientsList?.length > 0) {
  //     const expected = expect(patientsList, getRpSetting());
  //     let newPatientsList = [...patientsList].map((x, i) => {
  //       return {
  //         ...x,
  //         expectedInjectionTime: new Date(
  //           expected.patientInjTimeList[i]
  //         ).toLocaleTimeString("en-GB", {
  //           hour: "2-digit",
  //           minute: "2-digit",
  //         }),
  //         expectedInjectionVolume: expected.patientInjVolList[i].toFixed(2),
  //       };
  //     });
  //     setPatientsList([...newPatientsList]);
  //     setExpected({ ...expected });
  //     generateNowStats();
  //   }
  // };

  // const sortPatients = () => {
  //   const newFormatedPatients = sort(patientsList, getRpSetting());

  //   setPatientsList([...newFormatedPatients]);
  //   message.success("Patient List sorted");
  //   generateExpectations();
  //   sendAmplitudeData(amplitudeLogsTypes.SORT_PATIENTS);
  // };

  // const deletePatient = (record) => {
  //   let newPatierntsData = patientsList.filter((p) => p.index !== record.index);

  //   setPatientsList([...newPatierntsData]);
  //   generateExpectations();
  //   sendAmplitudeData(amplitudeLogsTypes.DELETE_PATIENT);
  // };

  // const modifyPatient = (record) => {
  //   setModifiedPatientId(record.id);
  //   setIsDrawerVisible(true);

  //   newPatientForm.current.setFieldsValue({
  //     name: record.name,
  //     dose: record.dose,
  //     duration: record.duration,
  //   });
  // };

  // const onAddPatient = ({ name, dose, duration }) => {
  //   if (modifiedPatientId) {
  //     const newPatient = {
  //       id: modifiedPatientId,
  //       name: name,
  //       dose: dose,
  //       duration: duration,
  //       isInjected: false,
  //       realInjectionTime: null,
  //     };

  //     setPatientsList(
  //       patientsList.map((patient) =>
  //         patient.id === modifiedPatientId ? newPatient : patient
  //       )
  //     );
  //     setModifiedPatientId(null);
  //     setIsDrawerVisible(false);

  //     generateExpectations();
  //     sendAmplitudeData(amplitudeLogsTypes.MODIFY_PATIENT);
  //   } else {
  //     const newPatient = {
  //       id: uuidv4(),
  //       name,
  //       dose,
  //       duration,
  //       isInjected: false,
  //       realInjectionTime: null,
  //     };
  //     setPatientsList(patientsList.push(newPatient));
  //     setIsDrawerVisible(false);

  //     generateExpectations();
  //     sendAmplitudeData(amplitudeLogsTypes.NEW_PATIENT);
  //   }
  // };

  return (
    <>
      <AppHeader>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <Button key="1" onClick={sortPatients} style={{ margin: 5 }}>
            <FileSearchOutlined /> Sort
          </Button>

          <Button key="3" onClick={() => setIsModalVisible(true)} style={{ margin: 5 }}>
            <SettingOutlined /> Settings
          </Button>

          <Popconfirm
            key="4"
            title={'Delete All ?'}
            icon={<ExclamationCircleOutlined style={{ color: 'red' }} />}
            onConfirm={deletAllPatients}
            okText="Delete All Patients"
            okButtonProps={{
              danger: true,
            }}
            cancelText="Cancel"
          >
            <Button type="primary" danger style={{ margin: 5 }}>
              <UsergroupDeleteOutlined /> Delete All
            </Button>
          </Popconfirm>

          <Button
            key="2"
            type="primary"
            onClick={() => {
              setIsDrawerVisible(true);
            }}
            style={{ margin: 5 }}
          >
            <UserAddOutlined /> New Patient
          </Button>
        </div>
      </AppHeader>

      <PatientsTable generateExpectations={generateExpectations} modifyPatient={modifyPatient} />

      <Expectations {...expected} />
      <NewPatientDrawer
        isDrawerVisible={isDrawerVisible}
        closeDrawer={() => {
          setIsDrawerVisible(false);
          setModifiedPatientId(undefined);
        }}
        modifiedPatientId={modifiedPatientId}
      />
      <WelcomeModal
        isModalVisible={isModalVisible}
        closeModal={() => {
          setIsModalVisible(false);
        }}
      />
    </>
  );
};

export default RPOptimizer;
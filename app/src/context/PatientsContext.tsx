import React, { useState, FunctionComponent, ReactNode } from 'react';

export interface PatientType {
  id: string;
  name: string;
  dose: number;
  duration: number;
  isInjected: boolean;
  realInjectionTime?: Date;
  realInjectionVolume?: number;
  expectedInjectionTime?: Date;
  expectedInjectionVolume?: number;
}

export interface PatientsContextType {
  patientsList: PatientType[];
  addPatient: (newPatient: PatientType) => void;
  deletePatient: (id: string) => void;
  updatePatient: (newPatient: Partial<PatientType>) => void;
  updatePatientsList: (newPatientsList: PatientType[]) => void;
}

const PatientsContext = React.createContext<PatientsContextType | null>(null);

interface PatientsContextProviderProps {
  children?: ReactNode;
}

const PatientsContextProvider: FunctionComponent<PatientsContextProviderProps> = ({ children }) => {
  //patients list
  const [patientsList, setPatientsList] = useState<PatientType[]>([]);

  const addPatient = (newPatient: PatientType) => {
    setPatientsList(prevPatients => [...prevPatients, newPatient]);
  };

  const deletePatient = (id: string) => {
    setPatientsList(prevPatients => prevPatients.filter(item => item.id !== id));
  };

  const updatePatient = (patient: Partial<PatientType>) => {
    let newPatientList = [...patientsList];
    let patientIndex = newPatientList.findIndex(p => p.id === patient.id);
    newPatientList[patientIndex] = { ...newPatientList[patientIndex], ...patient };
    setPatientsList(newPatientList);
  };

  const updatePatientsList = (newPatientsList: PatientType[]) => {
    setPatientsList(newPatientsList);
  };

  return (
    <PatientsContext.Provider
      value={{
        patientsList,
        addPatient,
        deletePatient,
        updatePatient,
        updatePatientsList,
      }}
    >
      {children}
    </PatientsContext.Provider>
  );
};

export { PatientsContextProvider, PatientsContext };

import React, { ReactNode, FunctionComponent, useState } from 'react';

export interface RpSettingsType {
  rpActivity: number;
  mesureTime: Date;
  rpHalfLife: number;
  rpVol: number;
  wastedVol: number;
  unextractableVol: number;
  labName: string;
}

export interface RpSettingsContextType {
  rpSettings: RpSettingsType;
  setRpSettings: (settings: RpSettingsType) => void;
  hasInitSettings: boolean;
  setHasInitSettings: (value: boolean) => void;
}

const RpSettingsContext = React.createContext<RpSettingsContextType | null>(null);

interface RpSettingsContextProviderProps {
  children?: ReactNode;
}

const RpSettingsContextProvider: FunctionComponent<RpSettingsContextProviderProps> = ({ children }) => {
  // rpSettings
  const [rpActivity, setRpActivity] = useState<number>(0);
  const [mesureTime, setMesureTime] = useState<Date>(new Date());
  const [rpHalfLife, setRpHalfLife] = useState<number>(0);
  const [rpVol, setRpVol] = useState<number>(0);
  const [wastedVol, setWastedVol] = useState<number>(0);
  const [unextractableVol, setUnextractableVol] = useState<number>(0);
  const [labName, setLabName] = useState<string>('Rp Optimizer');

  // to only show welcome modal at first
  const [hasInitSettings, setHasInitSettings] = useState<boolean>(false);


  const setRpSettings = ({
    rpActivity,
    mesureTime,
    rpHalfLife,
    rpVol,
    wastedVol,
    unextractableVol,
    labName,
  }: RpSettingsType) => {

    if (rpActivity) {
      setRpActivity(rpActivity);
    }
    if (mesureTime) {
      setMesureTime(mesureTime);
    }
    if (rpHalfLife) {
      setRpHalfLife(rpHalfLife);
    }
    if (rpVol) {
      setRpVol(rpVol);
    }
    if (wastedVol) {
      setWastedVol(wastedVol);
    }
    if (unextractableVol) {
      setUnextractableVol(unextractableVol);
    }
    if (labName) {
      setLabName(labName);
    }
  };

  return (
    <RpSettingsContext.Provider
      value={{
        rpSettings: {
          rpActivity,
          mesureTime,
          rpHalfLife,
          rpVol,
          wastedVol,
          unextractableVol,
          labName,
        },
        setRpSettings,
        hasInitSettings,
        setHasInitSettings
      }}
    >
      {children}
    </RpSettingsContext.Provider>
  );
};

export { RpSettingsContextProvider, RpSettingsContext };

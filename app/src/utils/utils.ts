import { message } from "antd";
import { clean } from "./sortPatientList";
import { sendAmplitudeData, amplitudeLogsTypes } from "./amplitude";

export function confirmInjection(record, patientsList, updateData) {
  if (record.realInjectionTime === null) {
    message.warning("Operation aborted");
  } else {
    // we change the status to injected
    patientsList.forEach(function (part, index, theArray) {
      if (theArray[index].index === record.index) {
        theArray[index].isInjected = true;
      }
    });

    const newFormatedPatients = clean(patientsList);
    updateData([...newFormatedPatients]);
    sendAmplitudeData(amplitudeLogsTypes.INJECT_PATIENT);
    message.success("Patient injected");
  }
}
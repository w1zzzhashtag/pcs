import { dataType } from "./catalogProductTypes"


export const validateForm = (values: dataType) => {
  if(
    values?.name.trim() !== '' && 
    values?.okeiName.trim() !== '' && 
    values?.price !== 0 && 
    values?.okpdCode.trim() !== ''
  ) return true
}
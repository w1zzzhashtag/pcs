import React from 'react'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { DevTool } from "@hookform/devtools";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { setNextStep, setValues } from '../../../featurers/registartion/registrationSlice';
import { stepTwoType } from '../../../featurers/registartion/registrationTypes'

import { Button, OptionsForSelectRegion } from '../../../components';
import { Input, Select } from './index'
import styles from './../RegistrationPG.module.scss'


const schema = yup.object().shape({
  adress: yup.string().required(),
  regionCode: yup.string().required(),
});


const StepTwo: React.FC = () => {
  const dispatch = useDispatch()
  const { register, handleSubmit, errors, control } = useForm<stepTwoType>({
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: stepTwoType) => {
    dispatch(setValues({ ...data, regionCode: +data.regionCode }))
    dispatch(setNextStep(3))
  }

  return (
    <div className={styles.form_wrapper}>
      <p className={styles.form__title}>
        Контактная информация
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.form}
      >
        <Input
          label="Адрес местонахождения"
          name="adress"
          register={register}
          error={errors.adress} />
        <Select
          label="Регион"
          name="regionCode"
          register={register}
        >
          <OptionsForSelectRegion />
        </Select>

        <div className={styles.footer}>
          <div className={styles.footer__button}>
            <div className={styles.footer__button__inner}>
              <Button
                type='submit'
                className='orange'
                uppercase
              >Продолжить</Button>
            </div>
          </div>
        </div>
      </form>
      <DevTool control={control} /> {/* set up the dev tool */}
    </div>
  )
}

export default StepTwo

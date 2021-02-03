import React from 'react'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { DevTool } from "@hookform/devtools";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { setValues, setNextStep } from '../../../featurers/registartion/registrationSlice';
import { stepFirstType } from './../../../featurers/registartion/registrationTypes'

import { Input, Checkbox } from './index'
import { Button } from '../../../components';
import styles from './../RegistrationPG.module.scss'


const schema = yup.object().shape({
  fullName: yup.string().required(),
  shortName: yup.string().required(),
  ogrn: yup.string().required(),
  inn: yup.string().required(),
  kpp: yup.string().required(),
  isSmp: yup.boolean(),
  isFsin: yup.boolean()
});



const StepFirst: React.FC = () => {
  const dispatch = useDispatch()

  const { register, handleSubmit, errors, control } = useForm<stepFirstType>({
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: stepFirstType) => {
    dispatch(setValues(data))
    dispatch(setNextStep(2))
  }

  return (
    <div className={styles.form_wrapper}>
      <p className={styles.form__title}>
        Основные сведения об организации
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.form}
      >
        <Input
          label="Наименование"
          name="fullName"
          register={register}
          error={errors.fullName} />
        <Input
          label="Краткое наименование"
          name="shortName"
          register={register}
          error={errors.shortName} />
        <Input
          label="ОГРН"
          name="ogrn"
          register={register}
          error={errors.ogrn} />
        <Input
          label="ИНН"
          name="inn"
          register={register}
          error={errors.inn} />
        <Input
          label="КПП"
          name="kpp"
          register={register}
          error={errors.kpp} />
        <div className={styles.form__innerWrapper}>
          <Checkbox
            label="СМП"
            name="isSmp"
            register={register} />
          <Checkbox
            label="ФСИН"
            name="isFsin"
            register={register} />
        </div>

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
      {/* <DevTool control={control} /> set up the dev tool */}
    </div>
  )
}

export default StepFirst

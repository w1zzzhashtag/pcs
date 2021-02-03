import React from 'react'
import { useForm } from 'react-hook-form'
import { DevTool } from "@hookform/devtools";
import { Redirect } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import * as yup from "yup";

import { Button } from '../../../components';
import { Input, Checkbox } from './index'

import { sendRegistrationValues, setValues } from '../../../featurers/registartion/registrationSlice';
import { stepThreeType } from '../../../featurers/registartion/registrationTypes';

import styles from './../RegistrationPG.module.scss'
import { setError, setTimeoutToCloseAlert } from '../../../featurers/alert/alertSlice';

const schema = yup.object().shape({
  fio: yup.string().required(),
  isContact: yup.boolean(),
  position: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().required(),
  login: yup.string().required(),
  password: yup.string().required(),
  isAgree: yup.bool().oneOf([true], 'Field must be checked')
});


const StepThree: React.FC = () => {
  const dispatch = useDispatch()

  const [isAgree, setIsAgree] = React.useState(false)
  const [isRedirect, setIsRedirect] = React.useState(false)

  const { register, handleSubmit, errors, control } = useForm<stepThreeType>({
    resolver: yupResolver(schema)
  })

  const handleChangeAgree = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAgree(!isAgree)
  }

  const onSubmit = (data: stepThreeType) => {
    if (isAgree) {
      dispatch(setValues({ ...data, registrationDate: new Date() }))
      dispatch(sendRegistrationValues())
      setIsRedirect(true)
    } else {
      dispatch(setError('Вы не согласились на обработку персональных данных'))
      dispatch(setTimeoutToCloseAlert('error'))
    }
  }

  if (isRedirect) return <Redirect to="/authentication" />

  return (
    <div className={styles.form_wrapper}>

      <p className={styles.form__title}>
        Пользователи организации
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.form}
      >
        <Input
          label="Ф.И.О"
          name="fio"
          register={register}
          error={errors.fio} />
        <Input
          label="Должность"
          name="position"
          register={register}
          error={errors.position} />
        <Input
          label="E-mail"
          name="email"
          register={register}
          error={errors.email} />
        <Input
          label="Телефон"
          name="phone"
          register={register}
          error={errors.phone} />
        <Input
          label="Логин"
          name="login"
          register={register}
          error={errors.login} />
        <Input
          label="Пароль"
          name="password"
          register={register}
          type="password"
          error={errors.password} />
        <Checkbox
          label="Контактное лицо"
          name="isContact"
          register={register} />

        <div className={styles.footer}>
          <div className={styles.checkbox_wrapper}>
            <input
              type="checkbox"
              id="agree"
              checked={isAgree}
              onChange={handleChangeAgree}
              className={styles.checkbox} />
            <label htmlFor="agree">Согласен на обработку персональных данных в соответствии с 152 ФЗ</label>
          </div>

          <div className={styles.footer__container}>
            <div className={styles.footer__download}>
              <a download
                className={styles.footer__download__item}
                href={process.env.PUBLIC_URL + "/docs/Политика конфиденциальности.rtf"}
              >Политика конфиденциальности</a>
              <a download
                className={styles.footer__download__item}
                href={process.env.PUBLIC_URL + "/docs/Пользовательское соглашение.rtf"}
              >Пользовательское соглашение</a>
            </div>

            <div className={styles.footer__button__inner}>
              <Button
                type='submit'
                className='green'
                uppercase
              >Зарегистрироваться</Button>
            </div>
          </div>
        </div>

      </form>
      <DevTool control={control} /> {/* set up the dev tool */}
    </div>
  )
}

export default StepThree

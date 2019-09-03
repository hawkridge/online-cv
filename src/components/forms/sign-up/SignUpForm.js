import React from 'react'
import PropTypes from 'prop-types'
import{ Formik, Form, Field, ErrorMessage } from 'formik'
import { useTranslation } from 'react-i18next'

function SignUpForm(props) {
	
	const initialValues = {
		email: '',
		password: '',
		confirmPassword: '',
		firstName: '',
		middleName: '',
		lastName: ''
	};

	const { signUp } = props;
	const { t } = useTranslation(['ns1']);
	
	const validate = (values) => {
		const errors = {};
		
		if (!values.email) {
			errors.email = t('validation.required');
		} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
			errors.email = t('validation.invalidEmail');
		}

		if (!values.password) {
			errors.password = t('validation.required');
		} else if (values.password.length < 6) {
			errors.password = t('validation.weakPassword');
		}

		if (!values.confirmPassword) {
			errors.confirmPassword = t('validation.required');
		} else if (values.password && values.confirmPassword && (values.password !== values.confirmPassword)) {
			errors.confirmPassword = t('validation.notEqualPasswords');
		}
		
		
		return errors;
	};
	
	const handleSubmit = (values, { setSubmitting, resetForm } ) => {
		setSubmitting(false);
		// resetForm(initialValues);
		
		signUp(values)
	};

	return (
		<Formik initialValues={ initialValues }
		        validate={ validate }
		        onSubmit={ handleSubmit }>
			{({ isSubmitting }) => (
				<Form style={{display: 'flex', flexDirection: 'column'}}>
					<label> { t('registration.email') }
						<Field type='text' name='email' />
					</label>
					<ErrorMessage name='email' render={msg => <span style={{color: 'red'}}>{msg}</span>}/>
					
					<label> { t('registration.password') }
						<Field type='password' name='password' maxLength={20} />
					</label>
					<ErrorMessage name='password' render={msg => <span style={{color: 'red'}}>{msg}</span>}/>
					
					<label> { t('registration.confirm') }
						<Field type='password' name='confirmPassword' maxLength={20} />
					</label>
					<ErrorMessage name='confirmPassword' render={msg => <span style={{color: 'red'}}>{msg}</span>}/>
					
					<label> { t('registration.firstName') }
						<Field type='text' name='firstName' />
					</label>
					<label> { t('registration.lastName') }
						<Field type='text' name='lastName' />
					</label>
					<label> { t('registration.middleName') }
						<Field type='text' name='middleName' />
					</label>
					
					<button  style={{width: '200px'}} type='submit' disabled={ isSubmitting }>
						{ isSubmitting ? 'Preloader' : t('buttons.signup') }
					</button>
				</Form>
			)}
		</Formik>
	);
}

SignUpForm.propTypes = {
	signUp: PropTypes.func.isRequired
};

export default SignUpForm;

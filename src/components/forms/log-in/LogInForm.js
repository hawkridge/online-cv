import React from 'react'
import PropTypes from 'prop-types'
import{ Formik, Form, Field, ErrorMessage } from 'formik'
import { useTranslation } from 'react-i18next'

function LogInForm(props) {
	
	const initialValues = {
		email: '',
		password: ''
	}

	const { logIn } = props;
	const { t } = useTranslation(['ns1']);
	
	const validate = (values) => {
		const errors = {};
		
		if (!values.email) {
			errors.email = t('validation.required');
		}
		
		if (!values.password) {
			errors.password = t('validation.required');
		}
		return errors;
	};
	
	const handleSubmit = (values, { setSubmitting, resetForm } ) => {
		setSubmitting(false);
		resetForm(initialValues);
		
		logIn(values)
	};
	
	return (
		<Formik initialValues={ initialValues }
				validate={ validate }
				onSubmit={ handleSubmit }>
		
			{({ isSubmitting }) => (
				<Form>
					<Field type='text' name='email' placeholer='email'/>
					<ErrorMessage name='email' render={msg => <span style={{color: 'red'}}>{msg}</span>}/>
					
					<Field type='password' name='password' placeholer='password'/>
					<ErrorMessage name='password' render={msg => <span style={{color: 'red'}}>{msg}</span>}/>
					
					<button  style={{width: '200px'}} type='submit' disabled={ isSubmitting }>
						{ isSubmitting ? 'Preloader' : t('buttons.login') }
					</button>
				</Form>
			)}
		</Formik>
	);
}

LogInForm.propTypes = {
	logIn: PropTypes.func.isRequired
};

export default LogInForm;

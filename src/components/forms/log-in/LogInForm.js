import React from 'react'
import PropTypes from 'prop-types'
import{ Formik, Form, Field, ErrorMessage } from 'formik'

function LogInForm(props) {
	
	const initialValues = {
		email: '',
		password: ''
	}
	
	const validate = (values) => {
		const errors = {};
		
		if (!values.email) {
			errors.email = 'Required';
		}
		
		if (!values.password) {
			errors.password = 'Required';
		}
		return errors;
	};
	
	const handleSubmit = (values, { setSubmitting, resetForm } ) => {
		const { logIn } = props;
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
						{ isSubmitting ? 'Loading' : 'Log In!'}
					</button>
					
					{ props.error.logIn ?  getErrorNotification(props.error.logIn) : null }
				</Form>
			)}
		</Formik>
	);
}

function getErrorNotification(err) {
	return (
		<div className='Error'>
			Something went wrong - <span>{ err }</span>
		</div>
	)
}

LogInForm.propTypes = {
	error: PropTypes.object,
	logIn: PropTypes.func.isRequired
};

export default LogInForm;

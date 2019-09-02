import React from 'react'
import PropTypes from 'prop-types'
import{ Formik, Form, Field, ErrorMessage } from 'formik'

function SignUpForm(props) {
	
	const initialValues = {
		email: '',
		password: '',
		confirmPassword: '',
		firstName: '',
		middleName: '',
		lastName: ''
	}
	
	const validate = (values) => {
		const errors = {};
		
		if (!values.email) {
			errors.email = 'Required';
		} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
			errors.email = 'Invalid email address';
		}

		if (!values.password) {
			errors.password = 'Required';
		} else if (values.password.length < 6) {
			errors.password = 'Too weak password';
		}

		if (!values.confirmPassword) {
			errors.confirmPassword = 'Required';
		} else if (values.password && values.confirmPassword && (values.password !== values.confirmPassword)) {
			errors.confirmPassword = 'Passwords are not equal';
		}
		
		
		return errors;
	};
	
	const handleSubmit = (values, { setSubmitting, resetForm } ) => {
		const { signUp } = props;
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
					<label>email
						<Field type='text' name='email' />
					</label>
					<ErrorMessage name='email' render={msg => <span style={{color: 'red'}}>{msg}</span>}/>
					
					<label>password
						<Field type='password' name='password' maxLength={20} />
					</label>
					<ErrorMessage name='password' render={msg => <span style={{color: 'red'}}>{msg}</span>}/>
					
					<label>confirmPassword
						<Field type='password' name='confirmPassword' maxLength={20} />
					</label>
					<ErrorMessage name='confirmPassword' render={msg => <span style={{color: 'red'}}>{msg}</span>}/>
					
					<label>firstName
						<Field type='text' name='firstName' />
					</label>
					<label>middleName
						<Field type='text' name='middleName' />
					</label>
					<label>lastName
						<Field type='text' name='lastName' />
					</label>
					
					<button  style={{width: '200px'}} type='submit' disabled={ isSubmitting }>
						{ isSubmitting ? 'Preloader' : 'Sign Up!'}
					</button>
					{ props.error.signUp ?  getErrorNotification(props.error.signUp) : null }
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


SignUpForm.propTypes = {
	error: PropTypes.object,
	signUp: PropTypes.func.isRequired
};

export default SignUpForm;

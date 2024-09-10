exports.responseData = ({ res, statusCode, success, message, data, error, pagination }) => {
	const resultObj = {
		success,
		message,
		result: data,
		pagination: pagination,
		error: error
	};
	return res.status(statusCode).send(resultObj);
};


exports.responseMessage = (response, type = '', module = 'Data') => {
	let return_message
	switch (response) {
		case "error":
			return_message = `Error in ${type} data`
			break;
		case 'register_Mail':
			return_message = 'User Registered successfully ';
			break;
		case "success":
			return_message = `${module} ${type} successfully`
			break;
		case "wrong":
			return_message = `Something went wrong.`
			break;
		case "not_found":
			return_message = `No such ${type} exist`
			break;
		case "empty_body":
			return_message = `Please enter some data`
			break;
		case "name_used":
			return_message = `This ${type} is already in use.`
			break;
		case "user_not_matched":
			return_message = "Invalid username"
			break;
		case "empty_login_body":
			return_message = "Please enter Username or Password!"
			break;
		case "password_invalid":
			return_message = "Invalid password"
			break;
		case "user_logged":
			return_message = "User logged successfully!"
			break;
		case "reset_password":
			return_message = "Error in reset password"
			break;
		case "email_send":
			return_message = "Email sent successfully"
			break;
		case "email_send_error":
			return_message = "Error while sending email"
			break;
		case "password_update":
			return_message = "Password updated successfully"
			break;
		case "data_update_email_fail":
			return_message = "Data uploaded successfully but error in sending email"
			break;
		case "missing_id":
			return_message = `Please provide ${type} id`
			break;
		case "session_expired":
			return_message = "Your session has expired"
			break;
		case "no_access":
			return_message = "Access denied"
			break;
		case "already_requested":
			return_message = "You already requested!"
			break;
		case "already_exists":
			return_message = ` ${type} already exists!`
			break;
		default:
			return_message = "No message"
			break;

	}
	return return_message
}
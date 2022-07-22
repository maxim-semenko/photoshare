import * as EmailValidator from 'email-validator';

class RestorePasswordValidator {

    // Email errors
    validateEmail(email) {
        let error = "";
        if (!email || email === '') {
            error = 'email cannot be empty!';
        } else if (email.length < 7) {
            error = 'email is too short!';
        } else if (email.length > 50) {
            error = 'email is too long!';
        } else if (!EmailValidator.validate(email)) {
            error = "email has invalid pattern!";
        }
        return error
    }

    // emailCode errors
    validateEmailCode(emailCode) {
        let error = "";
        if (!emailCode || emailCode === '') {
            error = 'emailCode cannot be empty!';
        } else if (emailCode.length !== 6) {
            error = 'emailCode has invalid length!';
        }

        return error
    }

    // Password errors
    validatePassword(password) {
        let error = "";
        if (!password || password === '') {
            error = 'password cannot be empty!';
        } else if (password.length < 8) {
            error = 'password is too short!';
        } else if (password.length > 255) {
            error = 'password is too long!';
        }
        return error
    }

    validateAll(email, emailCode, password) {
        let emailError = this.validateEmail(email)
        let emailCodeError = this.validateEmailCode(emailCode)
        let passwordError = this.validatePassword(password)

        return {
            emailError,
            emailCodeError,
            passwordError,
        }
    }

}

export default new RestorePasswordValidator()
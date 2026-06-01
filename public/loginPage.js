"use strict";

const userForm = new UserForm();

userForm.loginFormCallback = function (data) {
    ApiConnector.login(data, function callback(result) {
        if (result.success) {
            location.reload();
        } else userForm.setLoginErrorMessage(result.error);
    });
};

userForm.registerFormCallback = function (data) {
    ApiConnector.register(data, function callback(result) {
        if (result.success) {
            location.reload();
        } else userForm.setRegisterErrorMessage(result.error);
    });
};
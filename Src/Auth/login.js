"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Login {
    constructor() {
        this.loginForm = document.getElementById('loginForm');
        this.closeButton = document.querySelector('.close-btn');
        if (this.loginForm) {
            this.loginForm.addEventListener('submit', this.handleSubmit.bind(this));
        }
        if (this.closeButton) {
            this.closeButton.addEventListener('click', this.handleClose.bind(this));
        }
    }
    handleSubmit(event) {
        return __awaiter(this, void 0, void 0, function* () {
            event.preventDefault();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();
            console.log('Login form submitted');
            console.log('Email:', email);
            console.log('Password:', password);
            if (email === '') {
                alert('Email is required.');
                return;
            }
            if (password === '') {
                alert('Password is required.');
                return;
            }
            try {
                const response = yield fetch('http://localhost:3000/users');
                const users = yield response.json();
                const user = users.find((user) => user.email === email && user.password === password);
                if (user) {
                    console.log('User authenticated:', user);
                    // Store the logged-in user details in localStorage
                    localStorage.setItem('loggedInUser', JSON.stringify(user));
                    window.location.href = '/public/index.html';
                }
                else {
                    alert('Invalid email or password.');
                }
            }
            catch (error) {
                console.error('Error logging in:', error);
                alert('An error occurred while logging in. Please try again later.');
            }
        });
    }
    handleClose() {
        console.log('X button clicked');
        window.location.href = '/public/index.html';
    }
}
new Login();

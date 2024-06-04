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
class Registration {
    constructor() {
        this.registerForm = document.getElementById('registerForm');
        this.closeButton = document.querySelector('.close-btn');
        if (this.registerForm) {
            this.registerForm.addEventListener('submit', this.handleSubmit.bind(this));
        }
        if (this.registerForm) {
            this.closeButton.addEventListener('click', this.handleClose.bind(this));
        }
    }
    handleSubmit(event) {
        return __awaiter(this, void 0, void 0, function* () {
            event.preventDefault();
            const username = document.getElementById('registerUsername').value.trim();
            const email = document.getElementById('registerEmail').value.trim();
            const password = document.getElementById('registerPassword').value.trim();
            console.log('Register form submted');
            ;
            console.log('Username:', username);
            console.log('Email:', email);
            console.log('Password:', password);
            if (username.length < 5) {
                alert('Username must be atleast 5 characters long.');
                return;
            }
            if (email === '') {
                alert('Email is required.');
                return;
            }
            if (password === '') {
                alert('Password is required.');
                return;
            }
            if (password.length < 8) {
                alert('Password must be at least 8 characters long.');
                return;
            }
            try {
                const response = yield fetch('http://localhost:3000/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, email, password })
                });
                if (!response.ok) {
                    throw new Error('HTTP error status: &{response.status}');
                }
                const result = yield response.json();
                console.log(result);
                window.location.href = '/public/login.html';
            }
            catch (error) {
                console.error('Error registering user:', error);
                alert('An error occured while registering. Please try again later.');
            }
        });
    }
    handleClose() {
        console.log('X button clicked');
        window.location.href = '/public/index.html';
    }
}
const registration = new Registration();

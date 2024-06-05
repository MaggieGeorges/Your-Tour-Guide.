class Login {
    private loginForm: HTMLFormElement;
    private closeButton: HTMLElement;

    constructor() {
        this.loginForm = document.getElementById('loginForm') as HTMLFormElement;
        this.closeButton = document.querySelector('.close-btn') as HTMLElement;

        if (this.loginForm) {
            this.loginForm.addEventListener('submit', this.handleSubmit.bind(this));
        }
        if (this.closeButton) {
            this.closeButton.addEventListener('click', this.handleClose.bind(this));
        }
    }

    private async handleSubmit(event: Event): Promise<void> {
        event.preventDefault();

        const email = (document.getElementById('email') as HTMLInputElement).value.trim();
        const password = (document.getElementById('password') as HTMLInputElement).value.trim();

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
            const response = await fetch('http://localhost:3000/users');
            const users = await response.json();

            const user = users.find((user: any) => user.email === email && user.password === password);

            if (user) {
                console.log('User authenticated:', user);

                // Store the logged-in user details in localStorage
                localStorage.setItem('loggedInUser', JSON.stringify(user));
                window.location.href = '/public/index.html';
            } else {
                alert('Invalid email or password.');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert('An error occurred while logging in. Please try again later.');
        }
    }

    private handleClose(): void {
        console.log('X button clicked');
        window.location.href = '/public/index.html';
    }
}

new Login();

class login {
    private loginform: HTMLFormElement;
    private closeButton: HTMLElement;

    constructor() {
        this.loginform = document.getElementById('loginForm') as HTMLFormElement;
        this.closeButton = document.querySelector('.close-btn') as HTMLElement;

        
        if (this.loginform){
            this.loginform.addEventListener('submit', this.handleSubmit.bind(this));
        }
        if (this.closeButton){
            this.closeButton.addEventListener('click', this.handleClose.bind(this));
        }

    }


    private async handleSubmit(event: Event): Promise<void> {
        event.preventDefault();

        const email= (document.getElementById('email') as HTMLInputElement).value.trim();
        const password = (document.getElementById('password') as HTMLInputElement).value.trim();

        console.log('Login form submitted');
        console.log('Email:', email);
        console.log('Password:', password);
        
        if (email === ''){
            alert('Email is required.');
            return;
        }
        
        if (password === ''){
            alert('Username is required.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/users');
            const users = await response.json();

            const user = users.find((user: any) => user.email === email && user.password === password);

            if (user){
                const user = users[0];
                console.log('User authenticated:', user);

                localStorage.setItem('userDetails', JSON.stringify(user));
                window.location.href = '/public/index.html';
                
            }else {
                alert('Invalid username or password.');
            }
    } catch (error) {
        console.error('Error Logging in:', error);
        alert('An error has occured while logging in. Please try again later.');
    }
    }

    private handleClose(): void{
        console.log('X button clicked');
        window.location.href = '/public/index.html';
        
    }
}

new login();
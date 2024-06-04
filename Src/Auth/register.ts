class Registration {
    private registerForm: HTMLFormElement;
    private closeButton: HTMLElement;

    constructor() {
        this.registerForm = document.getElementById('registerForm') as HTMLFormElement;
        this.closeButton = document.querySelector('.close-btn') as HTMLElement;

        if (this.registerForm) {
            this.registerForm.addEventListener('submit', this.handleSubmit.bind(this));
        }

        if (this.registerForm) {
            this.closeButton.addEventListener('click', this.handleClose.bind(this));
        }
    }
    private async handleSubmit(event: Event): Promise<void>{
        event.preventDefault();

        const username = (document.getElementById('registerUsername') as HTMLInputElement).value.trim();
        const email = (document.getElementById('registerEmail') as HTMLInputElement).value.trim();
        const password = (document.getElementById('registerPassword') as HTMLInputElement).value.trim();

        console.log('Register form submted');;
        console.log('Username:', username);
        console.log('Email:', email);
        console.log('Password:', password);
        
        if (username.length < 5){
            alert('Username must be atleast 5 characters long.');
            return;
        } 
        if (email === '') {
            alert('Email is required.');
            return;       
        }       

        if (password === ''){
            alert('Password is required.');
            return;
        }
        
        if (password.length < 8){
            alert('Password must be at least 8 characters long.');
            return;
        }

        try {
            const response = await fetch ('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username, email, password})
            });

            if (!response.ok){
                throw new Error('HTTP error status: &{response.status}');
            }

            const result = await response.json();
            console.log(result);
            window.location.href = '/public/login.html';
        } catch (error){
            console.error('Error registering user:', error);
            alert('An error occured while registering. Please try again later.');
        }
    }

    private handleClose(): void {
        console.log('X button clicked');
        window.location.href = '/public/index.html';
        
    }
}
            
const registration = new Registration();
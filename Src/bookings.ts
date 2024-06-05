class Booking {
    id: string;
    user: string;
    tour: string;
    hotel: string;
    bookingDate: string;
    totalPrice: number;
    numberOfPeople: number;

    constructor(id: string, user: string, tour: string, hotel: string, bookingDate: string, totalPrice: number, numberOfPeople: number) {
        this.id = id;
        this.user = user;
        this.tour = tour;
        this.hotel = hotel;
        this.bookingDate = bookingDate;
        this.totalPrice = totalPrice;
        this.numberOfPeople = numberOfPeople;
    }
}

class BookingService {
    async addBooking(booking: Booking): Promise<void> {
        const response = await fetch('http://localhost:3004/bookings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(booking)
        });

        if (!response.ok) {
            throw new Error('Failed to add booking');
        }
    }

    async fetchUsers(): Promise<any[]> {
        const response = await fetch('http://localhost:3000/users');
        return await response.json();
    }

    async fetchTours(): Promise<any[]> {
        const response = await fetch('http://localhost:3001/tours');
        return await response.json();
    }

    async fetchHotels(): Promise<any[]> {
        const response = await fetch('http://localhost:3002/hotels');
        return await response.json();
    }
}

class BookingForm {
    constructor() {
        document.addEventListener('DOMContentLoaded', () => {
            this.init();
        });
    }

    private async init(): Promise<void> {
        //const bookingForm = document.getElementById('booking-form') as HTMLFormElement;
        const bookingForm = document.getElementById('booking-form') as HTMLFormElement;
        const bookingService = new BookingService();
    
        const urlParams = new URLSearchParams(window.location.search);
        const tourId = urlParams.get('tourId');
    
        // Load the HTML elements before trying to access their properties
        await new Promise<void>(resolve => {
            if (!bookingForm) {
                console.error('Booking form element not found.');
                return;
            }
            resolve();
        });
    
        const tourInput = document.getElementById('tour') as HTMLInputElement;
        const hotelInput = document.getElementById('hotel') as HTMLInputElement;
        const bookingDateInput = document.getElementById('booking-date') as HTMLInputElement;
        const numberOfPeopleInput = document.getElementById('number-of-people') as HTMLInputElement;
    
        if (!tourInput || !hotelInput || !bookingDateInput || !numberOfPeopleInput) {
            console.error('One or more form elements not found.');
            return;
        }
    
        if (tourId) {
            tourInput.value = tourId;
        }
    
    
        const user = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
        if (!user) {
            alert('Please log in to make a booking.');
            window.location.href = 'login.html';
            return;
        }
    
        bookingForm.addEventListener('submit', async (event) => {
            event.preventDefault();
    
            const tour = (document.getElementById('tour') as HTMLInputElement).value;
            const hotel = (document.getElementById('hotel') as HTMLInputElement).value;
            const bookingDate = (document.getElementById('booking-date') as HTMLInputElement).value;
            const numberOfPeople = parseInt((document.getElementById('number-of-people') as HTMLInputElement).value, 10);
            const totalPrice = this.calculateTotalPrice(tour, numberOfPeople); // Implement this function based on your logic
            const id = 'booking-' + new Date().getTime();
    
            const newBooking = new Booking(id, user.id, tour, hotel, bookingDate, totalPrice, numberOfPeople);
    
            try {
                await bookingService.addBooking(newBooking);
                alert('Booking successful!');
                bookingForm.reset();
            } catch (error) {
                alert('Failed to add booking');
                console.error(error);
            }
        });
    
        // Populate form with users, tours, and hotels
        await this.populateSelectFields(bookingService);
    }
    

    private async populateSelectFields(bookingService: BookingService): Promise<void> {
        const userSelect = document.getElementById('user') as HTMLSelectElement;
        const tourSelect = document.getElementById('tour') as HTMLSelectElement;
        const hotelSelect = document.getElementById('hotel') as HTMLSelectElement;

        const users = await bookingService.fetchUsers();
        users.forEach(user => {
            const option = document.createElement('option');
            option.value = user.id;
            option.textContent = user.name;
            userSelect.appendChild(option);
        });

        const tours = await bookingService.fetchTours();
        tours.forEach(tour => {
            const option = document.createElement('option');
            option.value = tour.id;
            option.textContent = tour.name;
            tourSelect.appendChild(option);
        });

        const hotels = await bookingService.fetchHotels();
        hotels.forEach(hotel => {
            const option = document.createElement('option');
            option.value = hotel.id;
            option.textContent = hotel.name;
            hotelSelect.appendChild(option);
        });
    }

    private calculateTotalPrice(tour: string, numberOfPeople: number): number {
        // Implement your logic to calculate the total price based on the tour and number of people
        // For example, you could have a predefined price per person for each tour:
        const pricePerPerson = 100; // Replace with actual logic to get the price per person for the tour
        return pricePerPerson * numberOfPeople;
    }
}

new BookingForm();

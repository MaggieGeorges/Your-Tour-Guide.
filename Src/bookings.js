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
class Booking {
    constructor(id, user, tour, hotel, bookingDate, totalPrice, numberOfPeople) {
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
    addBooking(booking) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch('http://localhost:3004/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(booking)
            });
            if (!response.ok) {
                throw new Error('Failed to add booking');
            }
        });
    }
    fetchUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch('http://localhost:3000/users');
            return yield response.json();
        });
    }
    fetchTours() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch('http://localhost:3001/tours');
            return yield response.json();
        });
    }
    fetchHotels() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch('http://localhost:3002/hotels');
            return yield response.json();
        });
    }
}
class BookingForm {
    constructor() {
        document.addEventListener('DOMContentLoaded', () => {
            this.init();
        });
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            //const bookingForm = document.getElementById('booking-form') as HTMLFormElement;
            const bookingForm = document.getElementById('booking-form');
            const bookingService = new BookingService();
            const urlParams = new URLSearchParams(window.location.search);
            const tourId = urlParams.get('tourId');
            // Load the HTML elements before trying to access their properties
            yield new Promise(resolve => {
                if (!bookingForm) {
                    console.error('Booking form element not found.');
                    return;
                }
                resolve();
            });
            const tourInput = document.getElementById('tour');
            const hotelInput = document.getElementById('hotel');
            const bookingDateInput = document.getElementById('booking-date');
            const numberOfPeopleInput = document.getElementById('number-of-people');
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
            bookingForm.addEventListener('submit', (event) => __awaiter(this, void 0, void 0, function* () {
                event.preventDefault();
                const tour = document.getElementById('tour').value;
                const hotel = document.getElementById('hotel').value;
                const bookingDate = document.getElementById('booking-date').value;
                const numberOfPeople = parseInt(document.getElementById('number-of-people').value, 10);
                const totalPrice = this.calculateTotalPrice(tour, numberOfPeople); // Implement this function based on your logic
                const id = 'booking-' + new Date().getTime();
                const newBooking = new Booking(id, user.id, tour, hotel, bookingDate, totalPrice, numberOfPeople);
                try {
                    yield bookingService.addBooking(newBooking);
                    alert('Booking successful!');
                    bookingForm.reset();
                }
                catch (error) {
                    alert('Failed to add booking');
                    console.error(error);
                }
            }));
            // Populate form with users, tours, and hotels
            yield this.populateSelectFields(bookingService);
        });
    }
    populateSelectFields(bookingService) {
        return __awaiter(this, void 0, void 0, function* () {
            const userSelect = document.getElementById('user');
            const tourSelect = document.getElementById('tour');
            const hotelSelect = document.getElementById('hotel');
            const users = yield bookingService.fetchUsers();
            users.forEach(user => {
                const option = document.createElement('option');
                option.value = user.id;
                option.textContent = user.name;
                userSelect.appendChild(option);
            });
            const tours = yield bookingService.fetchTours();
            tours.forEach(tour => {
                const option = document.createElement('option');
                option.value = tour.id;
                option.textContent = tour.name;
                tourSelect.appendChild(option);
            });
            const hotels = yield bookingService.fetchHotels();
            hotels.forEach(hotel => {
                const option = document.createElement('option');
                option.value = hotel.id;
                option.textContent = hotel.name;
                hotelSelect.appendChild(option);
            });
        });
    }
    calculateTotalPrice(tour, numberOfPeople) {
        // Implement your logic to calculate the total price based on the tour and number of people
        // For example, you could have a predefined price per person for each tour:
        const pricePerPerson = 100; // Replace with actual logic to get the price per person for the tour
        return pricePerPerson * numberOfPeople;
    }
}
new BookingForm();

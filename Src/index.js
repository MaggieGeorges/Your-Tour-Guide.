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
//TOURS
class TourService {
    fetchTours() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch('../Data/tours.json');
            return yield response.json();
        });
    }
    displayFeaturedTours() {
        return __awaiter(this, void 0, void 0, function* () {
            const tours = yield this.fetchTours();
            const toursContainer = document.getElementById('featured-tours');
            // Create the container for the tour grid
            const tourGridContainer = document.createElement('div');
            tourGridContainer.classList.add('tour-grid-container');
            const tourGrid = document.createElement('div');
            tourGrid.classList.add('tour-grid');
            // Create the heading
            const heading = document.createElement('h2');
            heading.textContent = 'Trending Tours';
            toursContainer === null || toursContainer === void 0 ? void 0 : toursContainer.appendChild(heading);
            tours.forEach((tour, index) => {
                const tourBox = document.createElement('div');
                tourBox.classList.add('tour-box');
                // Add the "Featured" badge if the tour is the second one
                if (index === 1) {
                    const featuredBadge = document.createElement('div');
                    featuredBadge.classList.add('featured-badge');
                    featuredBadge.textContent = 'Featured';
                    tourBox.appendChild(featuredBadge);
                }
                tourBox.innerHTML = `
                <img src="${tour.imageUrl}" alt="${tour.name}">
                <div class="tour-details">
                    <div class="location">${tour.location}</div>
                    <h3 class="tour-name">${tour.name}</h3>
                    <div class="reviews">${tour.reviews} reviews</div>
                    <div class="duration">${tour.duration}</div>
                    <div class="price">from $${tour.price.toFixed(2)}</div>
                </div>
            `;
                tourGrid.appendChild(tourBox);
            });
            // Append the heading before the tourGridContainer
            toursContainer === null || toursContainer === void 0 ? void 0 : toursContainer.appendChild(heading);
            toursContainer === null || toursContainer === void 0 ? void 0 : toursContainer.appendChild(tourGridContainer);
            tourGridContainer.appendChild(tourGrid);
        });
    }
}
const tourService = new TourService();
tourService.displayFeaturedTours();
//DESTINATIONS
class DestinationService {
    fetchDestinations() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch('../Data/destinations.json');
            return yield response.json();
        });
    }
    displayTopDestinations() {
        return __awaiter(this, void 0, void 0, function* () {
            const destinations = yield this.fetchDestinations();
            const destinationsContainer = document.getElementById('top-destinations');
            // Create the container for the destination grid
            const destinationGridContainer = document.createElement('div');
            destinationGridContainer.classList.add('destination-grid-container');
            const destinationGrid = document.createElement('div');
            destinationGrid.classList.add('destination-grid');
            // Create the heading
            const heading = document.createElement('h2');
            heading.textContent = 'Top Destinations';
            destinationsContainer === null || destinationsContainer === void 0 ? void 0 : destinationsContainer.appendChild(heading);
            destinations.forEach((destination) => {
                const destinationBox = document.createElement('div');
                destinationBox.classList.add('destination-box');
                destinationBox.innerHTML = `
          <img src="${destination.imageUrl}" alt="${destination.name}">
          <h3 class="destination-name">${destination.name}</h3>
        `;
                destinationGrid.appendChild(destinationBox);
            });
            destinationsContainer === null || destinationsContainer === void 0 ? void 0 : destinationsContainer.appendChild(destinationGridContainer);
            destinationGridContainer.appendChild(destinationGrid);
        });
    }
}
const destinationService = new DestinationService();
destinationService.displayTopDestinations();
//HOTELS
class HotelService {
    fetchHotels() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch('../Data/hotels.json');
            return yield response.json();
        });
    }
    displayFeaturedHotels() {
        return __awaiter(this, void 0, void 0, function* () {
            const hotels = yield this.fetchHotels();
            const hotelContainer = document.getElementById('featured-hotels');
            // Create the container for the hotel grid
            const hotelGridContainer = document.createElement('div');
            hotelGridContainer.classList.add('hotel-grid-container');
            const hotelGrid = document.createElement('div');
            hotelGrid.classList.add('hotel-grid');
            // Create the heading
            const heading = document.createElement('h2');
            heading.textContent = 'Hotels with beautiful spaces you will love';
            hotelContainer === null || hotelContainer === void 0 ? void 0 : hotelContainer.appendChild(heading);
            hotels.forEach((hotel, index) => {
                const hotelBox = document.createElement('div');
                hotelBox.classList.add('hotel-box');
                // Add the "Featured" badge if the hotel is the second one
                if (index === 1) {
                    const featuredBadge = document.createElement('div');
                    featuredBadge.classList.add('featured-badge');
                    featuredBadge.textContent = 'Featured';
                    hotelBox.appendChild(featuredBadge);
                }
                hotelBox.innerHTML = `
                <img src="${hotel.imageUrl}" alt="${hotel.name}">
                <div class="hotel-details">
                    <div class="location">${hotel.location}</div>
                    <h3 class="hotel-name">${hotel.name}</h3>
                    <div class="star-rating">
                        ${this.renderStarRating(hotel.starRating)}
                    </div>
                </div>
            `;
                hotelGrid.appendChild(hotelBox);
            });
            hotelContainer === null || hotelContainer === void 0 ? void 0 : hotelContainer.appendChild(hotelGridContainer);
            hotelGridContainer.appendChild(hotelGrid);
        });
    }
    renderStarRating(starRating) {
        let stars = '';
        for (let i = 0; i < starRating; i++) {
            stars += '⭐';
        }
        return stars;
    }
}
const hotelService = new HotelService();
hotelService.displayFeaturedHotels();

interface Tour {
    id: string;
    name: string;
    location: string;
    description: string;
    price: number;
    imageUrl: string;
    reviews: number;
    duration: string;
}

interface Hotel {
    id: string;
    name: string;
    location: string;
    starRating: number;
    imageUrl: string;
}

interface Destination {
    id: string;
    name: string;
    imageUrl: string;
}


//TOURS
class TourService {
    async fetchTours(): Promise<Tour[]>  {
        const response = await fetch('../Data/tours.json');
        return await response.json();
    }

    async displayFeaturedTours(): Promise<void> {
        const tours = await this.fetchTours();
        const toursContainer = document.getElementById('featured-tours');

        // Create the container for the tour grid
        const tourGridContainer = document.createElement('div');
        tourGridContainer.classList.add('tour-grid-container');

        const tourGrid = document.createElement('div');
        tourGrid.classList.add('tour-grid');
    
        // Create the heading
        const heading = document.createElement('h2');
        heading.textContent = 'Trending Tours';
        toursContainer?.appendChild(heading);
    
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
        toursContainer?.appendChild(heading);
        toursContainer?.appendChild(tourGridContainer);
        tourGridContainer.appendChild(tourGrid);
    }
    
      
} 
const tourService = new TourService();
tourService.displayFeaturedTours();

//DESTINATIONS
  class DestinationService {
    async fetchDestinations(): Promise<Destination[]> {
      const response = await fetch('../Data/destinations.json');
      return await response.json();
    }
  
    async displayTopDestinations(): Promise<void> {
      const destinations = await this.fetchDestinations();
      const destinationsContainer = document.getElementById('top-destinations');
  
      // Create the container for the destination grid
      const destinationGridContainer = document.createElement('div');
      destinationGridContainer.classList.add('destination-grid-container');
  
      const destinationGrid = document.createElement('div');
      destinationGrid.classList.add('destination-grid');
  
      // Create the heading
      const heading = document.createElement('h2');
      heading.textContent = 'Top Destinations';
      destinationsContainer?.appendChild(heading);
  
      destinations.forEach((destination) => {
        const destinationBox = document.createElement('div');
        destinationBox.classList.add('destination-box');
  
        destinationBox.innerHTML = `
          <img src="${destination.imageUrl}" alt="${destination.name}">
          <h3 class="destination-name">${destination.name}</h3>
        `;
        destinationGrid.appendChild(destinationBox);
      });
  
      destinationsContainer?.appendChild(destinationGridContainer);
      destinationGridContainer.appendChild(destinationGrid);
    }
    private renderStarRating(starRating: number): string {
        let stars = '';
        for (let i = 0; i < starRating; i++) {
            stars += '⭐';
        }
        return stars;
    }
  }
  
  const destinationService = new DestinationService();
  destinationService.displayTopDestinations();

//HOTELS
class HotelService {
    async fetchHotels(): Promise<Hotel[]>  {
        const response = await fetch('../Data/hotels.json');
        return await response.json();
    }

    async displayFeaturedHotels(): Promise<void> {
        const hotels = await this.fetchHotels();
        const hotelContainer = document.getElementById('featured-hotels');

        // Create the container for the hotel grid
        const hotelGridContainer = document.createElement('div');
        hotelGridContainer.classList.add('hotel-grid-container');

        const hotelGrid = document.createElement('div');
        hotelGrid.classList.add('hotel-grid');
    
        // Create the heading
        const heading = document.createElement('h2');
        heading.textContent = 'Hotels with beautiful spaces you will love';
        hotelContainer?.appendChild(heading);
    
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
        hotelContainer?.appendChild(hotelGridContainer);
        hotelGridContainer.appendChild(hotelGrid);
    }

    private renderStarRating(starRating: number): string {
        let stars = '';
        for (let i = 0; i < starRating; i++) {
            stars += '⭐';
        }
        return stars;
    }
}

const hotelService = new HotelService();
hotelService.displayFeaturedHotels();
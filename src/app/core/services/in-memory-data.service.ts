// src/app/core/services/in-memory-data.service.ts
import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Artist } from '../models/artist.model';
import { Artwork } from '../models/artwork.model';
import { Exhibition } from '../models/exhibition.model';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const artists: Artist[] = [
      {
        id: 1,
        name: 'Vincent van Gogh',
        country: 'Netherlands',
        biography:
          'Post-Impressionist painter whose expressive brushwork and colour transformed modern art.',
        birthYear: 1853,
        websiteUrl: null,
        profileImageUrl:
          'https://images.pexels.com/photos/1767434/pexels-photo-1767434.jpeg?auto=compress&cs=tinysrgb&w=800',
        mainStyle: 'Post-Impressionism',
      },
      {
        id: 2,
        name: 'Katsushika Hokusai',
        country: 'Japan',
        biography:
          'Printmaker best known for his woodblock series Thirty-six Views of Mount Fuji.',
        birthYear: 1760,
        websiteUrl: null,
        profileImageUrl:
          'https://images.pexels.com/photos/102127/pexels-photo-102127.jpeg?auto=compress&cs=tinysrgb&w=800',
        mainStyle: 'Ukiyo-e / Japanese printmaking',
      },
      {
        id: 3,
        name: 'Johannes Vermeer',
        country: 'Netherlands',
        biography:
          'Dutch Golden Age painter famous for intimate, light-filled interior scenes.',
        birthYear: 1632,
        websiteUrl: null,
        profileImageUrl:
          'https://images.pexels.com/photos/134469/pexels-photo-134469.jpeg?auto=compress&cs=tinysrgb&w=800',
        mainStyle: 'Baroque / Dutch Golden Age',
      },
      {
        id: 4,
        name: 'Sandro Botticelli',
        country: 'Italy',
        biography:
          'Early Renaissance painter whose mythological works define the Florentine Quattrocento.',
        birthYear: 1445,
        websiteUrl: null,
        profileImageUrl:
          'https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&w=800',
        mainStyle: 'Early Renaissance',
      },
      {
        id: 5,
        name: 'Gustav Klimt',
        country: 'Austria',
        biography:
          'Symbolist painter and leading figure of the Vienna Secession, known for gilded, ornamental works.',
        birthYear: 1862,
        websiteUrl: null,
        profileImageUrl:
          'https://images.pexels.com/photos/208636/pexels-photo-208636.jpeg?auto=compress&cs=tinysrgb&w=800',
        mainStyle: 'Symbolism / Vienna Secession',
      },
      {
        id: 6,
        name: 'Claude Monet',
        country: 'France',
        biography:
          'Key founder of Impressionism, obsessed with changing light and atmosphere.',
        birthYear: 1840,
        websiteUrl: null,
        profileImageUrl:
          'https://images.pexels.com/photos/207732/pexels-photo-207732.jpeg?auto=compress&cs=tinysrgb&w=800',
        mainStyle: 'Impressionism',
      },
    ];

    const exhibitions: Exhibition[] = [
      {
        id: 1,
        title: 'Masters of Light',
        location: 'Grand Hall, Aurora Gallery',
        startDate: '2025-02-14',
        endDate: '2025-04-30',
        description:
          'A journey through paintings that changed how artists represent light, colour and atmosphere.',
        heroImageUrl:
          'https://images.pexels.com/photos/2041545/pexels-photo-2041545.jpeg?auto=compress&cs=tinysrgb&w=1600',
        theme: 'Light & Colour',
      },
      {
        id: 2,
        title: 'Icons of the Sea and Dream',
        location: 'North Wing, Aurora Gallery',
        startDate: '2025-05-10',
        endDate: '2025-08-20',
        description:
          'From storms to calm horizons, this show looks at how artists transform water into myth and metaphor.',
        heroImageUrl:
          'https://images.pexels.com/photos/989737/pexels-photo-989737.jpeg?auto=compress&cs=tinysrgb&w=1600',
        theme: 'Sea, Myth, Dream',
      },
      {
        id: 3,
        title: 'Golden Visions',
        location: 'Salon Aurora',
        startDate: '2025-09-01',
        endDate: '2025-11-30',
        description:
          'Decorative, shimmering and symbolic works exploring pattern, luxury and human intimacy.',
        heroImageUrl:
          'https://images.pexels.com/photos/1767433/pexels-photo-1767433.jpeg?auto=compress&cs=tinysrgb&w=1600',
        theme: 'Gold & Ornament',
      },
    ];

    const artworks: Artwork[] = [
  {
    id: '101',
    title: 'Morning Haze',
    year: 2022,
    medium: 'Oil on Canvas',
    dimensions: '100 x 80 cm',
    price: 4500,
    imageUrl: 'https://api.nga.gov/iiif/36bd94fc-291f-43cb-9fd4-7b391fe3f0e5/full/!800,800/0/default.jpg',
    description: 'A serene depiction of a city waking up, covered in early morning fog.',
    artistId: '1',
    exhibitionId: '1',
    isFeatured: true,
  },
  {
    id: '102',
    title: 'Iron Giants',
    year: 2020,
    medium: 'Recycled Steel',
    dimensions: '200 x 150 x 150 cm',
    price: 12000,
    imageUrl: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=800&q=80',
    description: 'Towering sculptural forms made entirely from reclaimed industrial parts.',
    artistId: '2',
    exhibitionId: '2',
    isFeatured: true,
  },
  {
    id: '103',
    title: 'Neon Grid',
    year: 2021,
    medium: 'Digital Print',
    dimensions: '80 x 60 cm',
    price: 850,
    imageUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80',
    description: 'Generated patterns representing the flow of water.',
    artistId: '3',
    exhibitionId: '2',
    isFeatured: false,
  },
  {
    id: '104',
    title: 'Crimson Sky',
    year: 2021,
    medium: 'Acrylic on Wood',
    dimensions: '120 x 40 cm',
    price: 3200,
    imageUrl: 'https://images.unsplash.com/photo-1549887534-1541e9326642?auto=format&fit=crop&w=800&q=80',
    description: 'A dramatic sunset abstracted into bands of color.',
    artistId: '1',
    exhibitionId: '1',
    isFeatured: true,
  },
  {
    id: '105',
    title: 'Void Structure',
    year: 2023,
    medium: 'Concrete and Glass',
    dimensions: '50 x 50 x 50 cm',
    price: 5000,
    imageUrl: 'https://images.unsplash.com/photo-1515463138280-67d1dcbf317f?auto=format&fit=crop&w=800&q=80',
    description: 'A study in brutalism and transparency.',
    artistId: '2',
    exhibitionId: '2',
    isFeatured: false,
  },
  {
    id: '106',
    title: 'Neural Networking',
    year: 2023,
    medium: 'Digital Projection',
    dimensions: 'Variable',
    price: null,
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    description: 'A live projection mapping of neural pathways.',
    artistId: '3',
    exhibitionId: '2',
    isFeatured: false,
  },
];


    return { artists, artworks, exhibitions };
  }
}

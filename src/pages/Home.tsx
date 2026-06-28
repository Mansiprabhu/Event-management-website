import Hero from '../components/Hero';
import FeaturedVenues from '../components/FeaturedVenues';
import { Hall } from '../types';

interface HomeProps {
  halls: Hall[];
  onHeroSearch: (categoryId: string, cityId: string, date: string) => void;
  onSelectHall: (hall: Hall) => void;
  onBookHall: (hall: Hall) => void;
}

export default function Home({ halls, onHeroSearch, onSelectHall, onBookHall }: HomeProps) {
  return (
    <div className="space-y-4 animate-fade-in">
      {/* Hero Section Banner */}
      <Hero onSearchAndBook={onHeroSearch} />

      {/* Featured Luxury Venues Selection */}
      <FeaturedVenues
        onSelectHall={onSelectHall}
        onBookHall={onBookHall}
        halls={halls}
      />
    </div>
  );
}

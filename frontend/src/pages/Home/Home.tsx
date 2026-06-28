import Hero from '../../components/Hero/Hero';
import FeaturedVenues from '../../components/FeaturedVenues/FeaturedVenues';
import { Hall } from '../../types';

interface HomeProps {
  halls: Hall[];
  onHeroSearch: (categoryId: string, cityId: string, date: string) => void;
  onSelectHall: (hall: Hall) => void;
  onBookHall: (hall: Hall) => void;
}

export default function Home({ halls, onHeroSearch, onSelectHall, onBookHall }: HomeProps) {
  return (
    <div className="space-y-12 animate-fade-in">
      {/* Hero Search Section */}
      <Hero onSearchAndBook={onHeroSearch} />

      {/* Featured Venues Section */}
      <FeaturedVenues
        onSelectHall={onSelectHall}
        onBookHall={onBookHall}
        halls={halls}
      />
    </div>
  );
}

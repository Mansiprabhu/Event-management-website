import CategoriesList from '../components/CategoriesList';

interface CategoriesProps {
  onSelectCategory: (categoryId: string) => void;
}

export default function Categories({ onSelectCategory }: CategoriesProps) {
  return (
    <div className="animate-fade-in py-10 space-y-8">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Event Categories
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm max-w-lg mx-auto">
          Explore specialized packages and professional staging designed for both high-profile business summits and grand private family celebrations.
        </p>
      </div>
      <CategoriesList onSelectCategory={onSelectCategory} />
    </div>
  );
}

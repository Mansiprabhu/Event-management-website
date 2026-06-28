import { WhyChooseUs, Testimonials } from '../components/InfoSections';

export default function WhyUs() {
  return (
    <div className="animate-fade-in py-10 space-y-12">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Unmatched Staging & Guest Experience
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm max-w-lg mx-auto">
          Learn about our signature hospitality standards, flexible catering choices, and read verified reviews from our clients.
        </p>
      </div>
      <WhyChooseUs />
      <Testimonials />
    </div>
  );
}

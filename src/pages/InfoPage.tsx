type InfoPageProps = {
  title: string;
  description: string;
};

const InfoPage = ({ title, description }: InfoPageProps) => (
  <section className="mx-auto flex min-h-[60vh] max-w-7xl items-center px-6 py-16">
    <div>
      <p className="font-semibold uppercase tracking-widest text-emerald-600">TourGo</p>
      <h1 className="mt-3 text-4xl font-bold text-slate-800">{title}</h1>
      <p className="mt-4 max-w-2xl text-lg text-slate-600">{description}</p>
    </div>
  </section>
);

export default InfoPage;

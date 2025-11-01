import { getModules } from "@/lib/firebase/firestore";
import { ModuleCarousel } from "@/components/ModuleCarousel";
import { PersonalizedRecommendations } from "@/components/PersonalizedRecommendations";

export const revalidate = 3600; // Revalidate every hour

export default async function HomePage() {
  const modules = await getModules();

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold font-headline tracking-tight text-foreground">
          Módulos
        </h1>
        <p className="text-muted-foreground mt-2">
          Comece sua jornada para o fim da procrastinação.
        </p>
      </header>
      
      <section className="mb-12">
        <ModuleCarousel modules={modules} />
      </section>

      <section>
        <h2 className="text-2xl font-bold font-headline mb-4">Recomendado para Você</h2>
        <PersonalizedRecommendations allModules={modules} />
      </section>
    </div>
  );
}

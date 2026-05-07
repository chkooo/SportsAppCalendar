import RSCard from "../components/RSCard";
import { useEffect, useState } from "react";
import { apiFetch } from "../api_url";
import { SkeletonCard, EmptyState } from "../components/ui";

function Main() {
  const imgRoute = "./src/assets/MainPhoto.svg";
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("/resources")
      .then((res) => res.json())
      .then((data) => {
        setResources(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar recursos:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="relative bg-zinc-100 dark:bg-zinc-900">
      <section className="h-[60vh] sm:h-[80vh] md:h-[100vh] lg:h-[125vh]">
        <div className="sticky top-0 h-full overflow-hidden">
          <img
            src={imgRoute}
            className="absolute inset-0 w-full h-full object-cover object-center sm:object-[center_30%]"
            alt="Logo SAC"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

          <div className="absolute inset-0 flex items-end sm:items-center justify-center px-4 pb-12 sm:pb-0">
            <h2 className="text-white text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase italic text-center leading-tight drop-shadow-lg">
              Vive la experiencia deportiva con Sport-App
            </h2>
          </div>
        </div>
      </section>

      <div className="py-6 w-auto h-auto text-center text-zinc-800 dark:text-white text-3xl font-bold tracking-tight">
        Canchas Disponibles
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center max-w-6xl mx-auto px-4 pb-24 bg-zinc-100/50 dark:bg-transparent rounded-xl p-6">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center w-full">
            {[1, 2, 3].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : resources.length === 0 ? (
          <EmptyState
            title="No hay canchas disponibles"
            description="Pronto tendremos nuevas canchas para ti"
            className="col-span-full"
          />
        ) : (
          resources.map((res) => (
            <RSCard
              key={res.id}
              id={res.id}
              name={res.name}
              description={res.description}
              price={res.pricePerHour}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Main;
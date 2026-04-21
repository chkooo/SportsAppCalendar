import RSCard from "../components/RSCard";
import { useEffect, useState } from "react";
import { apiFetch } from "../api_url";

function Main() {
  const imgRoute = "/src/assets/loremIMG.svg";
  const [resources, setResources] = useState<any[]>([]);

  useEffect(() => {
    apiFetch("/resources")
      .then((res) => res.json())
      .then((data) => setResources(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Error al cargar recursos:", err));
  }, []);
  return (
    <div className="relative bg-linear-to-b from-transparent to-zinc-900">
      <section className="h-[125vh] bg-zinc-900">
        <div className="sticky top-0 h-screen overflow-hidden">
          <img
            src={imgRoute}
            className="w-full h-full object-cover"
            alt="Logo SAC"
          />
          {/* Añadimos padding lateral (px-4) para que el texto no pegue en los bordes en móvil */}
          <div className="absolute inset-0 flex items-center justify-center px-4">
            {/* Cambiamos text-6xl por:
               text-3xl: para móviles.
               sm:text-5xl: para tablets.
               md:text-6xl: para escritorio (tu valor original).
            */}
            <h2 className="text-white text-3xl sm:text-5xl md:text-6xl font-black uppercase italic text-center leading-tight">
              Vive la experiencia deportiva con Sport-App
            </h2>
          </div>
        </div>
      </section>

      <div className="py-6 w-auto h-auto text-center text-white text-3xl font-bold tracking-tight">
        Canchas Disponibles
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-24 justify-items-center max-w-6xl mx-auto bg-zinc-900">
        {resources.map((res) => (
          <RSCard
            key={res.id}
            id={res.id}
            name={res.name}
            description={res.description}
            price={res.pricePerHour}
          />
        ))}
      </div>
    </div>
  );
}

export default Main;

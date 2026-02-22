import RSCard from "../components/RSCard";

function Main() {
  const imgRoute = "/src/assets/loremIMG.svg";
  return (
    <div className="relative bg-blue-950">
      <section className="h-[174vh] bg-zinc-950">
        <div className="sticky top-0 h-screen overflow-hidden">
          <img
            src={imgRoute}
            className="w-full h-full object-cover"
            alt="Logo SAC"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-white text-6xl font-black uppercase italic text-center">
              Vive la experiencia deportiva con Sport-App
            </h2>
          </div>
        </div>
      </section>
      <div className="py-6 w-auto h-auto text-center text-white text-3xl font-bold tracking-tight">
        Canchas Disponibles
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-24 justify-items-center max-w-6xl mx-auto bg-zinc-900">
        <RSCard />
        <RSCard />
        <RSCard />
        <RSCard />
      </div>
    </div>
  );
}

export default Main;

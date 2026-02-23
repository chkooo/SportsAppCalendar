function RSCard() {
  const imgRoute = "/src/assets/loremCancha.svg";
  return (
    <div className="bg-black/30 border border-t-2 border-l-2 border-gray-500 rounded-lg shadow-md p-4 pt-0 font-sans antialiased">
      <img
        src={imgRoute}
        alt=""
        className="w-full h-32 object-cover rounded-t-lg"
      />
      <h3 className="text-xl text-zinc-300 font-bold mb-2 tracking-tight">
        Cancha 1 {/*Nombre*/}
      </h3>
      <p className="text-zinc-300 text-base tracking-normal text-left">
        Futbol Cancha 1 {/* Descirpcion*/}
      </p>
      <p className="text-gray-400 text-sm tracking-normal text-left font-semibold">
        $250/Hora {/* Precio*/}
      </p>
      <div className="mt-4 flex flex-col items-center animate-bounce animate-infinite animate-duration-[2000ms] animate-delay-[250ms] animate-ease-in animate-normal">
        <div className="text-emerald-950 font-bold bg-emerald-300 w-fit rounded-full text-sm text-center p-2 border border-t-2 border-l-2 border-gray-800 drop-shadow-md [text-shadow:4px_4px_4px_rgb(0_0_0/40%)]">
          Disponible
        </div>
      </div>
      <button className="mt-3 bg-blue-400 text-gray-200 border border-t-2 border-l-2 border-zinc-700 rounded-lg font-bold py-2 px-4 hover:bg-blue-500 tracking-tight">
        Reservar Ahora
      </button>
    </div>
  );
}

export default RSCard;

function RSCard() {
  const imgRoute = "/src/assets/loremCancha.svg";
  return (
    <div className="bg-black/30 border border-t-2 border-l-2 border-gray-500 rounded-lg shadow-md p-4 pt-0 font-sans antialiased">
      <img
        src={imgRoute}
        alt=""
        className="w-full h-32 object-cover rounded-lg"
      />
      <h3 className="text-xl font-bold mb-2 tracking-tight">Cancha 1</h3>
      <p className="text-zinc-300 text-base tracking-normal text-left">
        Futbol Cancha 1
      </p>
      <p className="text-gray-400 text-sm tracking-normal text-left">
        $250/Hora
      </p>
      <div className="flex flex-col items-center animate-pulse animate-infinite animate-duration-[1750ms] animate-delay-[750ms] animate-alternate-reverse">
        <div className="text-gray-200 font-bold bg-emerald-300 w-fit rounded-full text-sm text-center p-2 border border-t-2 border-l-2 border-gray-800 drop-shadow-md [text-shadow:_2px_2px_2px_rgb(0_0_0_/_40%)]">
          Disponible
        </div>
      </div>
      <button className="mt-3 bg-blue-400 text-gray-200 border border-t-2 border-l-2 border-zinc-800 rounded-lg font-bold py-2 px-4 hover:bg-blue-500 tracking-tight">
        Reservar Ahora
      </button>
    </div>
  );
}

export default RSCard;

import { useNavigate } from "react-router-dom";

function RSCard({
  id,
  name,
  description,
  price,
}: {
  id: string;
  name: string;
  description: string;
  price: any;
}) {
  const navigate = useNavigate();
  const imgRoute = "/src/assets/loremCancha.svg";

  const handleCardClick = () => {
    navigate(`/resource/${id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-black/30 border border-t-2 border-l-2 border-gray-500 rounded-lg shadow-md p-4 pt-0 font-sans antialiased max-w-72 w-full justify-center
    align-items-center flex flex-col cursor-pointer hover:bg-black/50 transition-colors"
    >
      <img
        src={imgRoute}
        alt=""
        className="w-full h-32 object-cover rounded-t-lg"
      />
      <h3 className="text-xl text-zinc-300 font-bold mb-2 tracking-tight">
        {name} {/* Nombre de la cancha */}
      </h3>
      <p className="text-zinc-300 text-base tracking-normal text-left w-full wrap-break-words line-clamp-3 min-h-18">
        {description} {/* Descripción */}
      </p>
      <p className="text-gray-400 text-sm tracking-normal text-left font-semibold">
        ${price} {/* Precio*/}
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

import { useNavigate } from "react-router-dom";
import { Card, Button, Badge } from "./ui";

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

  return (
    <Card 
      hover 
      clickable 
      className="max-w-72 w-full m-auto"
      onClick={() => navigate(`/resource/${id}`)}
    >
      <img
        src={imgRoute}
        alt=""
        className="w-full h-32 object-cover rounded-lg mb-4"
      />
      <h3 className="text-xl font-bold mb-2 tracking-tight text-zinc-800 dark:text-white">
        {name}
      </h3>
      <p className="text-zinc-600 dark:text-zinc-400 text-base line-clamp-3 min-h-[4.5rem]">
        {description}
      </p>
      <p className="text-zinc-700 dark:text-zinc-300 text-lg font-semibold mt-2">
        ${price}
      </p>
      <div className="mt-4 flex items-center justify-between">
        <Badge variant="success" size="sm">Disponible</Badge>
        <Button size="sm">Reservar Ahora</Button>
      </div>
    </Card>
  );
}

export default RSCard;
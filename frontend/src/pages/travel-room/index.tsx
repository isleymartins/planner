import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Plus } from "lucide-react";
import { Trip } from "../../model/model"
import { Card } from "./card";
import Avatar from "../../components/avatar";
import { Button } from "../../components/button";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/axios";


export function TravelRoom() {
  const [listTrips, setlistTrips] = useState<Trip[]>([]);
  const auth = useContext(AuthContext);
  const user = auth.user;
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/trips?email=${user.email}`).then(response => {
      setlistTrips(response.data)
      console.log("user.email", response.data)
    })

  },[])


  function loginOut() {
    auth.signout();
  }

  const handleButtonCard = (tripId: string) => {
    navigate(`/trips/${tripId}`);
    
  };
  const handleButtonTrip = () => {
    navigate(`/trips`);
  };

  return (
    <div className="">
      <div className="px-5 py-2 bg-zinc-800 shadow-shape">
        <div className=" flex justify-between items-center gap-3 text-zinc-400 text-1xl">
          <p className={"text-2xl"}>Olá <span className="text-zinc-100">{user.user}</span></p>
          <button className="text-zinc-300" onClick={() => loginOut()}>Sair</button>
        </div>
        <div className="py-5 flex justify-between items-center gap-3 text-zinc-400 text-1xl">
          <p className={"text-2xl"}>Bem vindo de volta!</p>
          <div className="flex items-center justify-center">
            <Avatar user={`${auth.user.user}`} />
          </div>
        </div>
        <Button type="submit" variant="primary" onClick={() => handleButtonTrip()}>
          <Plus className="size-5" />
          Criar uma viagem
        </Button>

      </div>
      <div className="px-5 py-2 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Suas viagens</h2>


      </div>
      <div className="px-5 py-5 flex flex-wrap items-start">
        {listTrips.map((trip: Trip) =>
        {console.log(`/trips/${trip.id}`)
         return <Card key={trip.id}
            trip={trip}
            handleButtonCard={handleButtonCard}
          />
})}
      </div>
    </div>
  );
}

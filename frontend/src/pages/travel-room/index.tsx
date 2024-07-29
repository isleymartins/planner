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
  const auth = useContext(AuthContext);
  const user = auth.user;
  const listTripsOwner = auth.listTripsOwner
  const listTrips = auth.listTrips
  const navigate = useNavigate();

function loginOut() {
  auth.signout()
  navigate(`/`)
}

const handleButtonCard = (tripId: string) => {
  navigate(`/trips/${tripId}`);

}
const handleButtonTrip = () => {
  navigate(`/trips`);
}
const handleButtonCardRemove = (tripId: string) => {
  api.delete(`/trips/${tripId}`)
  window.document.location.reload()
}
const handleButtonCardRemoveParticipant = (tripId: string) => {
  api.delete(`/trips/${tripId}/participants/${user.email}`)

  window.document.location.reload()
}

return (
  <div className="">
    <div className="px-5 py-2 bg-zinc-800 ">
      <div className="items-center gap-3 text-zinc-400 text-1xl flex justify-between">
        <p className={"text-2xl"}>Olá <span className="text-zinc-100">{user.user}</span>,
          Bem vindo de volta!</p>
        <div className="flex-col items-center text-center">
          <Avatar user={`${user.user}`} />
          <button className="text-zinc-300" onClick={() => loginOut()}>Sair</button>
        </div>
      </div>
      <div className="py-1 items-end">
        <Button type="submit" variant="primary" onClick={() => handleButtonTrip()}>
          <Plus className="size-5" />
          Criar uma viagem
        </Button>
      </div>
    </div>
    <div className=" flex justify-between gap-3 ">
      <div className="px-5 py-2 w-2/4 conteinerFomart">
        <h2 className="text-2xl font-semibold">Suas viagens</h2>

        <div className="flex flex-wrap items-start overflow-auto">
          {listTripsOwner.map((trip: Trip) =>
            <Card key={trip.id}
              trip={trip}
              handleButtonCard={handleButtonCard}
              handleButtonCardRemove={handleButtonCardRemove}
            />
          )}
        </div>
      </div>
      <div className="px-5 py-2  w-2/4 conteinerFomart">
        <h2 className="text-2xl font-semibold">Viagem como participante</h2>

        <div className="flex flex-wrap items-start overflow-auto">
          {listTrips.map((trip: Trip) =>
            <Card key={trip.id}
              trip={trip}
              handleButtonCard={handleButtonCard}
              handleButtonCardRemove={handleButtonCardRemoveParticipant}
            />
          )}
        </div>
      </div>
    </div>

  </div>
);
}

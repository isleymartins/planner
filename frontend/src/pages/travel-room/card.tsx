import { Trash2, MapPin, Calendar, Users } from "lucide-react";
import { Button } from "../../components/button";
import { Trip } from "../../model/model";
import { format } from "date-fns";

interface TripProp {
  trip: Trip;
  handleButtonCard: (id: string) => void;
  handleButtonCardRemove: (id: string) => void;
}

export function Card({ trip, handleButtonCard, handleButtonCardRemove }:
  TripProp) {

  const displayedDate = trip?.starts_at && trip?.ends_at
    ? format(trip?.starts_at, "dd' de 'LLL' de 'yyyy").concat(' até ').concat(format(trip?.ends_at, "dd' de 'LLL' de 'yyyy"))
    : null
  return (
    <article className="px-5 py-5 flex flex-col bg-zinc-900 shadow-shape items-start justify-between m-5 card">
      <div className="flex items-center justify-between w-full">
        <h2 className="text-2xl">Viagem</h2>
        <button onClick={() => handleButtonCardRemove(trip.id)} className="text-zinc-300 px-5 py-2 font-medium flex items-center gap-2">
          <Trash2 className="size-5" />
        </button>
      </div>
      <div className="py-2 flex flex-col">
        <div className="flex items-center">
          <MapPin className="size-4 mr-2" />
          <span className="text-zinc-100">{trip?.destination}</span>
        </div>
        <div className="flex items-center">
          <Users className="size-4 mr-2" />
          <span className="text-zinc-100">{trip?.emails_to_invite.length} participantes</span>
        </div>
        <div className="flex items-center">
          <Calendar className="size-7 mr-2" />
          <span className="text-zinc-100">{displayedDate}</span>
        </div>
      </div>

      <Button
        type="submit"
        variant="tertiary"
        size="fullSmall"
        onClick={() => handleButtonCard(trip.id)}
      >
        Ver mais
      </Button>
    </article>

  );
}

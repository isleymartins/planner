import { CheckCircle2, CircleDashed, UserCog, Trash2 } from "lucide-react";
import { Button } from "../../components/button";
import { useState, useEffect, useContext } from "react";
/*import { useParams } from "react-router-dom";
import { api } from "../../services/axios";*/
import { Participant, Trip } from "../../model/model";
import { AuthContext } from "../../context/AuthContext";


interface GuestsProps {
  trip: Trip
  handleButtonRemoveParticipant: (tripId: string, participant: string) => void
  handleButtonChangeConfirmation: (tripId: string, participant: string) => void
}
export function Guests({
  trip,
  handleButtonRemoveParticipant,
  handleButtonChangeConfirmation
}: GuestsProps) {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const auth = useContext(AuthContext);
  const user = auth.user
  console.log(user, "!", trip)

  useEffect(() => {
    if (trip?.emails_to_invite) {
      const newParticipants = trip.emails_to_invite.map(participant => ({
        email: participant.email,
        is_confirmed: participant.is_confirmed
      }));
      setParticipants(newParticipants);
    }
    console.log(participants)
  }, [trip]);

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Convidados</h2>

      <div className="space-y-5">
        {participants.map((participant, index) => (
          <div key={index} className="flex items-center justify-between gap-4">
            <div>
              {(participant.email === user.email || trip?.owner_email === user.email) && trip && (
                <button onClick={() => handleButtonRemoveParticipant(trip.id, participant.email)}>
                  <Trash2 className="text-zinc-400 size-5 shrink-0" />
                </button>
              )}
              <div className="space-y-1.5">

                <span className="block font-medium text-zinc-100">{participant.email ?? `Convidado ${index}`}</span>
                <span className="block text-sm text-zinc-400 truncate">
                  {participant.email}
                </span>
              </div>
            </div>

            {participant.is_confirmed ? (
              (participant.email === user.email)? (
                <button onClick={() => handleButtonChangeConfirmation(trip.id, participant.email)}>
                  <CheckCircle2 className="text-green-400 size-5 shrink-0" />
                </button>
              ):
              (<CheckCircle2 className="text-green-400 size-5 shrink-0" />)
              
            ) : (
              (participant.email === user.email)? (
                <button onClick={() => handleButtonChangeConfirmation(trip.id, participant.email)}>
                  <CircleDashed className="text-zinc-400 size-5 shrink-0" />
                </button>
              ):
              <CircleDashed className="text-zinc-400 size-5 shrink-0" />
            )}
          </div>
        ))}
      </div >

      <Button variant="secondary" size="full">
        <UserCog className="size-5" />
        Gerenciar convidados
      </Button>
    </div>
  )
}
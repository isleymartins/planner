import { X } from "lucide-react";
import { useState, useEffect, useContext } from "react";
import { Participant, Trip } from "../../model/model";
import { AuthContext } from "../../context/AuthContext";


interface GuestsProps {
  trip: Trip
  handleButtonRemoveParticipant: (tripId: string, participant: string) => void
  handleButtonChangeConfirmation: (tripId: string, participant: string) => void
  iconChangeConfirmation: (is_confirmed: boolean) => any
}
export function Guests({
  trip,
  handleButtonRemoveParticipant,
  handleButtonChangeConfirmation,
  iconChangeConfirmation
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
    (trip) && (
      <div className="space-y-6">
        <h2 className="font-semibold text-xl">Convidados</h2>
        <p>Confime ou retire-se da viagem interagindo com os icons</p>
        <div className="space-y-5">
          {participants.map((participant, index) => (
            <div key={index} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {(participant.email === user.email) ? (
                  <button className="text-zinc-100 icon" onClick={() => handleButtonChangeConfirmation(trip.id, participant.email)}>
                    {iconChangeConfirmation(participant.is_confirmed)}
                  </button>
                ) : (
                  <div className="text-zinc-400">
                    {iconChangeConfirmation(participant.is_confirmed)}
                  </div>
                )}
                <div className="space-y-1.5">
                  <span className="block font-medium text-zinc-100">{participant.email ?? `Convidado ${index}`}</span>
                  <span className="block text-sm text-zinc-400 truncate">
                    {participant.email}
                  </span>
                </div>
              </div>

              {(trip?.owner_email === user.email) && (
                <button onClick={() => handleButtonRemoveParticipant(trip.id, participant.email)}>
                  <X className="text-zinc-100 size-5 shrink-0" />
                </button>
              )}
            </div>
          ))}

        </div>

        {/*<Button variant="secondary" size="full">
        <UserCog className="size-5" />
        Gerenciar convidados
      </Button>*/}
      </div >
    ))
}
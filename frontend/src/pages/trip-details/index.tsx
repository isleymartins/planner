import { CheckCircle2, CircleDashed, Plus, Undo2 } from "lucide-react";
import { useEffect, useState } from "react";
import { CreateActivitiesModal } from "./create-activities-modal";
import { Guests } from "./guests";
import { Activity } from "./activities";
import { DestinationAndDateHeader } from "./destination-and-date-header";
import { useNavigate, useParams } from "react-router-dom";
import { Trip } from "../../model/model";
import { api } from "../../services/axios";

export function TripDetailsPage() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [isCreateActivitiesModalOpen, setIsCreateActivitiesModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/trips/${tripId}`);
        console.log("response", response.data);
        setTrip(response.data);
      } catch (error) {
        console.error("Erro ao buscar a viagem:", error);
      }
    };

    fetchData();
  }, [tripId]);

  function openCreateActivitiesModal() {
    setIsCreateActivitiesModalOpen(true);
  }

  function closeCreateActivitiesModal() {
    setIsCreateActivitiesModalOpen(false);
  }

  const handleButtonBack = () => {
    navigate(`/user`);
  };

  const handleButtonRemoveParticipant = (tripId: string, participant: string) => {
    console.log("remove", tripId, " x ", participant);
    api.delete(`/trips/${tripId}/participants/${participant}`);
    window.document.location.reload();
  };

  const handleButtonChangeConfirmation = (tripId: string, participant: string) => {
    console.log("troca ", tripId, " x ", participant);
    api.get(`/trips/${tripId}/participants/${participant}`);
    
    window.document.location.reload();
  };

  const iconChangeConfirmation = (is_confirmed: boolean) => {
    return is_confirmed ? (
      <CheckCircle2 className= "size-5 shrink-0" />
    ) : (
      <CircleDashed className="size-5 shrink-0" />
    );
  };

  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <div className="relative">
        <button onClick={handleButtonBack} className="button-back rounded-lg px-5 py-2 flex items-center gap-2 absolute top-3 left--10">
          <Undo2 className="size-6" />
        </button>
        {trip ? (
          <>
            <DestinationAndDateHeader trip={trip} />
          </>
        ) : (
          "Carregando..."
        )}
      </div>

      <main className="flex gap-16 px-4">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">Atividades</h2>

            <button onClick={openCreateActivitiesModal} className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400">
              <Plus className="size-5" />
              Cadastrar atividade
            </button>
          </div>

          <Activity />
        </div>

        <div className="w-80 space-y-6">
          {/* <ImportantLinks /> */}
          <div className="w-full h-px bg-zinc-800" />

          {trip ? (
            <>
              <Guests
                trip={trip}
                handleButtonRemoveParticipant={handleButtonRemoveParticipant}
                handleButtonChangeConfirmation={handleButtonChangeConfirmation}
                iconChangeConfirmation={iconChangeConfirmation}
              />
            </>
          ) : (
            "Carregando..."
          )}
        </div>
      </main>

      {isCreateActivitiesModalOpen && (
        <CreateActivitiesModal closeCreateActivitiesModal={closeCreateActivitiesModal} />
      )}
    </div>
  );
}

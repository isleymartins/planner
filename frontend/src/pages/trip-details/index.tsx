import { Plus, Undo2 } from "lucide-react";
import { useState } from "react";
import { CreateActivitiesModal } from "./create-activities-modal";
import { ImportantLinks } from "./important-links";
import { Guests } from "./guests";
import { Activity } from "./activities";
import { DestinationAndDateHeader } from "./destination-and-date-header";
import { useNavigate } from "react-router-dom";

export function TripDetailsPage() {
  const [isCreateActivitiesModalOpen, setIsCreateActivitiesModalOpen] = useState(false)
  const navigate = useNavigate();

  function openCreateActivitiesModal() {
    setIsCreateActivitiesModalOpen(true)
  }

  function closeCreateActivitiesModal() {
    setIsCreateActivitiesModalOpen(false)
  }
  const handleButtonBack = () => {
    navigate(`/user`);

  }

  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <div className="relative">
        <button onClick={()=>handleButtonBack()} className="button-back rounded-lg px-5 py-2 flex items-center gap-2 absolute top-3 left--10">
          <Undo2 className="size-6" />
        </button>
        <DestinationAndDateHeader />
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
          <ImportantLinks />

          <div className="w-full h-px bg-zinc-800" />

          <Guests />
        </div>
      </main>

      {
        isCreateActivitiesModalOpen && (
          <CreateActivitiesModal
            closeCreateActivitiesModal={closeCreateActivitiesModal}
          />
        )
      }
    </div >
  )
}
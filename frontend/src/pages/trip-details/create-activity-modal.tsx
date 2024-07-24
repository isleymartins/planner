import { Calendar, Tag, X} from "lucide-react";
import { Button } from "../../components/button";
import { FormEvent } from "react";
import { api } from "../../services/axios";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import {Activities} from "../../model/model"


interface CreateActivityModalProps {
  closeCreateActivityModal: () => void
  activitiesId: Activities | undefined
}

export function CreateActivityModal({
  closeCreateActivityModal,
  activitiesId
}: CreateActivityModalProps) {
  const { tripId } = useParams()


  async function createActivity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const date = activitiesId?.date && data.get('time') ?
      Date.parse(`${format(activitiesId?.date, "yyyy-MM-dd")}T${data.get('time')}`) : 0

    const title = data.get('title')?.toString()
    const occurs_at = new Date(date);
    const description = data.get('description')?.toString()

    //await api.post(`/trips/${tripId}/activities`, {
    await api.post(`/activities/${activitiesId?._id}/activity`, {
      tripId,
      title,
      occurs_at,
      description
    })
    window.document.location.reload()
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-lg font-semibold">Cadastrar atividade</h2>
            <button>
              <X className="size-5 text-zinc-400" onClick={closeCreateActivityModal} />
            </button>
          </div>

          <p className="text-sm text-zinc-400">
            Todos convidados podem visualizar as atividades.
          </p>
        </div>

        <form onSubmit={createActivity} className="space-y-3">
          <div className="flex space-x-3">
            <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2 w-2/4">
              <Tag className="text-zinc-400 size-5" />
              <input
                name="title"
                placeholder="Qual a atividade?"
                className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              />
            </div>
            <div className="h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2 w-2/4">
              
              <span>{activitiesId && format(activitiesId?.date, "dd/MM/yyyy")}</span>
              <Calendar className="text-zinc-400 size-5" />
              <input
                type="time"
                id="hora"
                name="time"
                className="text-zinc-400 size-5 w-3/6 inputHours"
                
              />
{/*style={{ textAlign: 'center', backgroundColor: "transparent", border: "transparent", resize: "none",outline: "none"}}*/}
            </div>
          </div>
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Tag className="text-zinc-400 size-5" />
            <input
              name="description"
              placeholder="O que vamos fazer?(Opcional)"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
          </div>

          <Button size="full">
            Salvar atividade
          </Button>
        </form>
      </div>
    </div>
  )
}
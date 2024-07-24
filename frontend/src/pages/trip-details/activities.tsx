import { CircleCheck, X, Pencil } from "lucide-react";
import { api } from "../../services/axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CreateActivityModal } from "./create-activity-modal";
import {Activities} from "../../model/model"

export function removerActivity(activitiesId: string, activityId: string) {

  api.delete(`/activities/${activitiesId}/activity/${activityId}`).then(response => alert(response.data.msg))

  window.document.location.reload()

}
export function removerActivities(activitiesId: string) {
  api.delete(`/activities/${activitiesId}`).then(response => alert(response.data.msg))

  window.document.location.reload()

}

export function Activity() {
  const { tripId } = useParams()
  const [activities, setActivities] = useState<Activities[]>([])
  const [activitiesId, setActivitiesId] = useState<Activities>()

  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] = useState(false)

  function openCreateActivityModal(id: Activities) {
    setActivitiesId(id)
    setIsCreateActivityModalOpen(true)
  }

  function closeCreateActivityModal() {
    setIsCreateActivityModalOpen(false)
  }


  useEffect(() => {
    api.get(`/activities?id=${tripId}`).then(response => setActivities(response.data/*.activities*/))
  }, [tripId])
 
  return (
    <div className="space-y-8">
      {activities.map(category => {
        return (
          <div key={category.date}>
            <div className="space-y-2.5">
              <div className="flex gap-2 items-baseline">
                <span className="text-xl text-zinc-300 font-semibold">Dia {format(category.date, 'd')}</span>
                <span className="text-xs text-zinc-500">{format(category.date, 'EEEE', { locale: ptBR })}</span>
                <button>
                  <Pencil onClick={() => (openCreateActivityModal(category))} className="size-4 text-zinc-400" />
                </button>
              </div>
            </div>

            {category.activities.length > 0 ? (
              <div>
                {category.activities.map(activity => {
                  return (
                    <div key={activity._id} className="space-y-2.5">

                      <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                        <CircleCheck className="size-5 text-lime-300" />
                        <span className="text-zinc-100">{activity.title}</span>
                        <span className="text-zinc-600">{activity.description}</span>
                        <span className="text-zinc-400 text-sm ml-auto">
                          {format(activity.occurs_at, 'HH:mm')}
                        </span>
                        <X onClick={() => (removerActivity(category._id, activity._id))} className="size-4 text-zinc-400" />
                      </div>

                    </div>
                  )
                })}
              </div>
            ) : (
              <p className="text-zinc-500 text-sm">Nenhuma atividade cadastrada nessa data.</p>
            )}
          </div>
        )
      })}
      {
      isCreateActivityModalOpen && (
        <CreateActivityModal
          closeCreateActivityModal={closeCreateActivityModal}
          activitiesId={activitiesId}
        />
      )
    }
    </div>

  )
}
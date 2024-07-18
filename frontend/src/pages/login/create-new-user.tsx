import { User, X, KeyRound, Mail } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "../../components/button";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";

interface NewUserProps {
  closeNewUserModal: () => void
  //modificado
  /*eventStartAndEndDates: DateRange | undefined
  destination: string
  setOwnerName: (name: string) => void
  setOwnerEmail: (email: string) => void
  createTrip: (event: FormEvent<HTMLFormElement>) => void*/
}

export function CreateNewUser({
  closeNewUserModal,
  /*createTrip,
  eventStartAndEndDates,
  destination,
  setOwnerEmail,
  setOwnerName*/
}: NewUserProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-lg font-semibold">Criar conta</h2>
            <button>
              <X className="size-5 text-zinc-400" onClick={closeNewUserModal} />
            </button>
          </div>

          <p className="text-sm text-zinc-400">
            Seja <span className="font-semibold text-zinc-100">bem vindo(a)!</span> Preencha os dados para criar conta</p>

        </div>

        <form className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <User className="text-zinc-400 size-5" />
            <input
              type="text"
              name="user"
              placeholder="Nome do usuário"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"

            />
          </div>
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Mail className="text-zinc-400 size-5" />
            <input
              type="email"
              name="email"
              placeholder="Seu email"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"

            />
          </div>
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <KeyRound className="text-zinc-400 size-5" />
            <input
              type="password"
              name="password"
              placeholder="Sua senha"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"

            />
          </div>

          <Button type="submit" size="full">
            Criar conta
          </Button>
        </form>
      </div>
    </div>
  )
}
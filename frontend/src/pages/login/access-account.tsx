import {KeyRound, AtSign,Mail} from "lucide-react"
import { FormEvent } from "react";
import { Button } from "../../components/button";

interface AccessAccountProps {
  handleSubmit:  (email:string,password:string)=> void
}
async function createActivities(event: FormEvent<HTMLFormElement>,handleSubmit: (email: string, password: string) => void) {
  
  event.preventDefault()
  const data = new FormData(event.currentTarget)
  
  const email = data.get("email")?.toString()
  const password = data.get("password")?.toString()

  email&&password?handleSubmit(email,password ):alert("Erro inesperado")
  
}

export function AccessAccount({
  handleSubmit
}:AccessAccountProps) {
  return (
    <div className="inset-0  flex items-center justify-center">
      <form onSubmit={(e)=>createActivities(e,handleSubmit)} className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Mail className="text-zinc-400 size-5" />
            <input
              type="email"
              name="email"
              placeholder="Seu email"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
             
            /> {/*onChange=event => setOwnerName(event.target.value)*/}
          </div>

          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <KeyRound  className="text-zinc-400 size-5" />
            <input
              type="password"
              name="password"
              placeholder="Sua senha"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              
            />{/*onChange={event => setOwnerEmail(event.target.value)*/}
          </div>

          <Button type="submit" size="full" >
            Login
          </Button>
        </form>
    </div>
  )
}

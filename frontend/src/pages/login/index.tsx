import { FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateNewUser } from "./create-new-user";
import { AccessAccount } from "./access-account";
import { DateRange } from "react-day-picker";
import { api } from "../../lib/axios";
import { AuthContext } from "../../context/auth/AuthContext";

export function LoginTripPage() {
  const navigate = useNavigate()
  const [isNewUserModal, setIsNewUserModalOpen] = useState(false)
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false)
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false)
  const [emailsToInvite, setEmailsToInvite] = useState([
    'diego@rocketseat.com.br',
    'john@acme.com'
  ])

  const [destination, setDestination] = useState('')
  const [ownerName, setOwnerName] = useState('')
  const [ownerEmail, setOwnerEmail] = useState('')
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<DateRange | undefined>()

  const auth = useContext(AuthContext)

  function openNewUserModal() {
    setIsNewUserModalOpen(true)
    //alert(isNewUserModal)
  }

  function closeNewUserModal() {
    setIsNewUserModalOpen(false)
  }

  function openGuestsInput() {
    setIsNewUserModalOpen(true)
  }

  function closeGuestsInput() {
    setIsNewUserModalOpen(false)
  }
  function openConfirmTripModal() {
    setIsConfirmTripModalOpen(true)
  }

  function closeConfirmTripModal() {
    setIsConfirmTripModalOpen(false)
  }

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const email = data.get('email')?.toString()

    if (!email) {
      return
    }

    if (emailsToInvite.includes(email)) {
      return
    }

    setEmailsToInvite([
      ...emailsToInvite,
      email
    ])

    event.currentTarget.reset()
  }

  function removeEmailFromInvites(emailToRemove: string) {
    const newEmailList = emailsToInvite.filter(email => email !== emailToRemove)

    setEmailsToInvite(newEmailList)
  }

  async function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!destination) {
      return
    }

    if (!eventStartAndEndDates?.from || !eventStartAndEndDates?.to) {
      return
    }

    if (emailsToInvite.length === 0) {
      return
    }

    if (!ownerName || !ownerEmail) {
      return
    }
    const response = await api.post('/trips', {
      destination: destination,
      starts_at: eventStartAndEndDates.from,
      ends_at: eventStartAndEndDates.to,
      emails_to_invite: emailsToInvite,
      owner_name: ownerName,
      owner_email: ownerEmail
    })

    const { _id } = response.data.response

    navigate(`/trips/${_id}`)
  }
  const handleSubmit = async (email: string, password: string) => {

    if (email && password) {
       const isAuthenticated: boolean = await auth.signin(email, password)

       if (isAuthenticated) {
           // Navegamos para a página inicial se o usuário for autenticado
           navigate('/trips')
       }
       else {
           alert("Email e senha invalidos") 
       }
   }

}
  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex flex-col items-center gap-3">
          <img src="/logo.svg" alt="plann.er" />
          <p className="text-zinc-300 text-lg">
            Convide seus amigos e planeje sua próxima viagem!
          </p>
        </div>

        <div className="space-y-1">
          <AccessAccount 
            handleSubmit={handleSubmit}
          />
          <p className="text-sm text-zinc-500">
            É novo por aqui? <button className="text-zinc-300 underline" onClick={() => openNewUserModal()}>Criar conta</button></p>
        </div>

        <p className="text-sm text-zinc-500">
          Ao planejar sua viagem pela plann.er você automaticamente concorda <br />
          com nossos <a className="text-zinc-300 underline" href="#">termos de uso</a> e <a className="text-zinc-300 underline" href="#">políticas de privacidade</a>.
        </p>
      </div>

      {isNewUserModal && (
        <CreateNewUser
          closeNewUserModal={closeNewUserModal}
        />
      )}

      {/*{isConfirmTripModalOpen && (
        <ConfirmTripModal 
          closeConfirmTripModal={closeConfirmTripModal}
          createTrip={createTrip}
          setOwnerName={setOwnerName}
          setOwnerEmail={setOwnerEmail}
          //modificado
          eventStartAndEndDates={eventStartAndEndDates}
          destination={destination}
        />
      )}*/}
    </div>
  );
}
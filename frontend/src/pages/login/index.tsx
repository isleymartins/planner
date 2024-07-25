import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateNewUser } from "./create-new-user";
import { AccessAccount } from "./access-account";

import { AuthContext } from "../../context/AuthContext";


export function LoginTripPage() {
  const navigate = useNavigate()

  const [isNewUserModal, setIsNewUserModalOpen] = useState(false)
  const auth = useContext(AuthContext)

  function openNewUserModal() {
    setIsNewUserModalOpen(true)
  }

  function closeNewUserModal() {
    setIsNewUserModalOpen(false)
  }
  const handleSubmit = async ( email: string, password: string) => {
    if (email && password) {
      const isAuthenticated: boolean = await auth.signin(email, password);

      if (isAuthenticated) {
        navigate('/user');   
      } else {
        alert("Email e senha inválidos");
      }
    }
  };
  
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
    </div>
  );
}
import { useHistory } from 'react-router-dom'
import { FormEvent, useState } from 'react'

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo-test.png'
import googleIconImg from '../assets/images/google-icon.svg'

import { database } from '../services/firebase'

import { Toaster, toast } from 'react-hot-toast'

import { Button } from '../components/Button'
import { useAuth } from '../hooks/useAuth'

import '../styles/auth.scss'

export function Home() {
   const history = useHistory();
   const { user, signInWithGoogle } = useAuth();
   const [roomCode, setRoomCode] = useState('');

   async function handleCreateRoom() {
      if (!user) {
         await signInWithGoogle();
      }

      history.push('/rooms/new');
   }

   async function handleJoinRoom(event: FormEvent) {
      event.preventDefault();

      if (roomCode.trim() === '') {
         throw toast.error("Insert a room code");
      }

      const roomRef = await database.ref(`rooms/${roomCode}`).get();

      if (!roomRef.exists()) {
         throw toast.error("non-existent room");
      }

      if (roomRef.val().endedAt) {
         toast.error('Room already closed');
         return;
      }

      history.push(`/rooms/${roomCode}`)
   }

   return (
      <>
         <Toaster />
         <div id="page-auth">
            <aside>
               <img src={illustrationImg} alt="ilustração com o significado da aplicação" />
               <strong>Crie salas de Q&amp;A ao vivo</strong>
               <p>Tire as dúvidas de sua audiência em tempo-real</p>
            </aside>
            <main>
               <div className="main-content">
                  <img src={logoImg} className="logoAsk" alt="Logo Letmeask" />
                  <button onClick={handleCreateRoom} className="create-room">
                     <img src={googleIconImg} alt="ícone do google" />
                     Crie sua sala com o Google
                  </button>
                  <div className="separator">ou entre em uma sala existente</div>
                  <form onSubmit={handleJoinRoom}>
                     <input 
                        type="text" 
                        placeholder="Digite o código da sala"
                        onChange={event => setRoomCode(event.target.value)}
                        value={roomCode}
                     />
                     <Button type="submit">
                        Entrar na sala
                     </Button>
                  </form>
               </div>
            </main>
         </div>
      </>
   )
}
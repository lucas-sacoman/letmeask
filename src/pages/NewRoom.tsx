import { Link, useHistory } from 'react-router-dom'
import { FormEvent, useState } from 'react';

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo-test.png'
import { Button } from '../components/Button'
import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase';

import '../styles/auth.scss'

export function NewRoom() {
   const { user } = useAuth();
   const history = useHistory();
   const [newRoom, setNewRoom] = useState('');

   // Fluxo de criação de sala
   async function handleCreateRoom(event: FormEvent) {
      event.preventDefault();

      if (newRoom.trim() === '') {
         return;
      }

      const roomRef = database.ref('rooms');

      const fireBaseRoom = await roomRef.push({
         title: newRoom,
         authorId: user?.id,
      })

      history.push(`/admin/rooms/${fireBaseRoom.key}`)
   }

   return (
      <div id="page-auth">
         <aside>
            <img src={illustrationImg} alt="ilustração com o significado da aplicação" />
            <strong>Crie salas de Q&amp;A ao vivo</strong>
            <p>Tire as dúvidas de sua audiência em tempo-real</p>
         </aside>
         <main>
            <div className="main-content">
               <img src={logoImg} className="logoAsk" alt="Logo Letmeask" />
               <h2>Crie uma nova sala</h2>
               <form onSubmit={handleCreateRoom}>
                  <input 
                     type="text" 
                     placeholder="Nome da sala"
                     onChange={event => setNewRoom(event.target.value)}
                     value={newRoom}
                  />
                  <Button type="submit">
                     Criar sala
                  </Button>
               </form>
               <p>
                  Quer entrar em uma sala já existente? <Link to="/">Clique aqui</Link>
               </p>
            </div>
         </main>
      </div>
   )
}
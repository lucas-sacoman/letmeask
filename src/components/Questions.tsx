import { ReactNode } from 'react';
import cx from 'classnames'

import '../styles/questions.scss'

type QuestionProps = {
   content: string;
   author: {
      name: string;
      avatar: string;
   }
   children?: ReactNode;
   isAnswered?: boolean;
   isHighlighted?: boolean;
}

// Desestruturando props para: content e author;
export function Questions({
   content, 
   author, 
   children,
   isAnswered = false,
   isHighlighted = false,
}: QuestionProps) {
   return (
      <div 
         className={cx( // é um pacote em TS que facilita o uso de classes
            'question',
            { answered: isAnswered }, // aqui é usado entre chaves o "nome da classe:" "A condição para ser usada aquela classe"
            { highlighted: isHighlighted && !isAnswered},
         )}
      >
         <p>{content}</p>
         <footer>
            <div className="user-info">
               <img src={author.avatar} alt={author.name} />
               <span>{author.name}</span>
            </div>
            <div>
               {children}
            </div>
         </footer>
      </div>
   )
}
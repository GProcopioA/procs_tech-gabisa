import { useState } from 'react';
import './BouncingLetter.css'; // Importa o CSS para a animação

interface BouncingLetterProps {
  letter: string; // Estamos dizendo que 'letter' deve ser uma string
}

const BouncingLetter: React.FC<BouncingLetterProps> = ({ letter }) => {
  const [isBouncing, setIsBouncing] = useState(false);
  
  // Função para iniciar a animação
  const startBounce = () => {
    setIsBouncing(true);
    // Remove a classe de animação após um tempo para que ela possa ser reativada
    // O tempo deve ser igual ou um pouco maior que a duração da animação CSS
    setTimeout(() => {
      setIsBouncing(false);
    }, 800); // 0.8s, assumindo que sua animação CSS dure 0.7s
  };

  return (
    <span
      className={`bouncing-letter ${isBouncing ? 'bounce' : ''}`}
      onMouseEnter={startBounce} // Inicia a animação ao passar o mouse
      onClick={startBounce}     // Inicia a animação ao clicar
    >
      {letter}
    </span>
  );
};

export default BouncingLetter;
import { useState, useEffect, useRef } from 'react';
import './MiniCarousel.css'; // Importe o CSS
import fotoLocal1 from './assets/foto1.jpeg'; // Exemplo: crie esta imagem ou ajuste o caminhoAdd commentMore actions
import fotoLocal2 from './assets/foto2.jpeg'; // Exemplo: crie esta imagem ou ajuste o caminho
import fotoLocal3 from './assets/foto3.jpeg'; // Exemplo: crie esta imagem ou ajuste o caminho
import fotoLocal4 from './assets/foto4.jpeg'; // Exemplo: crie esta imagem ou ajuste o caminho

const images = [
    fotoLocal1,
    fotoLocal2,
    fotoLocal3,
    fotoLocal4,
  ];

const MiniCarousel = ({ autoPlayInterval = 3000 }) => { // Propriedade para controlar o tempo de auto-play
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<number | null>(null); 

  // Função para resetar o timer do auto-play
  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  // Efeito para o auto-play
  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, autoPlayInterval);

    return () => {
      resetTimeout(); // Limpa o timer quando o componente é desmontado
    };
  }, [currentIndex, autoPlayInterval]); // Roda novamente quando a imagem muda ou o intervalo muda

  // Funções para navegação manual
  const goToNext = () => {
    resetTimeout();
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrev = () => {
    resetTimeout();
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="mini-carousel-container">
      <div className="carousel-images">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Carousel item ${index + 1}`}
            className={index === currentIndex ? 'active' : ''}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }} // Desliza as imagens
          />
        ))}
      </div>
      <div className="carousel-controls">
        <button onClick={goToPrev} className="control-button prev-button">
          &lt;
        </button>
        <div className="carousel-dots">
          {images.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => {
                resetTimeout();
                setCurrentIndex(index);
              }}
            ></span>
          ))}
        </div>
        <button onClick={goToNext} className="control-button next-button">
          &gt;
        </button>
      </div>
    </div>
  );
};

export default MiniCarousel;
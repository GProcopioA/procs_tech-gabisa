import { useState, useEffect } from 'react';

// Importe suas imagens locais aqui
// // Certifique-se de que os caminhos estejam corretos de acordo com a estrutura do seu projeto
import fotoLocal1 from './assets/foto1.jpeg'; // Exemplo: crie esta imagem ou ajuste o caminho
import fotoLocal2 from './assets/foto2.jpeg'; // Exemplo: crie esta imagem ou ajuste o caminho
import fotoLocal3 from './assets/foto3.jpeg'; // Exemplo: crie esta imagem ou ajuste o caminho
import fotoLocal4 from './assets/foto4.jpeg'; // Exemplo: crie esta imagem ou ajuste o caminho

function App() {
  // --- Lógica para o contador de tempo passado (dias, semanas, meses, anos) ---
  const calcularTempoPassado = () => {
    // Definir a data de início (21 de fevereiro de 2025)
    // Atenção: Mês em JavaScript é baseado em 0 (fevereiro é 1)
    const dataInicio = new Date(2025, 1, 21); // Ano, Mês (0-11), Dia
    const dataAtual = new Date();

    const diferencaEmMilissegundos = dataAtual.getTime() - dataInicio.getTime();

    // Calcula os segundos, minutos, horas, e dias totais
    const segundosPassadosTotal = Math.floor(diferencaEmMilissegundos / 1000);
    const minutosPassadasTotal = Math.floor(segundosPassadosTotal / 60);
    const horasPassadasTotal = Math.floor(minutosPassadasTotal / 60);
    const diasPassadosTotal = Math.floor(horasPassadasTotal / 24);

    // Calcula semanas
    const semanasPassadas = Math.floor(diasPassadosTotal / 7);

    // Para anos e meses, é mais preciso "passar" as datas do que usar apenas milissegundos.
    let anos = dataAtual.getFullYear() - dataInicio.getFullYear();
    let meses = dataAtual.getMonth() - dataInicio.getMonth();
    let dias = dataAtual.getDate() - dataInicio.getDate();

    // Ajusta se o dia do mês atual é anterior ao dia do mês inicial
    if (dias < 0) {
      meses--; // Diminui um mês
      // Calcula quantos dias completos há no mês anterior à data atual
      const dataMesAnterior = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), 0);
      dias += dataMesAnterior.getDate(); // Adiciona os dias do mês anterior
    }

    // Ajusta se o mês atual é anterior ao mês inicial
    if (meses < 0) {
      anos--; // Diminui um ano
      meses += 12; // Adiciona 12 meses
    }

    return {
      segundos: segundosPassadosTotal,
      minutos: minutosPassadasTotal,
      horas: horasPassadasTotal,
      dias: diasPassadosTotal, // Total de dias corridos
      semanas: semanasPassadas,
      anos: anos,
      meses: meses,
    };
  };

  // Usar useState para armazenar os tempos passados
  const [tempoPassado, setTempoPassado] = useState(calcularTempoPassado());

  // --- Usando useEffect para atualizar o contador a cada segundo ---
  useEffect(() => {
    // Configura um temporizador para atualizar o contador a cada segundo
    const intervalId = setInterval(() => {
      setTempoPassado(calcularTempoPassado()); // Atualiza o contador
    }, 1000); // A cada 1000 milissegundos (1 segundo)

    // Limpa o intervalo quando o componente é desmontado para evitar vazamentos de memória
    return () => clearInterval(intervalId);
  }, []); // O array de dependências vazio faz com que o useEffect seja executado apenas uma vez ao montar o componente

  // Função para formatar números com separador de milhar
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('pt-BR').format(num);
  };

  // // --- Lógica para o Carrossel de Fotos ---
  // // Array de URLs de imagens agora usa as imagens locais importadas
  const images = [
    fotoLocal1,
    fotoLocal2,
    fotoLocal3,
    fotoLocal4,
    // Adicione mais fotos locais aqui
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Função para ir para a próxima imagem
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Função para ir para a imagem anterior
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // Efeito para auto-play do carrossel (opcional)
  useEffect(() => {
    const carouselInterval = setInterval(nextImage, 5000); // Troca de imagem a cada 5 segundos

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(carouselInterval);
  }, [currentImageIndex]); // Adiciona currentImageIndex como dependência para reiniciar o timer a cada troca

  return (
    // Não inclua o script do Tailwind CSS diretamente no JSX de um componente React.
    // Ele deve ser configurado no seu `index.html` ou através do processo de build do seu projeto (e.g., com Create React App, Vite).
    // Removendo: <script src="https://cdn.tailwindcss.com"></script>
    <>
      <div>
        <h1>
          Contador de Tempo e Momentos
        </h1>


        {/* Exibindo o contador de tempo passado */}
        <div>
          <h1>
            21/02/2025
          </h1>
          <br />
          <span> <strong>{formatNumber(tempoPassado.anos)}</strong></span> Anos,
          <span> <strong>{formatNumber(tempoPassado.meses)}</strong></span> Meses,
          <span> <strong>{formatNumber(tempoPassado.semanas)}</strong></span> Semanas,
          <span> <strong>{formatNumber(tempoPassado.dias)}</strong></span> Dias
          <br />
          <span> <strong>{formatNumber(tempoPassado.horas)}</strong></span> Horas,
          <span> <strong>{formatNumber(tempoPassado.minutos)}</strong></span> Minutos
          <br />
          <span> <strong>{formatNumber(tempoPassado.segundos)}</strong></span> Segundos.
          <p>
            (Total de dias: <strong>{formatNumber(tempoPassado.dias)}</strong>)
          </p>
          <p>
            (Total de semanas: <strong>{formatNumber(tempoPassado.semanas)}</strong>)
          </p>
        </div>
      </div>
      {/* Carrossel de Fotos */}
      <div className="relative w-11/12 mx-auto max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl
                      mb-6 sm:mb-8 bg-white p-3 sm:p-4 rounded-lg shadow-xl overflow-hidden
                      flex items-center justify-center min-h-[250px] sm:min-h-[350px] md:min-h-[450px]"> {/* Adicionado mx-auto para centralizar */}
        <button
          onClick={prevImage}
          className="absolute left-2 p-2 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 z-10 transition-all duration-300 transform hover:scale-105
                     sm:p-3 sm:left-4"
          aria-label="Previous image"
        >
          &lt;
        </button>
        <img
          src={images[currentImageIndex]}
          alt={`Imagem ${currentImageIndex + 1}`}
          className="w-full h-full object-cover rounded-lg transform transition-transform duration-500 ease-in-out scale-100 hover:scale-105" />
        <button
          onClick={nextImage}
          className="absolute right-2 p-2 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 z-10 transition-all duration-300 transform hover:scale-105
                     sm:p-3 sm:right-4"
          aria-label="Next image"
        >
          &gt;
        </button>
        <div className="absolute bottom-4 flex space-x-2 sm:space-x-2.5">
          {images.map((_, index) => (
            <span
              key={index}
              className={`block w-3 h-3 sm:w-2.5 sm:h-2.5 rounded-full ${currentImageIndex === index ? 'bg-blue-600' : 'bg-gray-300'} cursor-pointer transition-colors duration-300`}
              onClick={() => setCurrentImageIndex(index)}
              aria-label={`Go to image ${index + 1}`}
            ></span>
          ))}
        </div>
      </div>
    </>
        );
}

export default App;
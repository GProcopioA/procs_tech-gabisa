import { useState, useEffect } from 'react';

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

  return (
    // Carrega o script do Tailwind CSS para estilização
    <>
      // Carrega o script do Tailwind CSS para estilização
      <script src="https://cdn.tailwindcss.com"></script><div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 font-inter">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 rounded-lg p-2 shadow-md bg-gradient-to-r from-blue-400 to-purple-500 text-white">
          Contador de Tempo
        </h1>

        {/* Exibindo o contador de tempo passado */}
        <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-lg w-full">
          <p className="text-xl text-gray-700 mb-4">
            Tempo passado desde 21/02/2025:
            <br />
            <span className="font-semibold text-blue-600">{formatNumber(tempoPassado.anos)}</span> anos,
            <span className="font-semibold text-blue-600"> {formatNumber(tempoPassado.meses)}</span> meses,
            <span className="font-semibold text-blue-600"> {formatNumber(tempoPassado.semanas)}</span> semanas,
            <span className="font-semibold text-blue-600"> {formatNumber(tempoPassado.dias)}</span> dias,
            <span className="font-semibold text-blue-600"> {formatNumber(tempoPassado.horas)}</span> horas,
            <span className="font-semibold text-blue-600"> {formatNumber(tempoPassado.minutos)}</span> minutos,
            <span className="font-semibold text-blue-600"> {formatNumber(tempoPassado.segundos)}</span> segundos.
          </p>
          <p className="text-lg text-gray-600 mt-2">
            (Total de dias: <strong className="text-purple-600">{formatNumber(tempoPassado.dias)}</strong>)
          </p>
          <p className="text-lg text-gray-600">
            (Total de semanas: <strong className="text-purple-600">{formatNumber(tempoPassado.semanas)}</strong>)
          </p>
        </div>

        <p className="text-gray-500 text-sm mt-8">
          Feito com React e Tailwind CSS
        </p>
      </div></>
  );
}

export default App;

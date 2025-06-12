import { useState, useEffect } from 'react';
import './App.css'
import BouncingLetter from './BouncingLetter.tsx';

function App() {
  const text = "Gabriel & Isabella";
  const textData = "21/02/2025";
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
    <>
      <div>
        <h2 className="texto-detalhado1">
          Contador de Tempo
        </h2>
      <div className="App">
      <h1 className="App-header">
        {text.split('').map((char, index) => (
          <BouncingLetter key={index} letter={char} />
        ))}
      </h1>
    </div>
      <div className="App">
      <h1 className="App-header">
        {textData.split('.').map((char, index) => (
          <BouncingLetter key={index} letter={char} />
        ))}
      </h1>
    </div>
        {/* <h1 className="texto-detalhado">
          Gabriel & Isabella
        </h1> */}


        {/* Exibindo o contador de tempo passado */}
        <div className="texto-detalhado">
          {/* <h2 className="texto-detalhado">
            21/02/2025
          </h2> */}
          <span> <strong>{formatNumber(tempoPassado.anos)}</strong></span> Anos,
          <span> <strong>{formatNumber(tempoPassado.meses)}</strong></span> Meses,
          <span> <strong>{formatNumber(tempoPassado.semanas)}</strong></span> Semanas,
          <span> <strong>{formatNumber(tempoPassado.dias)}</strong></span> Dias
          <br />
          <span> <strong>{formatNumber(tempoPassado.horas)}</strong></span> Horas,
          <span> <strong>{formatNumber(tempoPassado.minutos)}</strong></span> Minutos
          <br />
          <span> <strong>{formatNumber(tempoPassado.segundos)}</strong></span> Segundos.
        </div>
      </div>
    </>
        );
}

export default App;

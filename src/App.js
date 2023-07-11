import './App.css';

import { useState } from 'react'

function App() {

  const [desempenho, setdesempenho] = useState(0.0)
  const [precoLitro, setprecoLitro] = useState(0.0)
  const [valorCorrida, setvalorCorrida] = useState(0.0)
  const [quilometragem, setquilometragem] = useState(0.0)
  const [resultado, setResultado] = useState(0.0)
  const [statusCalculo, setstatusCalculo] = useState(false)
  const [houveLucro, sethouveLucro] = useState(false)

  const calcularResultado = () => {
    const gastos = (quilometragem / desempenho) * precoLitro
    const valor = valorCorrida - gastos
    const prejuizo = 2 * gastos - valorCorrida
    const naoHouvePrejuizo = prejuizo < 0

    if (naoHouvePrejuizo) {
      setResultado(valor)
      sethouveLucro(true)
    } else {
      sethouveLucro(false)
      setResultado(prejuizo)
    }
    setstatusCalculo(true)
  }

  const atualizaStatusCalculo = () => {
    setstatusCalculo(false)
  }

  const exibirResultado = () => {
    let className = 'resultado-texto'

    if (houveLucro) {
      className += ' lucro'
    } else {
      className += ' prejuizo'
    }

    return <h1 className={className}>Você teve um {houveLucro ? 'lucro' : 'prejuizo'} de: R$ {Math.abs(resultado.toFixed(2))}</h1>
  }

  return (
    <div className="App">
      <div className="header">Uber fácil $</div>

      <div > <p className="paragrafo-top">A forma mais rápida de calcular seus lucros</p></div>

      <div className="form-style">
        <form>
          <div className="label-style">
            <label htmlFor="desempenho">Desempenho (km/l):</label>
            <input className="input-style" type="number" id="desempenho" onChange={event => setdesempenho(Number(event.target.value))} />
          </div>

          <div className="label-style">
            <label htmlFor="preco-litro">Preço por litro (combustível):</label>
            <input className="input-style" type="number" id="preco-litro" onChange={event => setprecoLitro(Number(event.target.value))} />
          </div>

          <div className="label-style">
            <label htmlFor="valor-corrida">Valor da corrida:</label>
            <input className="input-style" type="number" id="valor-corrida" onChange={event => setvalorCorrida(Number(event.target.value))} />
          </div>

          <div className="label-style">
            <label htmlFor="quilometragem">Quilometragem:</label>
            <input className="input-style" type="number" id="quilometragem" onChange={event => setquilometragem(Number(event.target.value))} />
          </div>
        </form>
      </div>

      {
        statusCalculo ?
          <div className="resultado-box">
            {exibirResultado()}
          </div>
          :
          <div className="div-botao">
            <button className="botao-style" onClick={calcularResultado}>
              Calcular
            </button>
          </div>
      }

      {
        statusCalculo ?
          <div className="div-botao">
            <button className="botao-style" onClick={atualizaStatusCalculo}>
              Voltar
            </button>
          </div>
          :
          <div ></div>
      }

      <div className="espacamento"></div>

    </div>
  );
}

export default App;

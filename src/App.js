import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [saldoZona1, setSaldoZona1] = useState(0);
  const [saldoZona2, setSaldoZona2] = useState(0);
  const [apuesta, setApuesta] = useState(0);
  const [saldoInter, setSaldoInter] = useState(0);
  const [historial, setHistorial] = useState([]);

  const calcularComision = (apuesta) => {
    if (apuesta >= 10 && apuesta <= 14) return 3;
    if (apuesta >= 15 && apuesta <= 19) return 4;
    if (apuesta >= 20 && apuesta <= 25) return 5;
    if (apuesta >= 26 && apuesta <= 30) return 6;
    if (apuesta >= 31 && apuesta <= 35) return 7;
    if (apuesta >= 36 && apuesta <= 40) return 8;
    if (apuesta >= 41 && apuesta <= 49) return 9;
    if (apuesta >= 50 && apuesta <= 99) return 10;
    if (apuesta >= 100 && apuesta <= 149) return 20;
    if (apuesta >= 150 && apuesta <= 499) return 30;
    return 0;
  };

  const manejarVictoria = (ganador) => {
    if (apuesta <= 0 || saldoZona1 < apuesta || saldoZona2 < apuesta) return;

    const comision = calcularComision(apuesta);
    const saldoGanador = ganador === "zona1" ? saldoZona1 + (apuesta - comision) : saldoZona2 + (apuesta - comision);
    const saldoPerdedor = ganador === "zona1" ? saldoZona2 - apuesta : saldoZona1 - apuesta;
    
    setSaldoZona1(ganador === "zona1" ? saldoGanador : saldoPerdedor);
    setSaldoZona2(ganador === "zona2" ? saldoGanador : saldoPerdedor);
    setSaldoInter(saldoInter + comision);
    
    setHistorial([...historial, { ganador, apuesta, comision }]);
  };

  const resetearTodo = () => {
    setSaldoZona1(0);
    setSaldoZona2(0);
    setApuesta(0);
    setSaldoInter(0);
    setHistorial([]);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Gestión de Apuestas</h2>

      <div className="row mt-4">
        <div className="col-md-4">
          <label className="form-label">Saldo Zona 1</label>
          <input
            type="number"
            className="form-control"
            value={saldoZona1}
            onChange={(e) => setSaldoZona1(Number(e.target.value))}
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">Apuesta Partida</label>
          <input
            type="number"
            className="form-control"
            value={apuesta}
            onChange={(e) => setApuesta(Number(e.target.value))}
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">Saldo Zona 2</label>
          <input
            type="number"
            className="form-control"
            value={saldoZona2}
            onChange={(e) => setSaldoZona2(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="mt-4 text-center">
        <button className="btn btn-success me-3" onClick={() => manejarVictoria("zona1")}>
          Gano Zona 1
        </button>
        <button className="btn btn-danger" onClick={() => manejarVictoria("zona2")}>
          Gano Zona 2
        </button>
      </div>

      <div className="mt-4">
        <h4>Saldo del Intermediario: {saldoInter} créditos</h4>
      </div>

      <div className="mt-4">
        <h4>Historial de Partidas</h4>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Ganador</th>
              <th>Apuesta</th>
              <th>Comisión</th>
            </tr>
          </thead>
          <tbody>
            {historial.map((partida, index) => (
              <tr key={index}>
                <td>{partida.ganador === "zona1" ? "Zona 1" : "Zona 2"}</td>
                <td>{partida.apuesta}</td>
                <td>{partida.comision}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-center">
        <button className="btn btn-warning" onClick={resetearTodo}>
          Resetear Todo
        </button>
      </div>
    </div>
  );
};

export default App;

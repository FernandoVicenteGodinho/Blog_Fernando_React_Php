import React, { useState } from 'react';
import { generateAIResponse } from '../../service/ia';

const Sudoku = () => {
  const [grid, setGrid] = useState(Array(9).fill(Array(9).fill('')));
  const [resolvido, setResolvido] = useState([]);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [selectedNumber, setSelectedNumber] = useState<string | null>(null);
  const [start, setStart] = useState(false);
  const [outputText, setOutputText] = useState('');

  const handleGenerate = async (text: string) => {
    try {
      const inputText = `Gere um sudoku do nivel ${text}`;

      const response = await generateAIResponse(inputText);
      console.log(response.replace(/```json|```/g, '').trim());
      const { resolvido, jogo } = extractGrids(response);

      setResolvido(resolvido);
      setGrid(jogo);
      setOutputText(response);
    } catch (error) {
      setOutputText('Error generating response.');
    } finally {
      setStart(true);
    }
  };
  const extractGrids = (apiResponse) => {
    const jsonString = apiResponse.replace(/```json|```/g, '').trim();
    const parsedData = JSON.parse(jsonString);
    console.log(parsedData.resolvido, parsedData.jogo);
    return {
      resolvido: parsedData.resolvido,
      jogo: parsedData.jogo,
    };
  };

  const handleCellClick = (row: number, col: number) => {
    setSelectedCell({ row, col });
    const number = grid[row][col];
    if (number !== '') {
      setSelectedNumber(number);
    } else {
      setSelectedNumber(null);
    }
  };

  const handleNumberClick = (num: number | '') => {
    if (selectedCell) {
      const newGrid = grid.map((row, rowIndex) => row.map((cell, colIndex) => (rowIndex === selectedCell.row && colIndex === selectedCell.col ? num.toString() : cell)));
      setSelectedNumber(num.toString());
      setGrid(newGrid);
    }
  };

  const fillGrid = (inputGrid: string[][]) => {
    setGrid(inputGrid);
  };

  const getGrid = () => {
    return grid;
  };

  return (
    <div className="flex flex-col items-center">
      <div className="pt-5">
        <h2 className="text-center my-5 text-2xl md:text-5xl font-bold">Sudoku</h2>
        <p className="text-center text-white brightness-50 my-5 text-mb md:text-lg">Utilize a inteligência artificial para jogar</p>
      </div>
      {start && (
        <>
          <div className="grid grid-cols-9 gap-1">
            {grid.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`border w-10 h-10 flex items-center justify-center cursor-pointer ${(rowIndex + 1) % 3 === 0 && rowIndex !== 8 ? 'border-b-2' : ''} ${
                    (colIndex + 1) % 3 === 0 && colIndex !== 8 ? 'border-r-2' : ''
                  }`}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  style={{
                    backgroundColor: selectedCell?.row === rowIndex && selectedCell?.col === colIndex ? 'lightblue' : 'white',
                    color: selectedNumber && cell === selectedNumber ? 'red' : 'black',
                  }}
                >
                  {cell}
                </div>
              ))
            )}
          </div>
          <div className="flex justify-center mt-5">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, ''].map((num) => (
              <button key={num} className="border border-gray-400 w-10 h-10 flex items-center justify-center mx-1" onClick={() => handleNumberClick(num)}>
                {num}
              </button>
            ))}
          </div>
        </>
      )}
      {!start && (
        <div className="flex flex-row justify-center items-center gap-5">
          <button className="btn btn-info " onClick={() => handleGenerate('Iniciante')}>
            Iniciante
          </button>
          <button className="btn btn-info " onClick={() => handleGenerate('Intermediário')}>
            Intermediário
          </button>
          <button className="btn btn-info " onClick={() => handleGenerate('Difícil')}>
            Difícil
          </button>
          <button className="btn btn-info " onClick={() => handleGenerate('Especialista')}>
            Especialista
          </button>
        </div>
      )}
    </div>
  );
};

export default Sudoku;

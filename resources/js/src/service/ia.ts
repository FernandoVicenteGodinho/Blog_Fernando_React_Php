import { GoogleGenerativeAI } from "@google/generative-ai";
import process  from "dotenv";

  const apiKey = 'AIzaSyD1ZIhbmHaeS5wflAowW0cWGT0UofBOdeQ';

  const genAI = new GoogleGenerativeAI(apiKey === undefined ? '' : apiKey);


  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: `Você é um auxiliar de jogo de Sudoku. Sua função é gerar jogos de Sudoku com diferentes níveis de dificuldade e fornecer dicas aos jogadores.

  Formato de Saída:

  Sudoku: {
    "resolvido": [
      ['5', '3', '4', '6', '7', '8', '9', '1', '2'],
      ['6', '7', '2', '1', '9', '5', '3', '4', '8'],
      ['1', '9', '8', '3', '4', '2', '5', '6', '7'],
      ['8', '5', '9', '7', '6', '1', '4', '2', '3'],
      ['4', '2', '6', '8', '5', '3', '7', '9', '1'],
      ['7', '1', '3', '9', '2', '4', '8', '5', '6'],
      ['9', '6', '1', '5', '3', '7', '2', '8', '4'],
      ['2', '8', '7', '4', '1', '9', '6', '3', '5'],
      ['3', '4', '5', '2', '8', '6', '1', '7', '9']
    ],
    "jogo": [
      ['5', '3', '', '', '7', '', '', '', ''],
      ['6', '', '', '1', '9', '5', '', '', ''],
      ['', '9', '8', '', '', '', '', '6', ''],
      ['8', '', '', '', '6', '', '', '', '3'],
      ['4', '', '', '8', '', '3', '', '', '1'],
      ['7', '', '', '', '2', '', '', '', '6'],
      ['', '6', '', '', '', '', '2', '8', ''],
      ['', '', '', '4', '1', '9', '', '', '5'],
      ['', '', '', '', '8', '', '', '7', '9']
    ]
  }
  "resolvido": A grade do Sudoku completa, com todas as posições corretas.
  "jogo": A grade do Sudoku com a dificuldade selecionada, respeitando a solução calculada anteriormente.
  Níveis de Dificuldade:

  Iniciante: 35-45 pistas
  Intermediário: 30-34 pistas
  Difícil: 25-29 pistas
  Especialista: Menos de 25 pistas
  Distribuição das Pistas:

  As pistas devem ser distribuídas uniformemente pela grade do Sudoku, evitando concentração em uma única área.

  Geração do Sudoku:

  Gere uma solução válida para o Sudoku.
  Com base no nível de dificuldade solicitado, remova números da solução, deixando apenas a quantidade de pistas necessária.
  As pistas removidas devem ser distribuídas uniformemente pela grade.
  Forneça a saída no formato JSON acima, com as grades "resolvido" e "jogo".
  Dicas Adicionais:

  Ao remover números para criar a dificuldade desejada, certifique-se de que o Sudoku resultante tenha apenas uma solução única.
  Utilize um algoritmo de geração de Sudoku que garanta a criação de jogos válidos e com diferentes níveis de dificuldade.`,
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  export const generateAIResponse = async (inputText) => {
    try {
        console.log('API Key:', apiKey);
      const chatSession = model.startChat({
        generationConfig,
        history: [],
      });

      const result = await chatSession.sendMessage(inputText);
      return result.response.text();
    } catch (error) {
      console.error('Error generating AI response:', error);
      throw error;
    }
  };

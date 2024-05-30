import React, { useState } from 'react';
import './App.css'

const quiz = [
    "Este jogador de basquete nasceu em Nova York, EUA",
    "Durante sua carreira, ele ganhou seis campeonatos da NBA e foi nomeado MVP das finais seis vezes.",
    "Ele é conhecido por sua carreira brilhante na NBA, onde jogou principalmente pelo Chicago Bulls.",
    "Seu número icônico, 23, é amplamente reconhecido e associado ao seu legado no esporte.",
    "Ele também jogou uma temporada de beisebol profissional durante um intervalo em sua carreira no basquete.",
    "Fora das quadras, ele é famoso por sua marca de calçados e roupas, que é extremamente popular em todo o mundo.",
  ];

function QuizGame() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userGuess, setUserGuess] = useState('');
    const [feedback, setFeedback] = useState('');
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const [attempts, setAttempts] = useState([]);
    const correctAnswer = 'Fred';
    const maxQuestions = quiz.length;

    const handleGuess = () => {
        if (userGuess.trim() === '') {
            return;
        }
        if (userGuess.trim().toLowerCase() === correctAnswer.toLowerCase()) {
            setFeedback('Parabéns! Você acertou!');
            setGameWon(true);
            setGameOver(true);
            setAttempts([...attempts, '🟩']);
        } else {
            if (currentQuestion < maxQuestions - 1) {
                setFeedback('Resposta incorreta. Tente novamente.');
                setCurrentQuestion(currentQuestion + 1);
                setAttempts([...attempts, '🟥']);
            } else {
                setFeedback('Você errou todas as perguntas. O jogo acabou.');
                setGameOver(true);
                setAttempts([...attempts, '🟥']);
            }
        }
        setUserGuess('');
    };

    const skipQuestion = () => {
        if (currentQuestion < maxQuestions - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setAttempts([...attempts, '⬛']);
        }
    }

    const handleRestart = () => {
        setCurrentQuestion(0);
        setUserGuess('');
        setFeedback('');
        setGameOver(false);
        setGameWon(false);
        setAttempts([]);
    };

    const renderShareButton = () => {
        const squares = [...attempts, ...Array(maxQuestions - attempts.length).fill('⬜')];
        const address = window.location.href;

        const shareText = `${squares.join('')}\nJogue voce também em ${address}!`;

        return (
            <button
                onClick={() => {
                    if (navigator.share) {
                        navigator.share({
                            title: '🎩 Craque do Dia 🎩',
                            text: shareText,
                        }).catch(console.error);
                    } else {
                        alert('Seu dispositivo não suporta o compartilhamento via Web.');
                    }
                }}
            >
                Compartilhar
            </button>
        );
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>🎩 Craque do Dia 🎩</h1>
            {gameOver ? (
                <div>
                    <p>{feedback}</p>
                    {renderShareButton()}
                    <button onClick={handleRestart}>Recomeçar Jogo</button>
                </div>
            ) : (
                <form>
                    <ul className='tips'>
                    {quiz.slice(0, currentQuestion + 1).map((question, index) => (
                        <li className="tip" key={index}>
                            {question}
                        </li>
                    ))}
                    </ul>
                    <div className='controls'>
                        <button type='button' onClick={skipQuestion}>Pular</button>
                        <input
                            type="text"
                            value={userGuess}
                            onChange={(e) => setUserGuess(e.target.value)}
                            placeholder="Digite seu palpite"
                        />
                        <button type='button' onClick={handleGuess}>Enviar</button>
                        <p>{feedback}</p>
                    </div>
                </form>
            )}
        </div>
    );
}

export default QuizGame;

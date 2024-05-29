import React, { useState } from 'react';
import './App.css'

const quizFred = [
    "Este jogador começou sua carreira profissional no América Mineiro antes de se transferir para um clube maior na Europa. Quem é ele?",
    "Ele jogou na Ligue 1, na França, pelo Lyon, onde conquistou múltiplos títulos nacionais. Quem é este jogador?",
    "Depois de voltar ao Brasil, ele se tornou um dos maiores ídolos de um clube carioca, onde teve uma carreira prolífica como atacante. Quem é esse jogador?",
    "Ele foi artilheiro do Campeonato Brasileiro Série A em 2012, ajudando seu time a ganhar o título naquele ano. Quem é ele?",
    "Ele foi o artilheiro da Copa das Confederações da FIFA em 2013, ajudando o Brasil a vencer o torneio. Quem é ele?",
    "Ele é o segundo maior artilheiro da história do Fluminense em jogos oficiais, com mais de 180 gols pelo clube. Quem é esse jogador?"
];

function QuizGame() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userGuess, setUserGuess] = useState('');
    const [feedback, setFeedback] = useState('');
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const correctAnswer = 'Fred';
    const maxQuestions = quizFred.length;

    const handleGuess = () => {
        if (userGuess.trim().toLowerCase() === correctAnswer.toLowerCase()) {
            setFeedback('Parabéns! Você acertou!');
            setGameWon(true);
            setGameOver(true);
        } else {
            if (currentQuestion < maxQuestions - 1) {
                setFeedback('Resposta incorreta. Tente novamente.');
                setCurrentQuestion(currentQuestion + 1);
            } else {
                setFeedback('Você errou todas as perguntas. O jogo acabou.');
                setGameOver(true);
            }
        }
        setUserGuess('');
    };

    const handleRestart = () => {
        setCurrentQuestion(0);
        setUserGuess('');
        setFeedback('');
        setGameOver(false);
        setGameWon(false);
    };

    const renderShareButton = () => {
        const attempts = currentQuestion + 1;
        const squares = Array(maxQuestions).fill('⬜');
        for (let i = 0; i < attempts - 1; i++) {
            squares[i] = '⬛';
        }
        squares[attempts - 1] = '🟩';

        const address = window.location.href;
        const shareText = `🎩 Craque do Dia 🎩\n${squares.join('')}.\nJogue voce também em ${address}!`;

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
                    {gameWon && renderShareButton()}
                    <button onClick={handleRestart}>Recomeçar Jogo</button>
                </div>
            ) : (
                <div>
                    {quizFred.slice(0, currentQuestion + 1).map((question, index) => (
                        <p key={index}>{question}</p>
                    ))}
                    <input
                        type="text"
                        value={userGuess}
                        onChange={(e) => setUserGuess(e.target.value)}
                        placeholder="Digite seu palpite"
                    />
                    <button onClick={handleGuess}>Enviar</button>
                    <p>{feedback}</p>
                </div>
            )}
        </div>
    );
}

export default QuizGame;

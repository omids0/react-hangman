import React, { useState, useEffect } from 'react'
import Hangman from './Hangman'
import '../style/style.css'

const HangmanApp = () => {
    //states
    const [playable, setPlayable] = useState(true)
    const [word, setWord] = useState('')
    const [query, setQuery] = useState(true)
    const [correctGuesses, setCorrectGuess] = useState([])
    const [wrongGuesses, setWrongGuesses] = useState([])
    const [count, setCount] = useState('')
    const [level, setLevel] = useState('1')

    //useEffects
    useEffect(() => {
        getWord()
        setCorrectGuess([])
        setWrongGuesses([])
        setPlayable(true)
        if (window.innerWidth < 800) {
            alert('Opss: This app just works on PC and Desktops!')
        }
    }, [query])

    useEffect(() => {
        !playable && setWord('')
    }, [playable])

    useEffect(() => {
        if(wrongGuesses.length === opportunity && word) {
            setPlayable(false)
        }
        // opportunity === wrongGuesses.length && setPlayable(false)
    }, [correctGuesses, wrongGuesses])

    useEffect(() => {
        const handleKeyDown = event => {
            const { key, keyCode } = event
            if (playable && keyCode >= 65 && keyCode <= 90) {
                const letter = key.toLowerCase();

                if (word.includes(letter)) {
                    if (!correctGuesses.includes(letter)) {
                        setCorrectGuess(correctGuesses => [...correctGuesses, letter])
                    }
                } else {
                    if (!wrongGuesses.includes(letter)) {
                        setWrongGuesses(wrongGuesses => [...wrongGuesses, letter])
                    }
                }
            }
        }
        window.addEventListener('keydown', handleKeyDown)

        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [correctGuesses, wrongGuesses, playable])

    // fetch
    const getWord = async () => {
        const response = await fetch(`//puzzle.mead.io/puzzle?wordCount=${level}`)

        if (response.status === 200) {
            const data = await response.json()
            const puzzle = data.puzzle.toLowerCase()
            setWord(puzzle)
            setCount(data.puzzle.length)
        } else {
            throw new Error('Unable to fetch puzzle')
        }
    }

    //functions
    const changeLevel = (e) => {
        setLevel(e.target.value)
        setQuery(!query)
    }

    
    const parseLevel = parseInt(level)
    const opportunity = Math.floor(count/parseLevel)

    //check-if-pushed-all-the-correct-words
    const splitWord = word.split('')
    const uniqWord = [...new Set(splitWord)]

    const wonStatus = level === '1' ? 0 : 1

    //cheat
    document.title = `Cheat: (${uniqWord})`

    return (
        <div className='contianer'>
            <h1 className='header'>Hangman Game</h1>
            <div className='status'>
                {<p className='opportunity'>Your Opportunity: {wrongGuesses.length} / {opportunity}</p>}
                {correctGuesses.length + wonStatus === uniqWord.length && <h2 className='won'>You Won!</h2>}
                {!playable && <h2 className='game-over'>Game Over!</h2>}
            </div>
            <Hangman correctGuesses={correctGuesses} word={word} />
            <div className='handel-game'>
                <button className='new-game' onClick={() => setQuery(!query)}>New Game</button>
                <select className='game-level' onChange={changeLevel}>
                    <option value='1'>Easy</option>
                    <option value='2'>Avreage</option>
                    <option value='3'>Difficult</option>
                    <option value='4'>Most Difficult</option>
                </select>
            </div>

        </div>
    )
}

export default HangmanApp
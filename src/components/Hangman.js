import React from 'react'

const Hangman = ({ correctGuesses, word }) => {
    return (
        <div className='puzzle'>
            {word.toString().split('').map((letter, i) => {
                return (
                    <p key={i}>{correctGuesses.includes(letter) || letter === ' ' ? letter : '*'}</p>
                )
            })}
        </div>
    )
}

export default Hangman

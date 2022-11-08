import { Textfit } from 'react-textfit';
import style from '@/styles/Word.module.scss';
import { GameContext, GameStatus, GameActionType } from '@/contexts/GameContext';
import React, { useContext, useEffect } from 'react';

const Word = (): JSX.Element => {

    const { state: { countryName, keysPressed, status }, dispatch } = useContext(GameContext);

    const getCharacterToRender:(char:string) => JSX.Element = (char) => {
        if (keysPressed.includes(char)) return <>{ char }</>;
        else if (status === GameStatus.LOST) return <span className={style.error}>{char}</span>
        else return <>-</>;
    }

    const getWordToRender:(word:string) => JSX.Element = (word) => {
        return (
            <>
                <span className={style.word}>
                    { word.split('').map((char, index) => (
                        <React.Fragment key={index}>{ getCharacterToRender(char) }</React.Fragment>
                    )) }
                </span>
                { ' ' }
            </>
        );
    }

    const wordToDisplay = countryName.split(' ').map(((word, index) => (
        <React.Fragment key={index}>{ getWordToRender(word.toLowerCase()) }</React.Fragment>
    )));

    return (
        <div className={style.Word}>
            <Textfit mode='multi' style={{height: '100px'}}>
            { wordToDisplay }
            </Textfit>
        </div>
    );
}

export default Word;
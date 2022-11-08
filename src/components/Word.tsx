import { Textfit } from 'react-textfit';
import style from '@/styles/Word.module.scss';
import { GameContext } from '@/contexts/GameContext';
import { useContext } from 'react';

const Word = (): JSX.Element => {

    const { state: { countryName, keysPressed } } = useContext(GameContext);

    const word:string = countryName
                         .split('')
                         .map((char:string) => 
                                keysPressed
                                 .toLowerCase()
                                 .includes(char.toLowerCase()) || char === ' ' ? char.toLowerCase() : '-'
                            )
                         .join('');

    return (
        <div className={style.Word}>
            <Textfit mode='multi' style={{height: '100px'}}>
            { word }
            </Textfit>
        </div>
    );
}

export default Word;
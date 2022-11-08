import { GameContext } from '@/contexts/GameContext';
import style from '@/styles/Hangman.module.scss';
import { useContext } from 'react';

const Hangman = (): JSX.Element => {

    const { state: { wrongInputCount } } = useContext(GameContext);

    return (
        <div className={style.Hangman}>
            <div className={style.hanger}>
                <div className={style.base}></div>
                <div className={style.pole}></div>
                <div className={style.cliff}></div>
                <div className={style.rope}></div>
                <div className={style.joint}></div>
            </div>

            <div className={style.man}>
                { wrongInputCount >= 1 && <div className={style.head}></div> }
                { wrongInputCount >= 2 && <div className={style.body}></div> }
                { wrongInputCount >= 3 && <div className={`${style.leg} ${style.left}`}></div> }
                { wrongInputCount >= 4 && <div className={`${style.leg} ${style.right}`}></div> }
                { wrongInputCount >= 5 && <div className={`${style.hand} ${style.left}`}></div> }
                { wrongInputCount >= 6 && <div className={`${style.hand} ${style.right}`}></div> }
            </div>
        </div>
    );
}

export default Hangman;
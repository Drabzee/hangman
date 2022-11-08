import { GameActionType, GameContext } from '@/contexts/GameContext';
import style from '@/styles/Keyboard.module.scss';
import { MouseEventHandler, useContext, useEffect } from 'react';

const Keyboard = (): JSX.Element => {

    const { state: { keysPressed }, dispatch } = useContext(GameContext);

    const alphabets:string = 'abcdefghijklmnopqrstuvwxyz';

    const handleKeyPressed = (key:string) => {
        if(keysPressed.includes(key)) return;
        dispatch({type: GameActionType.KEYPRESSED, payload: key});
    }

    const handleKeyboardClickEvent = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        const target:HTMLElement = e.target as HTMLElement;
        if(target.classList.contains(style.char)) {
            const key = target.innerText.toLowerCase();
            handleKeyPressed(key);
        };
    }

    useEffect(() => {
        const keyPressHandler = (e: KeyboardEvent) => {
            const keyPressed = e.key.toLowerCase();
            if(keyPressed.length === 1 && keyPressed >= 'a' && keysPressed <= 'z') {
                handleKeyPressed(keyPressed);
            }
        }

        document.addEventListener('keyup', keyPressHandler);

        return () => document.removeEventListener('keyup', keyPressHandler);
    }, [keysPressed]);

    return (
        <div onClick={handleKeyboardClickEvent} className={style.Keyboard}>
            { alphabets.split('').map((char:string, index:number) => (
                <div key={index} className={`${style.char} ${keysPressed.includes(char) ? style.disabled : ''}`}>
                    { char }
                </div>
            )) }
        </div>
    );
}

export default Keyboard;
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import initialCardsState from '../data/cards';

type CardType = {
  id: number;
  wasDiscovered: boolean;
  isTurned: boolean;
  frontImage: string;
  altImage?: string;
};

type JogoDaMemoriaType = {
  cards: CardType[];
  setCards: Dispatch<SetStateAction<CardType[]>>;
  time: string;
  setTime: Dispatch<SetStateAction<string>>;
  points?: number;
  setPoints?: Dispatch<SetStateAction<number>>;
  numberOfPlays?: number;
  setNumberOfPlays?: Dispatch<SetStateAction<number>>;
  isEndGame?: boolean;
};

export const JogoDaMemoriaContext = createContext({} as JogoDaMemoriaType);

export const JogoDaMemoriaProvider = ({ children }) => {
  const [cards, setCards] = useState(initialCardsState);
  const [points, setPoints] = useState(0);
  const [numberOfPlays, setNumberOfPlays] = useState(0);
  const [isEndGame, setIsEndGame] = useState(false);
  const [time, setTime] = useState('00:00:00');

  // Função que verifica se acertou ou errou a jogada
  // function checkAttempt(intervalCheckAttempt = null) {
  //   const cardsAux = cards.slice();
  //   let selectedCards = [];

  //   cardsAux.map((card) => {
  //     if (card.isTurned && card.wasDiscovered != true) selectedCards.push(card);

  //     if (selectedCards.length === 2) {
  //       if (selectedCards[0]?.frontImage === selectedCards[1]?.frontImage) {
  //         cardsAux.map((card) => {
  //           selectedCards.map((selectedCard) =>
  //             card.frontImage === selectedCard.frontImage
  //               ? (card.wasDiscovered = true)
  //               : null,
  //           );
  //         });
  //         setCards(cardsAux);
  //         selectedCards = [];
  //       } else {
  //         flipAllCardsDown();
  //       }
  //     }
  //   });

  //   intervalCheckAttempt ? clearInterval(intervalCheckAttempt) : null;
  // }

  // // Efeito para contar as pontuações
  // useEffect(() => {
  //   let selectedCards = [];

  //   cards.map((card) => {
  //     if (card.isTurned && card.wasDiscovered != true) selectedCards.push(card);

  //     if (selectedCards.length === 2) {
  //       if (selectedCards[0]?.frontImage === selectedCards[1]?.frontImage) {
  //         setPoints(points + 1);
  //         selectedCards = [];
  //       } else {
  //         setNumberOfErrors(numberOfErrors + 1);
  //       }
  //       setNumberOfPlays(numberOfPlays + 1);
  //     }
  //   });

  //   checkGame();
  // }, [cards]);

  useEffect(() => {
    let saoIguais = false;
    let cartasSelecionadas = cards.filter(
      (card) => card.isTurned === true && card.wasDiscovered === false,
    );

    // Função que vira todas cartas para baixo, exceto as encontradas
    function flipAllCardsDown() {
      const cardsAux = cards.slice();
      cardsAux.map((card) =>
        card.wasDiscovered !== true ? (card.isTurned = false) : null,
      );
    }

    if (cartasSelecionadas.length === 2) {
      if (
        cartasSelecionadas[0].frontImage === cartasSelecionadas[1].frontImage
      ) {
        saoIguais = true;
        setPoints((points) => points + 1);
        cards.map((card) =>
          card.frontImage === cartasSelecionadas[0].frontImage
            ? (card.wasDiscovered = true)
            : null,
        );
        cartasSelecionadas = [];
      } else {
        flipAllCardsDown();
      }
    }

    points === cards.length / 2 ? setIsEndGame(true) : null;
  }, [cards, isEndGame, numberOfPlays, points]);

  return (
    <JogoDaMemoriaContext.Provider
      value={{
        cards,
        setCards,
        time,
        setTime,
        points,
        setPoints,
        numberOfPlays,
        setNumberOfPlays,
        isEndGame,
      }}
    >
      {children}
    </JogoDaMemoriaContext.Provider>
  );
};

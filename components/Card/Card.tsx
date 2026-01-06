import { useJogoDaMemoria } from 'hooks/useJogoDaMemoria';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from './Card.module.css';

type CardProps = {
  id: number;
};

const Card = ({ id }: CardProps) => {
  const { cards, setCards, setNumberOfPlays } = useJogoDaMemoria();
  const [selectedCardId] = useState(id);
  let selectedCard = cards.find((card) => card.id === selectedCardId);

  function handleClick() {
    const cardsAux = cards.slice();
    selectedCard.isTurned = true;
    setNumberOfPlays((prevState) => prevState + 1);
    setCards(cardsAux);
  }

  return (
    <div className={styles.cards}>
      <div
        className={
          selectedCard.isTurned
            ? styles.cardInner
            : [styles.cardInner, styles.isNotTurned].join(' ')
        }
        onClick={handleClick}
      >
        <div className={styles.cardFace}>
          <Image
            src={selectedCard.frontImage}
            alt={selectedCard.altImage}
            width={160}
            height={200}
          />
        </div>
        <div className={[styles.cardFace, styles.cardFaceBack].join(' ')}>
          <Image
            src="/assets/card-images/background.jpg"
            alt="back"
            width={160}
            height={200}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;

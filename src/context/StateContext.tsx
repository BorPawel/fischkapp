import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

interface Card {
  id: number;
  word: string;
  definition: string;
  isEdited: boolean;
}

interface CardContextValue {
  card: Card;
  setCard: Dispatch<SetStateAction<Card>>;
  editCardHandler: (card: Card, e: React.ChangeEvent<HTMLInputElement>) => void;
  newCardHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  cards: Card[];
  addCard: (card: Card) => void;
  removeCard: (id: number) => void;

  updateCard: (card: Card, editSwitch: boolean) => void;

  cardState: string;
  toggleCardState: (state: string) => void;
  innerCardState: string;
  toggleInnerCardState: (state: string) => void;
}

const defaultValue: CardContextValue = {
  card: { id: 0, word: "", definition: "", isEdited: false },
  setCard: () => {},

  editCardHandler: () => {},
  newCardHandler: () => {},
  cards: [],
  addCard: () => {},
  removeCard: () => {},
  updateCard: () => {},

  cardState: "",
  toggleCardState: () => {},

  innerCardState: "",
  toggleInnerCardState: () => {},
};

export const CardContext = createContext(defaultValue);

export default function CardProvider({ children }: { children: ReactNode }) {
  const [card, setCard] = useState<Card>(defaultValue.card);
  const [cards, setCards] = useState<Card[]>(defaultValue.cards);
  const [cardState, setCardState] = useState<string>("");
  const [innerCardState, setInnerCardState] = useState<string>("CARD_WORD");

  const toggleInnerCardState = (state: string) => {
    setInnerCardState(state);
  };

  const addCard = (newCard: Card) => {
    setCards((prev) => [...prev, newCard]);
    setCard({ id: 0, word: "", definition: "", isEdited: false });
    setCardState("CARD_ADDED");
    setInnerCardState("CARD_WORD");
  };

  const newCardHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCard((prev) => {
      return {
        ...prev,
        id: cards.length,
        [e.target.name]: e.target.value,
      };
    });

    
  };
  const editCardHandler = (
    card: Card,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    const existingCardIndex = cards.findIndex((c) => c.id === card.id);

    if (existingCardIndex >= 0) {
      // Card exists, update it
      const updatedCards = [...cards];
      updatedCards[existingCardIndex] = {
        ...updatedCards[existingCardIndex],
        [name]: value,
      };
      setCards(updatedCards);
    }
  };

  const removeCard = (id: number) => {
    setCards((prev) => prev.filter((c) => c.id !== id));
  };

  const updateCard = (card: Card, editSwitch: boolean) => {
    let findCard = cards.find((item) => item.id === card.id);
    let newCard = cards.filter((item) => item.id !== findCard?.id);

    setCards([...newCard, { ...findCard!, isEdited: editSwitch }]);
  };
  const toggleCardState = (state: string) => {
    setCardState(state);
  };

  return (
    <CardContext.Provider
      value={{
        card,
        setCard,
        cards,
        addCard,
        removeCard,
        cardState,
        toggleCardState,
        updateCard,
        editCardHandler,
        newCardHandler,
        innerCardState,
        toggleInnerCardState,
      }}
    >
      {children}
    </CardContext.Provider>
  );
}
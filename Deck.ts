export class Carta {
  constructor(
    readonly nome: string,
    readonly valor: number,
    readonly suit: string
  ) {}

  public toString = (): string => `${this.nome} of ${this.suit}`;
}

function shuffle(array: Array<Carta>) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export class Deck {
  static readonly suits: Array<string> = ["♣", "♥", "♠", "♦"];
  static readonly cards: { [nome: string]: number } = {
    ACE: 11,
    TWO: 2,
    THREE: 3,
    FOUR: 4,
    FIVE: 5,
    SIX: 6,
    SEVEN: 7,
    EIGHT: 8,
    NINE: 9,
    TEN: 10,
    JACK: 10,
    QUEEN: 10,
    KING: 10
  };

  private readonly _deck: Array<Carta>;

  constructor(nDecks: number) {
    this._deck = [];
    for (let i = 0; i < nDecks; i++) {
      for (const suit of Deck.suits) {
        for (const [nomeCarta, valorCarta] of Object.entries(Deck.cards)) {
          this._deck.push(new Carta(nomeCarta, valorCarta, suit));
        }
      }
    }
    shuffle(this._deck);
  }

  public dealCard = (): Carta => this._deck.pop();

  public getCartasIniciais = (): [Carta, Carta] => [
    this._deck.pop(),
    this._deck.pop()
  ];
}

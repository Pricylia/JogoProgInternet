import { Deck, Carta } from "./Deck";

/**
 * Representa as 21 cartas
 */
export class Hand {
  private _deck: Deck;
  private _cartas: Array<Carta>;
  private _pontos: number;
  private _aces: number;

  constructor(deck: Deck, fromCards?: Array<Carta>) {
    this._deck = deck;
    if (fromCards) {
      this._cartas = fromCards;
    } else {
      this._cartas = this._deck.getCartasIniciais();
    }
    this._pontos = Hand.calcularPontos(this.cartas);
    this._aces = 0;
    this.cartas.forEach(this.checkIfAce);
    this.verificarPontos();
  }

  get cartas(): Array<Carta> {
    return this._cartas;
  }

  get pontos(): number {
    return this._pontos;
  }

  set pontos(valor: number) {
    this._pontos = valor;
  }

  public hasBlackJack = () => this._pontos.length === 2 && this._pontos === 21;

  public inicializarAtributos() {
    this._cartas = this._deck.getCartasIniciais();
    this._pontos = Hand.calcularPontos(this.cartas);
    this._aces = 0;
    this.cartas.forEach(this.checkIfAce);
    this.verificarPontos();
  }

  public dealCard() {
    const carta: Carta = this._deck.dealCard();
    this.checkIfAce(carta);
    this._cartas.push(carta);
    this.atualizarPontos(carta);
    if (this._pontos > 21) this._pontos = 0;
  }

  private checkIfAce(carta: Carta) {
    if (carta.nome === "ACE") this._aces++;
  }

  private verificarPontos() {
    while (this.pontos > 21 && this._aces > 0) {
      this._pontos -= 10;
      this._aces--;
    }
  }

  private atualizarPontos(card: Carta) {
    this._pontos = Hand.calcularPontos(this._cartas);
    this.verificarPontos();
  }

  public toString = (): string =>
    `${this._cartas.map(card => card.toString()).join(", ")} (${
      this.pontos != 0 ? this._pontos : "> 21"
    } pontos)`;

  static calcularPontos = (cards: Array<Carta>): number =>
    cards.reduce((acc, current) => acc + current.valor, 0);
}

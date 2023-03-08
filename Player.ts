import { Hand } from "./Hand";
import { Deck, Carta } from "./Deck";
/**
 *  Implement a casino player in TypeScript
 *
 *   @constructor
 *   @param {string} nome
 *   @param {number} valorInicial
 */
export class Jogador {
  readonly hands: Array<Hand>;
  private _bet: number;
  private _valorAtual: number;
  private _deck: Deck;

  constructor(
    readonly nome: string,
    readonly valorInicial: number,
    deck: Deck
  ) {
    this._bet = 0;
    this._valorAtual = valorInicial;
    this.hands = [new Hand(deck)];
    this._deck = deck;
  }

  get bet(): number {
    return this._bet;
  }

  set bet(valor: number) {
    if (valor < 0) throw new RangeError("Não é possivel atribuir um numero negativo");
    this._bet = valor;
  }

  get valorAtual(): number {
    return this._valorAtual;
  }

  set valorAtual(valor: number) {
    if (valor < 0) throw new RangeError("Não é possivel atribuir um numero negativo");
    this._valorAtual = valor;
  }

  public resetarMaos = () =>
    this.hands.forEach((hand: Hand) => hand.inicializarAtributos());

  public bater = (handIndex: number) => this.hands[handIndex].dealCard();

  /**
   * @returns An optional error message
   */
  public dobrar(): string | undefined {
    if (this.bet * 2 > this.valorAtual)
      return "Não pode dobrar porque voce nao tem dinheiro suficiente!";
    else if (this.hands[0].cartas.length !== 2)
      return "Não pode dobrar porque voce ja acertou!";
    else if (this.hands.length > 1)
      return "Nã pode dobrar por que voce ja dividiu!";

    this._bet *= 2;
  }

  public render(): string | undefined {
    if (this.hands[0].cartas.length !== 2)
      return "Nao pode dobar por que voce ja acertou!";
    else if (this.hands.length > 1)
      return "Não pode dobrar por que voce ja dividiu!";

    this._bet /= 2;
    this.hands[0].pontos = 0;
  }

  public dividir(): string | undefined {
    const firsHandCards: Array<Carta> = this.hands[0].cartas;
    if (this._bet * 2 > this._valorAtual) {
      return "Não é possível dividir porque você não tem dinheiro suficiente!";
    } else if (this.hands.length > 1) {
      return "Não é possível dividir porque você já dividiu!";
    } else if (firsHandCards.length !== 2) {
      return "Não é possível dividir porque você já atingiu!";
    } else if (firsHandCards[0].nome !== firsHandCards[1].nome) {
      return "Não é possível dividir porque suas cartas não são iguais!";
    }

    this._bet *= 2;

    const cards: Array<Carta> = [
      this.hands[0].cartas.pop(),
      this._deck.dealCard()
    ];
    this.hands.push(new Hand(this._deck, cards));

    this.hands[0].dealCard();
  }

  public ganhar(): number {
    const moneyBefore: number = this._valorAtual;
    this._valorAtual += this._bet;

    // If has a BlackJack, sums 1.5 times the actual bet, otherwise just 1 time
    if (this.hands[0].hasBlackJack()) {
      this._valorAtual += this._bet / 2;
    }
    if (this.hands.length > 1 && this.hands[1].hasBlackJack()) {
      this._valorAtual += this._bet / 2;
    }
    return this._valorAtual - moneyBefore;
  }

  public lose() {
    this._valorAtual -= this._bet;
  }

  public toString = (): string => this.nome;
}

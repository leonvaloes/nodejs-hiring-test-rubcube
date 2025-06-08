export class ValidatorIDGame {

  async execute(gameId: number) {

    if (isNaN(gameId)) {
      throw new Error("ID do jogo inválido");
    }
    if (gameId < 0) {
      throw new Error("ID do jogo não pode ser negativo");
    }
  }
}

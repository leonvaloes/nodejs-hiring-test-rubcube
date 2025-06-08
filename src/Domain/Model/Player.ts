export class Player {
    id: number;
    currentName: string;
    score: number = 0;
  
    constructor(id: number, name: string) {
      this.id = id;
      this.currentName = name;
    }
  
    changeName(newName: string) {
      this.currentName = newName;
    }
  
    addScore(points: number) {
      this.score += points;
    }
  }
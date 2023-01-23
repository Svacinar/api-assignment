type Genders = {
  female: number;
  male: number;
  other: number;
};

export type Analytics = {
  character_count: number;
  average_age: number;
  average_weight: number;
  genders: Genders;
};

export interface IAnalyzer {
  getAnalytics: () => Analytics;
  analyzeGender: (row: string) => void;
  analyzeRow: (row: any) => void;
}
export class Analyzer implements IAnalyzer {
  characterCount: number;
  totalAge: number;
  totalWeight: number;
  genders;
  constructor() {
    this.characterCount = 0;
    this.totalAge = 0;
    this.totalWeight = 0;
    this.genders = {
      male: 0,
      female: 0,
      other: 0,
    };
  }
  getAnalytics(): Analytics {
    console.log('total: weight' + this.totalWeight);
    console.log('total: age' + this.totalAge);
    return {
      character_count: this.characterCount,
      average_age: this.totalAge / this.characterCount,
      average_weight: this.totalWeight / this.characterCount,
      genders: this.genders,
    };
  }
  analyzeGender(rowGender: string) {
    if (['f', 'F', 'female'].indexOf(rowGender) >= 0) {
      this.genders.female = this.genders.female + 1;
    } else if (['m', 'M', 'male'].indexOf(rowGender) >= 0) {
      this.genders.male = this.genders.male + 1;
    } else {
      this.genders.other = this.genders.other + 1;
    }
  }
  analyzeRow(row: any) {
    this.characterCount++;
    if (row.gender) {
      this.analyzeGender(row.gender);
    }
    if (row.weight) {
      if (!isNaN(row.weight)) {
        this.totalWeight = this.totalWeight + Number(row.weight);
      }
    }
    if (row.born) {
      const birthdate = new Date(row.born);
      if (!isNaN(birthdate.getTime())) {
        const now = new Date();
        const ageInMilliseconds = now.getTime() - birthdate.getTime();
        const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365);
        this.totalAge = this.totalAge + Math.floor(ageInYears);
      }
    }
  }
}

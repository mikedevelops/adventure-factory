export const BASE_UNIT = 16;

export class UnitService {
  public static getUnit(unit: number): number {
    return unit * BASE_UNIT;
  }
}

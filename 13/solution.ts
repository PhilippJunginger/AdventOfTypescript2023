import { Expect, Equal } from 'type-testing';

// Solution

type LengthOfArray<Length extends number, Arr extends any[] = []> =
    Arr extends {length: Length}
        ? Arr
        : LengthOfArray<Length, [...Arr, any]>;
type Add<NumOne extends number, NumTwo extends number> = [
    ...LengthOfArray<NumOne>,
    ...LengthOfArray<NumTwo>
] extends { length: infer Length extends number }
    ? Length
    : 0;
type DayCounter<Start extends number, End extends number> =
    Start extends End
        ? End
        : Start | DayCounter<Add<Start, 1>, End>;

// Code Tests

type TwelveDaysOfChristmas = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type test_0_actual = DayCounter<1, 12>;
//   ^?
type test_0_expected = TwelveDaysOfChristmas;
type test_0 = Expect<Equal<test_0_expected, test_0_actual>>;

type DaysUntilChristmas =
    | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
    | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20
    | 21 | 22 | 23 | 24 | 25;
type test_1_actual = DayCounter<1, 25>;
//   ^?
type test_1_expected = DaysUntilChristmas;
type test_1 = Expect<Equal<test_1_expected, test_1_actual>>;
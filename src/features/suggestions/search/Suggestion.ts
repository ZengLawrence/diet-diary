import { Serving } from '../../../model/Food';


export interface Suggestion {
  foodName: string;
  amount?: string;
  serving?: Serving;
  bestChoice?: boolean;
}
;

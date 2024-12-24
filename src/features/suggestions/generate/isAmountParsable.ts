import _ from 'lodash';

/**
 * Amount string is parsable if it has matching parentheses. Default to true if there is no parentheses.
 *
 * @param amount Amount string to check if it is parsable
 * @returns true if amount is parsable, false otherwise
 */
export function isAmountParsable(amount: string) {
  if (_.endsWith(amount, ")")) {
    return amount.includes("(");
  }
  return !amount.includes("(");
}

import _ from 'lodash';
import { Serving } from '../../../model/Food';
import { multiply } from '../../../model/servingFunction';
import { Amount, parseAmount } from '../parser/amount';
import convert from 'convert-units';

function servingFor(unitServing: Serving, servingAmount: Amount, amount: string){
  const to = parseAmount(amount);
  const toUnit = to.unit;
  const unit = servingAmount.unit;
  const normalizedQuantity = (toUnit && unit) ? convert(to.quantity).from(toUnit).to(unit) : to.quantity;
  return multiply(unitServing, _.round(normalizedQuantity / servingAmount.quantity, 3));
}

export default function baseOn({serving, amount} : {serving: Serving; amount: string}) {
  const servingAmount = parseAmount(amount);
  return {
    servingFor: _.partial(servingFor, serving, servingAmount)
  }
}
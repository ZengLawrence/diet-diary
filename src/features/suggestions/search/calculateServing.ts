import _ from 'lodash';
import { Serving } from '../../../model/Food';
import { multiply } from '../../../model/servingFunction';
import { Amount, parseAmount } from '../parser/amount';
import convert from 'convert-units';

type Unit = Amount['unit'];

function harmonize(fromUnit: Unit, toUnit: Unit) {
  if (_.isUndefined(fromUnit)) return undefined;

  if (_.includes(convert().from(fromUnit).possibilities(), toUnit)) {
    return fromUnit;
  }

  if (fromUnit === 'oz' && convert().possibilities('mass')) {
    return 'fl-oz';
  }
}

function take(unit: Unit) {
  return {
    makeConvertibleTo: _.partial(harmonize, unit),
  }
}

function servingFor(unitServing: Serving, servingAmount: Amount, amount: string){
  const from = parseAmount(amount);
  const toUnit = servingAmount.unit;
  const fromUnit = take(from.unit).makeConvertibleTo(toUnit);
  const normalizedQuantity = (fromUnit && toUnit) ? convert(from.quantity).from(fromUnit).to(toUnit) : from.quantity;
  return multiply(unitServing, _.round(normalizedQuantity / servingAmount.quantity, 3));
}

export default function baseOn({serving, amount} : {serving: Serving; amount: string}) {
  const servingAmount = parseAmount(amount);
  return {
    servingFor: _.partial(servingFor, serving, servingAmount)
  }
}
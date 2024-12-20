import _ from "lodash";
import numeral from "numeral";
import { useMediaQuery } from "../useMediaQuery";

interface Props {
  bestChoice: number;
  others: number;
}

function height(value: number, max: number, columnHeight: number) {
  return value / max * columnHeight;
}

function format(val: number) {
  return val > 10 ? numeral(val).format('0') : numeral(val).format('0[.][0]');
}

function offset(s: string) {
  return _.size(s) == 1 ? 5 : 0;
}

const Y_TEXT_OFFSET = 2;

export const BestChoiceComparisonChart = (props: Props) => {

  const isAboveSmallBreakPoint = useMediaQuery('(min-width: 576px)');

  const { bestChoice, others } = props;
  const canvasHeight = isAboveSmallBreakPoint ? 106 : 72;
  const columnHeight = isAboveSmallBreakPoint ? 84 : 50;
  const maxHeight = _.defaultTo(_.max([bestChoice, others, 10]), 10);

  const bcHeight = height(bestChoice, maxHeight, columnHeight);
  const bcY = canvasHeight - bcHeight;
  const bcVal = format(bestChoice);

  const othersHight = height(others, maxHeight, columnHeight);
  const othersY = canvasHeight - othersHight;
  const othersVal = format(others);

  return (
    <svg width="51" height={canvasHeight} xmlns="http://www.w3.org/2000/svg">
      <rect x={0} y={bcY} width="25" height={bcHeight} className="dd-chart-best-choice-column" />
      <text x={2 + offset(bcVal)} y={bcY - Y_TEXT_OFFSET} fill="currentColor" >{bcVal}</text>

      <rect x={26} y={othersY} width="25" height={othersHight} className="dd-chart-others-column" />
      <text x={26 + offset(othersVal)} y={othersY - Y_TEXT_OFFSET} fill="currentColor" >{othersVal}</text>
    </svg>
  );
}
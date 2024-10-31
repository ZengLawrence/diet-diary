import _ from "lodash";
import numeral from "numeral";

interface Props {
  bestChoice: number;
  others: number;
}

function height(value: number, max: number) {
  return value / max * 100;
}

function format(val: number) {
  return val > 10 ? numeral(val).format('0') : numeral(val).format('0[.][0]');
}

function offset(s: string) {
  return _.size(s) == 1 ? 5 : 0;
}

const CANVAS_HEIGHT = 120;
const TEXT_HEIGHT = 5;

export const BestChoiceComparisonChart = (props: Props) => {
  const { bestChoice, others } = props;
  const maxHeight = _.defaultTo(_.max([bestChoice, others, 10]), 10);

  const bcHeight = height(bestChoice, maxHeight);
  const bcY = CANVAS_HEIGHT - bcHeight;
  const bcVal = format(bestChoice);

  const othersHight = height(others, maxHeight);
  const othersY = CANVAS_HEIGHT - othersHight;
  const othersVal = format(others);

  return (
    <svg width="51" height={CANVAS_HEIGHT} xmlns="http://www.w3.org/2000/svg">
      <rect x={0} y={bcY} width="25" height={bcHeight} className="dd-chart-best-choice-column" />
      <text x={2 + offset(bcVal)} y={bcY - TEXT_HEIGHT} fill="currentColor" >{bcVal}</text>

      <rect x={26} y={othersY} width="25" height={othersHight} className="dd-chart-others-column" />
      <text x={26 + offset(othersVal)} y={othersY - TEXT_HEIGHT} fill="currentColor" >{othersVal}</text>
  </svg>
  );
}
import _ from "lodash";
import numeral from "numeral";

interface Props {
  bestChoice: number;
  others: number;
}

const Column = (props: { height: number; x: number; y: number; className?: string }) => (
  <rect width="25" {...props} />
);

function height(value: number, max: number) {
  return value / max * 100;
}

function format(val: number) {
  return val > 10 ? numeral(val).format('0') : numeral(val).format('0[.][0]');
}

const CANVAS_HEIGHT = 120;
const TEXT_HEIGHT = 5;

export const BestChoiceComparisonChart = (props: Props) => {
  const { bestChoice, others } = props;
  const maxHeight = _.defaultTo(_.max([bestChoice, others, 10]), 10);
  const bcHeight = height(bestChoice, maxHeight);
  const bcY = CANVAS_HEIGHT - bcHeight;
  const othersHight = height(others, maxHeight);
  const othersY = CANVAS_HEIGHT - othersHight;

  return (
    <svg width="51" height={CANVAS_HEIGHT} xmlns="http://www.w3.org/2000/svg">
      <Column x={0} y={bcY} height={bcHeight} className="dd-chart-best-choice-column" />
      <text x="2" y={bcY - TEXT_HEIGHT} fill="currentColor" >{format(bestChoice)}</text>

      <Column x={26} y={othersY} height={othersHight} className="dd-chart-others-column" />
      <text x="26" y={othersY - TEXT_HEIGHT} fill="currentColor" >{format(others)}</text>
  </svg>
  );
}
import _ from "lodash";

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

const CANVAS_HEIGHT = 100;

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
      <text x="2" y={bcY - 5} fill="currentColor" textLength={25} >{bestChoice}</text>

      <Column x={26} y={othersY} height={othersHight} className="dd-chart-others-column" />
      <text x="26" y={othersY - 5} fill="currentColor" textLength={25} >{others}</text>
  </svg>
  );
}
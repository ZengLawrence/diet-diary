import _ from "lodash";

interface Props {
  bestChoice: number;
  others: number;
}

const Column = (props: { height: number; x: number; className?: string }) => (
  <rect width="25" height={props.height} x={props.x} y={100 - props.height} className={props.className} />
);

function height(value: number, max: number) {
  return value / max * 100;
}

export const BestChoiceComparisonChart = (props: Props) => {
  const { bestChoice, others } = props;
  const maxHeight = _.defaultTo(_.max([bestChoice, others, 10]), 10);

  return (
    <svg width="51" height="100" xmlns="http://www.w3.org/2000/svg">
      <Column x={0} height={height(bestChoice, maxHeight)} className="dd-chart-best-choice-column" />
      <Column x={26} height={height(others, maxHeight)} className="dd-chart-others-column" />
    </svg>
  );
}
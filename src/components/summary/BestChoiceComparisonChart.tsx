interface Props {
  bestChoice: {
    value: number;
  };
  others: {
    value: number;
  };
}

const Column = (props: { height: number; x: number; className?: string }) => (
  <rect width="25" height={props.height} x={props.x} y={100 - props.height} className={props.className} />
);

export const BestChoiceComparisonChart = (props: Props) => (
  <svg width="51" height="100" xmlns="http://www.w3.org/2000/svg">
    <Column x={0} height={props.bestChoice.value} className="dd-chart-best-choice-column" />
    <Column x={26} height={props.others.value} className="dd-chart-others-column" />
  </svg>
)
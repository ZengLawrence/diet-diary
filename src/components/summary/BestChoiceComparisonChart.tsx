interface Props {
  col1: {
    height: number;
  };
}

const Column = (props: { height: number; className?: string }) => (
  <rect width="25" height={props.height} x="0" y={100 - props.height} className={props.className} />
);

export const BestChoiceComparisonChart = (props: Props) => (
  <svg width="51" height="100" xmlns="http://www.w3.org/2000/svg">
    <Column {...props.col1} className="dd-chart-best-choice-column" />
    <rect width="25" height="40" x="26" y="60" style={{ fill: "#ced4da" }} />
  </svg>
)
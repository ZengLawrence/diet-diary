interface Props {
  col1: {
    height: number;
  };
}

const Column = (props: {height: number;}) => (
  <rect width="25" height={props.height} x="0" y={100 - props.height} style={{ fill: "#0d6efd" }} />
);

export const TwoColumnChart = (props: Props) => (
  <svg width="51" height="100" xmlns="http://www.w3.org/2000/svg">
    <Column {...props.col1} />
    <rect width="25" height="40" x="26" y="60" style={{ fill: "#ced4da" }} />
  </svg>
)
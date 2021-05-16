export const CalorieSummary = (props: { calories: number; }) => (
  <div className="d-flex flex-column flex-fill justify-content-center border rounded bg-info text-white text-center p-1">
    <div style={{ fontSize: '40px', minWidth: '110px' }}>{props.calories}</div>
    <div>calories</div>
  </div>
);

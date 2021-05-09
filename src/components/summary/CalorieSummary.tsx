export const CalorieSummary = (props: { calories: number; }) => (
  <div className="d-flex flex-column flex-fill justify-content-center border rounded bg-info text-white text-center">
    <div style={{ fontSize: '40px' }}>{props.calories}</div>
    <div>calories</div>
  </div>
);

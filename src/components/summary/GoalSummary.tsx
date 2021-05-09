export const GoalSummary = (props: { calories: number; }) => (
  <div className="d-flex flex-column bg-secondary text-white text-center">
    goal: {props.calories}
  </div>
);

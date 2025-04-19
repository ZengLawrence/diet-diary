const DateSpan = (props: { date: string; }) => (
  <span data-cy="date" className="fs-1">{props.date}</span>
);

export default DateSpan;
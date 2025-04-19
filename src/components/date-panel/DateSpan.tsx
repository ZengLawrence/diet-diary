import { useSelector } from "react-redux";
import { dayPageSelector } from "../../app/selectors";

const DateSpan = () => {
  const date = useSelector(dayPageSelector).date;
  return (
    <span data-cy="date" className="fs-1">{date}</span>
  );
}

export default DateSpan;
import _ from "lodash";

interface Props extends React.PropsWithChildren {
  className?: string;
}

export const Legend = (props: Props) => (
  <div className={_.join(["border-0", "rounded", props.className], " ")}>
    {props.children}
  </div>
);

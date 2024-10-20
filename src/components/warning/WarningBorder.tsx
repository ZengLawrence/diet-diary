interface Props extends React.PropsWithChildren {
  show?: boolean;
  flex?: boolean;
  critical?: boolean;
}

function className(options: { show?: boolean; flex?: boolean; critical?: boolean }) {
  const borderColor = options.critical ? "border-danger" : "border-warning";
  const border = options.show ? "border rounded border-2 " + borderColor : "";
  return (options.flex ? "d-flex " : "") + border
}

export const WarningBorder = (props: Props) => (
  <div className={className(props)}>
    {props.children}
  </div>
)
interface Props extends React.PropsWithChildren {
  flexFill?: boolean;
  critical?: boolean;
}

function className(options: {flexFill?: boolean; critical?: boolean}) {
  const borderColor = options.critical ? "border-danger" : "border-warning";
  const border = "border rounded border-2 " + borderColor;
  return (options.flexFill ? "d-flex flex-fill " : "") + border
}

export const WarningBorder = (props: Props) => {
  return (
    <div className={className(props)}>
      {props.children}
    </div>
  );
}
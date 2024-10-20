interface Props extends React.PropsWithChildren {
  flexFill?: boolean;
}

export const WarningBorder = (props: Props) => {
  const className = (props.flexFill ? "d-flex flex-fill " : "") + "border rounded border-2 border-warning";

  return (
    <div className={className}>
      {props.children}
    </div>
  );
}
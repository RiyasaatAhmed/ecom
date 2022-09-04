interface ErrorStateProps {
  reFetch?: () => void;
}
const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
const ErrorState = ({ reFetch }: ErrorStateProps) => {
  return (
    <h2 style={style}>
      SomeThing Went Wrong Please, start the JSON server and
      <button onClick={reFetch}> Try Again </button>
    </h2>
  );
};
export default ErrorState;

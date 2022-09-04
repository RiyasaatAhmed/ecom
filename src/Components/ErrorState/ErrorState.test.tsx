import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProductList } from "../../MockData/Product";
import ErrorState from "./ErrorState";

const reFetcher = jest.fn().mockReturnValue(ProductList);

describe("<ErrorState />", () => {
  it("should render the element without any error", () => {
    render(<ErrorState />);
    expect(
      screen.getByText(/SomeThing Went Wrong Please/i)
    ).toBeInTheDocument();
  });

  it("should call the reFetcher function then the try again button is clicked", () => {
    render(<ErrorState reFetch={reFetcher} />);
    const btn = screen.getByRole("button");
    expect(btn).toBeInTheDocument();
    userEvent.click(btn);
    expect(reFetcher).toBeCalled();
    expect(reFetcher).toBeCalledTimes(1);
  });
});

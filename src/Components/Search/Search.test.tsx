import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Search from "../Search/Search";

const searchHandler = jest.fn();

const SearchComponentDisplayedAndReturned = () => {
  render(<Search setSearchValue={searchHandler} />);
  const searchInput: HTMLInputElement = screen.getByLabelText(/search/i);
  return searchInput;
};

describe("<Search />", () => {
  it("should render the component with Search label", () => {
    const searchInput = SearchComponentDisplayedAndReturned();
    expect(searchInput).toBeInTheDocument();
  });

  it("should allow users to type on the search bar", () => {
    const searchInput = SearchComponentDisplayedAndReturned();

    userEvent.type(searchInput, "typing");
    expect(searchHandler).toHaveBeenCalled();
    expect(searchHandler).toHaveBeenCalledTimes(6);
    expect(searchInput.value).toBe("typing");

    userEvent.clear(searchInput);
    expect(searchInput.value).toBe("");

    // typing + clear + Product1 = 6 + 1 + 8
    userEvent.type(searchInput, "Product1");
    expect(searchHandler).toHaveBeenCalled();
    expect(searchHandler).toHaveBeenCalledTimes(15);
    expect(searchInput.value).toBe("Product1");
  });
});

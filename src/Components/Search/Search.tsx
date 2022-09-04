import React from "react";

interface SearchPropsType {
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}
const Search = ({ setSearchValue: SearchValueHandler }: SearchPropsType) => {
  const [searchValue, setSearchValue] = React.useState("");

  const searchHandler = (value: string) => {
    setSearchValue(value);
    SearchValueHandler(value);
  };

  return (
    <section style={{ padding: "50px 0px" }}>
      <label htmlFor="search"> Search </label>
      <input
        id="search"
        type="text"
        value={searchValue}
        onChange={(e) => searchHandler(e.target.value)}
      />
    </section>
  );
};
export default Search;

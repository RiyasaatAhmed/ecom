import { LOADING_STATE } from "../../Utils/static";
import React from "react";
import ErrorState from "../ErrorState/ErrorState";
export interface ListRendererProps<T> {
  renderItem: (item: T) => React.ReactNode;
  list: T[];
  keyExtractor?: (item: T) => string;
  status?: string;
  reFetch?: () => void;
}

const ListRenderer = <T,>({
  list,
  renderItem,
  status,
  reFetch,
  keyExtractor,
}: ListRendererProps<T>) => {
  if (status === LOADING_STATE.LOADING) return <h2>Loading...</h2>;
  if (status === LOADING_STATE.FAILED) return <ErrorState reFetch={reFetch} />;

  if (list.length === 0) return <h2> No Product Available </h2>;
  return (
    <>
      <section>
        <ul style={{ padding: 0 }}>
          {list?.map((item, index) => (
            <li
              style={{ listStyle: "none" }}
              key={keyExtractor ? keyExtractor(item) : index}
            >
              {renderItem(item)}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default ListRenderer;

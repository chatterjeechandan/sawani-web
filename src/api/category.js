import { fetchData } from "./apiClient";

export function fetchCategories() {
  return fetchData("catalog/nested_categories");
}

import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items) //wrap with "_"-object
    .slice(startIndex)
    .take(pageSize)
    .value();
}

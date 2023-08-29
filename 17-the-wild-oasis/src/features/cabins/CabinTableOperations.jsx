import TableOperations from "../../ui/TableOperations"
import Filter from "../../ui/Filter"
import SortBy from "../../ui/SortBy"

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "ALL" },
          { value: "no-discount", label: "No-discount" },
          { value: "with-discount", label: "With-discount" },
        ]}
      />
      <SortBy
        options={[
          { value: "name-asc", label: "Sort by name (A-Z)" },
          { value: "name-desc", label: "Sort by name (Z-A)" },
          { value: "regularPrice-asc", label: "Sort by price (low first)" },
          { value: "regularPrice-desc", label: "Sort by price (high first)" },
          { value: "maxCapacity-asc", label: "Sort by capacity (low first)" },
          { value: "maxCapacity-desc", label: "Sort by capacity (high first)" },
          { value: "startDate-asc", label: "Sort by start date (low first)" },
          { value: "startDate-desc", label: "Sort by start date (high first)" },
        ]}
      />
    </TableOperations>
  )
}

export default CabinTableOperations

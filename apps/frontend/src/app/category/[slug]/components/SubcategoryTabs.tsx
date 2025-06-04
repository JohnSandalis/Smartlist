import { type SubCategory } from "@smartlist/schemas";

interface Props {
  subcategoryList: SubCategory[];
  selectedSubCategory: number | null;
  setSelectedSubCategory: (uuid: number) => void;
  subcategoryRefs: React.MutableRefObject<
    Record<string, HTMLButtonElement | null>
  >;
}

export default function SubcategoryTabs({
  subcategoryList,
  selectedSubCategory,
  setSelectedSubCategory,
  subcategoryRefs,
}: Props) {
  return (
    <div className="overflow-x-auto whitespace-nowrap scroll-smooth scrollbar-hide mb-2 py-2 container-default lg:hidden">
      {subcategoryList.map((subcategory) => (
        <button
          key={subcategory.uuid}
          // @ts-ignore
          ref={(el) => (subcategoryRefs.current[subcategory.name] = el)}
          onClick={() => setSelectedSubCategory(subcategory.uuid)}
          className={`inline-block px-2 py-1 m-1 ${
            selectedSubCategory === subcategory.uuid
              ? "bg-primary text-white"
              : "bg-white text-black"
          } rounded`}
        >
          {subcategory.name}
        </button>
      ))}
    </div>
  );
}

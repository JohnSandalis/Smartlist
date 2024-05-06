import Link from "next/link";
import Image from "next/image";

interface Category {
  name: string;
  greek_name: string;
  id: string;
  img_url: string;
}

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/categories/${category.id}`}
      className="rounded-md h-[200px] p-3 flex flex-col items-center justify-center bg-white"
    >
      <div className="flex items-center justify-center">
        <Image src={category.img_url} alt={category.name} width="320" height="320" className="w-24 h-24 object-cover" />
      </div>
      <div className="mt-4 text-center">
        <h3 className="text-lg font-medium text-gray-900 leading-tight">
          {category.greek_name}
        </h3>
      </div>
    </Link>
  );
}

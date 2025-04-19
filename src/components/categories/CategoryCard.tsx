import Link from "next/link";
import Image from "next/image";
import { Category } from "@/lib/types/Category";

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/category/${category.id}`}
      className="rounded-md h-[200px] p-3 flex flex-col items-center justify-center bg-white"
    >
      <div className="flex items-center justify-center">
        <Image
          src={category.img_url}
          alt={category.name}
          width="320"
          height="320"
          className="w-24 h-24 object-contain"
        />
      </div>
      <div className="mt-4 text-center">
        <h3 className="text-lg font-medium text-gray-900 leading-tight">
          {category.name}
        </h3>
      </div>
    </Link>
  );
}

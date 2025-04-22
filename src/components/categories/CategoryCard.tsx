import Link from "next/link";
import Image from "next/image";
import { Category } from "@/lib/types/Category";

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/category/${category.uuid}`}
      prefetch={true}
      className="rounded-md h-[200px] p-3 flex flex-col items-center justify-center bg-white hover:bg-gray-200 active:bg-gray-200 transition-colors duration-300 ease-in-out"
    >
      <div className="flex items-center justify-center">
        <Image
          src={category.image}
          alt={category.name}
          width="320"
          height="320"
          className="w-24 h-24 object-contain"
        />
      </div>
      <div className="mt-4 text-center">
        <h3 className="text-lg font-medium text-gray-900 leading-tight word-break-break-word">
          {category.name}
        </h3>
      </div>
    </Link>
  );
}

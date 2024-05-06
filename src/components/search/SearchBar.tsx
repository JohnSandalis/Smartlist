import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState, FormEvent, ChangeEvent } from "react";
import { Product } from "@/app/page";

interface SearchBarProps {
  setLoading: (loading: boolean) => void;
  setResults: (results: Product[]) => void;
}

export const SearchBar = ({ setLoading, setResults }: SearchBarProps) => {
  const [input, setInput] = useState<string>("");

  const fetchData = async (value: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SEARCH_API_URL}?search=${value}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: Product[] = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (value: string) => {
    setInput(value);
  };

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchData(input);
  };

  return (
    <div className="relative w-full pl-10 pr-5">
      <form onSubmit={handleSearch}>
        <label htmlFor="search" className="sr-only">
          Αναζήτηση
        </label>
        <input
          id="search"
          name="search"
          placeholder="Ψάξε προϊόντα..."
          value={input}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e.target.value)}
          className="w-full text-[16px] font-normal text-slate-900 rounded-full py-2 pl-3 pr-10 bg-white border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
        />
        <button
          type="submit"
          className="absolute top-1/2 right-7 -translate-y-1/2 w-6 h-6"
        >
          <MagnifyingGlassIcon className="w-6 h-6" />
        </button>
      </form>
    </div>
  );
};

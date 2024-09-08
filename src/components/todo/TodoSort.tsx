
"use client";
import { useCallback, useState } from "react";
import Select from "../ui/Select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";


const sortOptions = [
  {
    label: "تاریخ ایجاد (جدید ترین)",
    value: "latest",
  },
  {
    label: "تاریخ ایجاد (قدیمی ترین)",
    value: "earliest",
  }
];

function TodoSort() {
  const searchParams = useSearchParams();
  const [sort, setSort] = useState(searchParams.get("sort") || "latest");

  const router = useRouter();
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  return (
    <Select
      onChange={(e) => {
        setSort(e.target.value);
        router.push(pathname + "?" + createQueryString("sort", e.target.value));
      }}
      value={sort}
      options={sortOptions}
    />
  );
}
export default TodoSort;

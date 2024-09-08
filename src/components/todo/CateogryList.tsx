import Link from "next/link";
import {CategoryType} from "@/types/Todo";

async function CateogryList() {

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category/list`);

  // await new Promise((resolve) => setTimeout(() => resolve(), 2000));
  const {data}:{data:object} = await res.json();
  let categories:CategoryType[] = data?.categories;

  return (
    <ul className="space-y-4">
      <Link href={`/todo/`}>همه</Link>
      {categories?.map((category) => {
        return (
          <li key={category._id}>
            <Link href={`/todo/category/${category.slug}`}>
              {category.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
export default CateogryList;

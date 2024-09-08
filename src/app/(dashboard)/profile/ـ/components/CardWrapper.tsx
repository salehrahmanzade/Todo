import { fetchCardData } from "@/lib/serverAction/data";
import { Card } from "./Cards";

async function CardWrapper() {
  const { numberOfPosts, numberOfUsers } =
    await fetchCardData();

  return (
    <div className="grid gap-6 md:grid-cols-3 mb-8">
      <Card title="کاربران" value={numberOfUsers} type="users" />
      <Card title="تسک ها" value={numberOfPosts} type="todos" />
    </div>
  );
}
export default CardWrapper;

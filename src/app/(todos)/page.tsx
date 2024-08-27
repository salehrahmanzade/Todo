import Button from "@/components/ui/Button";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1 className="font-bold text-center text-2xl md:text-5xl text-secondary-800 my-20">
        برنامه مدیریت تسک های کارکنان
      </h1>

      <div>
        <p className="text-center text-secondary-500 text-lg leading-loose">
          جایی که قراره بتونی  برنامه هات رو کامل مدیریت کنی و به همه کار هات برسی!
          <br /> بتونی تسک بسازی  - ویرایش کنی  و در داشبوردت همه اتفاقات رو رصد
          کنی!
        </p>
        <div className="flex justify-center gap-x-8 w-full mt-10">
          <Button variant="primary">
            <Link href="/todo">  تسک ها  </Link>
          </Button>
          <Button variant="outline">
            <Link href="/profile"> داشبورد کاربری </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

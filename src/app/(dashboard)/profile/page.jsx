import CardWrapper from "./ـ/components/CardWrapper";
import { Suspense } from "react";
import LatestPosts from "./ـ/components/LatestPosts";
import Fallback from "@/components/ui/Fallback";
import Link from "next/link";
import {
 ArrowLeftIcon
} from "@heroicons/react/24/outline";
async function Profile() {
  return (
    <div>
      <h1 className="text-xl mb-8 text-secondary-500">داشبورد</h1>
      <Suspense fallback={<Fallback />}>
        <CardWrapper />
      </Suspense>
      <div>
        <h1 className="text-xl mb-4 text-secondary-500 flex items-center">
            آخرین تسک ها
            <ArrowLeftIcon className="h-5 w-5 text-secondary-600 mx-1" />
            <Link className={"text-primary-900 text-lg mx-1"} href={'/todo'} >
                رفتن به صفحه تسک ها
            </Link>
        </h1>
        <Suspense fallback={<Fallback />}>
          <LatestPosts />
        </Suspense>
      </div>
    </div>
  );
}
export default Profile;

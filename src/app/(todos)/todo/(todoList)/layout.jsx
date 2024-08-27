import TodoSort from "@/components/todo/TodoSort";
import CateogryList from "@/components/todo/CateogryList";
import Search from "@/components/ui/Search";
import {Spinner} from "@/components/ui/Spinner";
import {Suspense} from "react";

function Layout({children}) {
    return (
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-secondary-700 mb-12 items-center">
                <h1 className="text-lg font-bold">لیست برنامه ها</h1>
                <Suspense>
                    <Search/>
                </Suspense>
                <Suspense>
                    <TodoSort/>
                </Suspense>
            </div>
            <div className="grid grid-cols-12 gap-8">
                <div className="col-span-12 lg:col-span-4 xl:col-span-3 lg:pl-8 text-secondary-500 space-y-4 ">
                    <h6 className="text-md font-bold">  دسته بندی تسک ها :  </h6>
                    <Suspense fallback={<Spinner/>}>
                        <CateogryList/>
                    </Suspense>
                </div>
                <main className="col-span-12 lg:col-span-8 xl:col-span-9">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default Layout;

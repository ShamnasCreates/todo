import AddTask from "@/app/components/AddTask";
import TaskViewList from "@/app/components/TaskViewList";

// to show todo lists per different dates 
export default async function Page({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const date = (await params).date;
  return (
    <div className="flex flex-col h-screen font-mont mr-4 ml-4 md:mr-8 md:ml-8 xl:ml-36 xl:mr-36">
      <div className="font-libre text-4xl mt-8 mb-6">Today</div>

      <TaskViewList params={params} />

      <div className="mb-8 mt-5">
        <AddTask params={params} />
      </div>
    </div>
  );
}

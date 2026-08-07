import AddTask from "@/app/components/AddTask";
import TaskView from "@/app/components/TaskView";

export default async function Page({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const date = (await params).date;
  return (
    <div className="flex flex-col min-h-screen font-mont mr-4 ml-4 md:mr-8 md:ml-8 xl:ml-36 xl:mr-36">
      <div className="font-libre text-4xl mt-8 mb-6">
        Today
      </div>

      <div className="grow">
        <ul>
          <li>
            <TaskView/>
          </li>
        </ul>
      </div>

      <div className="mb-8">
        <AddTask />
      </div>
    </div>
  );
}

export default function AddTask() {
  return (
    <div>
      <form>
        <div className="flex justify-between bg-whiteX rounded-full">
          <div className="min-h-20 min-w-12 bg-whiteX text-blackX rounded-l-full flex justify-center items-center p-4">
            <button className="material-symbols-outlined bg-blackX text-whiteX rounded-full" style={{ fontSize: 48 }}>add</button>
          </div>
          <input
            type="text"
            className="min-h-20 w-full bg-whiteX text-blackX outline-none grow"
            placeholder="Add Task"
          />
          <div className="min-h-20 min-w-12 bg-whiteX text-blackX rounded-r-full"></div>
        </div>
      </form>
    </div>
  );
}

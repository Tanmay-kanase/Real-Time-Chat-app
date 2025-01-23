export default function HomePage() {
  return (
    <div className="grid grid-cols-3 h-[1280px] w-[300px] ">
      <div className=" grid-cols-1 flex  justify-between border bg-white text-black text-center">
        <div className="justify-end">
          <ul className="inline">
            <li>nav</li>
            <li>msg</li>
            <li>contact</li>
            <li>meta</li>
          </ul>
        </div>
        <div className="">
          <ul>
            <li>star</li>
            <li>archive</li>
            <li>profile</li>
            <li>setting</li>
          </ul>
        </div>
      </div>
      <div></div>
      <div></div>
    </div>
  );
}

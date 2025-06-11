import { IoMdArrowDropdown } from "react-icons/io";
import { SlMagnifier } from "react-icons/sl";

const EventsForm = () => {
  return (
    <div className="mx-[20px] mb-[50px] flex flex-col gap-12 rounded-2xl bg-cyan-900/10 px-[16px] py-[50px] sm:mx-[50px] md:mb-[80px] md:px-[60px] lg:mx-[60px] 2xl:mx-[160px]">
      <button className="bg-cards hover:bg-cards-dark active:bg-cards-dark focus:bg-cards-dark w-fit cursor-pointer rounded-2xl px-6 py-2 text-3xl text-cyan-900 transition-all duration-500 hover:text-cyan-800 focus:text-cyan-800 active:text-cyan-800">
        Sort
      </button>
      <div className="flex flex-col gap-14">
        <div className="flex flex-col items-center justify-between gap-12 md:flex-row md:gap-0">
          <div className="flex w-full flex-col gap-2 md:w-[unset] md:basis-[45%]">
            <label
              htmlFor="from"
              className="pl-6 text-3xl font-extrabold text-cyan-900"
            >
              From
            </label>
            <input
              type="date"
              id="from"
              name="from"
              className="rounded-2xl border-b-[1px] border-cyan-900 bg-cyan-900/10 px-[20px] py-3 text-2xl text-cyan-900"
            />
          </div>
          <div className="flex w-full flex-col gap-2 md:w-[unset] md:basis-[45%]">
            <label
              htmlFor="to"
              className="pl-6 text-3xl font-extrabold text-cyan-900"
            >
              To
            </label>
            <input
              type="date"
              id="to"
              name="to"
              className="rounded-2xl border-b-[1px] border-cyan-900 bg-cyan-900/10 px-[20px] py-3 text-2xl text-cyan-900"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="to"
            className="pl-6 text-3xl font-extrabold text-cyan-900"
          >
            Select the hall
          </label>
          <div className="rounded-2xl border-b-[1px] border-cyan-900 bg-cyan-900/10 px-[20px] py-3 text-2xl text-cyan-900">
            <div className="flex items-center justify-between">
              <p>Oldenbloc</p>
              <IoMdArrowDropdown />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="to"
            className="pl-6 text-3xl font-extrabold text-cyan-900"
          >
            Search
          </label>
          <div className="rounded-2xl border-b-[1px] border-cyan-900 bg-cyan-900/10 px-[20px] py-3 text-2xl text-cyan-900">
            <div className="flex items-center justify-between">
              <p>Search the hall/term</p>
              <SlMagnifier />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsForm;

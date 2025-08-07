"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { SlMagnifier } from "react-icons/sl";

const EventsForm = ({ filters, onChange }) => {
	const [showSort, setShowSort] = useState(false);
	const [showGyms, setShowGyms] = useState(false);

	const { data: gyms = [], isLoading } = useQuery({
		queryKey: ["gyms", filters],
		queryFn: async () => {
			const res = await fetch(`/api/gyms`);
			const json = await res.json();

			return json.docs;
		},
	});
	console.log(filters);
	return (
		<div className="mx-[20px] mb-[50px] flex flex-col gap-12 rounded-2xl bg-cyan-900/10 px-[16px] py-[50px] sm:mx-[50px] md:mb-[80px] md:px-[60px] lg:mx-[60px] 2xl:mx-[160px]">
			<div>
				<div
					className="bg-cards hover:bg-cards-dark active:bg-cards-dark focus:bg-cards-dark w-fit cursor-pointer rounded-2xl px-6 py-2 text-3xl text-cyan-900 transition-all duration-500 hover:text-cyan-800 focus:text-cyan-800 active:text-cyan-800"
					onClick={() => {
						setShowSort((sort) => !sort);
					}}
				>
					Sort
				</div>
				{showSort && (
					<div className="">
						<div
							className="bg-cards px-6 py-2 text-2xl rounded-2xl text-cyan-900 mt-1 hover:bg-cards-dark active:bg-cards-dark focus:bg-cards-dark transition-all duration-500 hover:text-cyan-800 focus:text-cyan-800 active:text-cyan-800 cursor-pointer"
							onClick={() => {
								onChange({
									sort: "desc",
								});
								setShowSort(false);
							}}
						>
							Newest events first
						</div>
						<div
							className="bg-cards px-6 py-2 text-2xl rounded-2xl text-cyan-900 mt-1 hover:bg-cards-dark active:bg-cards-dark focus:bg-cards-dark transition-all duration-500 hover:text-cyan-800 focus:text-cyan-800 active:text-cyan-800 cursor-pointer"
							onClick={() => {
								onChange({
									sort: "asc",
								});
								setShowSort(false);
							}}
						>
							Oldest events first
						</div>
					</div>
				)}
			</div>
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
							value={filters.from}
							onChange={(e) => onChange({ from: e.target.value })}
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
							value={filters.to}
							onChange={(e) => onChange({ to: e.target.value })}
							className="rounded-2xl border-b-[1px] border-cyan-900 bg-cyan-900/10 px-[20px] py-3 text-2xl text-cyan-900"
						/>
					</div>
				</div>
				<div className="flex flex-col gap-2">
					<label
						htmlFor="to"
						className="pl-6 text-3xl font-extrabold text-cyan-900"
					>
						Hall
					</label>
					<div>
						<div
							className="flex items-center justify-between cursor-pointer rounded-2xl border-b-[1px] border-cyan-900 bg-cyan-900/10 px-[20px] py-3 text-2xl text-cyan-900"
							onClick={() => setShowGyms((prev) => !prev)}
						>
							<p className="opacity-50">Select the hall</p>
							<IoMdArrowDropdown />
						</div>

						{showGyms && (
							<ul className="mt-1 rounded-2xl border-b-[1px] border-cyan-900 bg-cyan-900/10 text-2xl text-cyan-900">
								{gyms.map((gym, i) => {
									return (
										<li
											key={i}
											className="px-[20px] py-3 cursor-pointer hover:bg-cards-dark active:bg-cards-dark focus:bg-cards-dark transition-all duration-500 rounded-2xl hover:text-cyan-800 focus:text-cyan-800 active:text-cyan-800"
											onClick={() => {
												onChange({ hall: gym.id });
												setShowGyms((prev) => !prev);
											}}
										>
											{gym.name}
										</li>
									);
								})}
							</ul>
						)}
					</div>
				</div>
				<div className="flex flex-col gap-2">
					<label
						htmlFor="term"
						className="pl-6 text-3xl font-extrabold text-cyan-900"
					>
						Search
					</label>
					<div className="rounded-2xl border-b-[1px] border-cyan-900 bg-cyan-900/10 px-[20px] py-3 text-2xl text-cyan-900">
						<input
							type="text"
							id="term"
							name="term"
							placeholder="Search the term"
							value={filters.term}
							onChange={(e) => onChange({ term: e.target.value })}
							className="w-full outline-0 border-0"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EventsForm;

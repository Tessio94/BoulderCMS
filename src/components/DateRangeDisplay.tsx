const formatDate = (dateStr: string, withYear = true) => {
	const date = new Date(dateStr);
	const day = date.getDate().toString().padStart(2, "0");
	const month = (date.getMonth() + 1).toString().padStart(2, "0");
	const year = date.getFullYear();

	return withYear ? `${day}.${month}.${year}` : `${day}.${month}.`;
};

export const DateRangeDisplay = ({
	label,
	range,
}: {
	label: string;
	range: { start: string; end?: string | null };
}) => {
	const { start, end } = range;
	const showRange = !!end;

	return (
		<div>
			<p>{label}</p>
			<time dateTime={start}>{formatDate(start, !showRange)}</time>
			{showRange && (
				<>
					{" "}
					– <time dateTime={end}>{formatDate(end)}</time>
				</>
			)}
		</div>
	);
};

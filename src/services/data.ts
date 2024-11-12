export const formatarData = (data: string) => {
	if (!data) {
		data = new Date().toString();
	}
	const dataObj = new Date(data);
	const options: Intl.DateTimeFormatOptions = {
		minute: "2-digit",
		hour: "2-digit",
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	};
	return dataObj.toLocaleDateString("pt-br", options);
};

export function imprimeDataInput(data: string): string {
	const [datePart, timePart] = data.split(", ");

	if (!datePart || !timePart) {
		return ""; // Retorna vazio se a data estiver no formato incorreto
	}

	const [day, month, year] = datePart.split("/").map(Number);
	const [hour, minute] = timePart.split(":").map(Number);

	const dataConvertida = new Date(year, month - 1, day, hour, minute);

	// Converte para o formato ISO
	const YYYY = dataConvertida.getFullYear();
	const MM = (dataConvertida.getMonth() + 1).toString().padStart(2, '0');
	const DD = dataConvertida.getDate().toString().padStart(2, '0');
	const HH = dataConvertida.getHours().toString().padStart(2, '0');
	const II = dataConvertida.getMinutes().toString().padStart(2, '0');

	return `${YYYY}-${MM}-${DD}T${HH}:${II}`;
}

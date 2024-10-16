fetch("/images")
	.then((response) => {
		if (!response.ok) {
			throw new Error("Error fetching images");
		}
		return response.json();
	})
	.then((data) => {
		data.result.forEach((image) => {
			const img = document.createElement("img");
			img.src = `data:${image.mimetype};base64,${image.data}`; // Use the pre-encoded data
			img.alt = image.filename;
			document.body.appendChild(img);
		});
	})
	.catch((error) => {
		console.error("Error fetching and displaying images:", error);
	});

import express from "express";
import { PrismaClient } from "@prisma/client";
import path from "path";
import fileupload from "express-fileupload";

const prisma = new PrismaClient();

const app = express();
const port = "3000";
app.use(express.static("public"));
app.use(fileupload());

app.post("/upload", async (req, res) => {
	const handleUpload = async () => {
		try {
			if (!req.files || Object.keys(req.files).length === 0) {
				return res.status(400).send("No files were uploaded.");
			}

			const files = Array.isArray(req.files.file)
				? req.files.file
				: [req.files.file];

			for (const file of files) {
				const fileUploaded = await prisma.file.create({
					data: {
						filename: file.name,
						mimetype: file.mimetype,
						data: file.data,
					},
				});

				console.log("File uploaded successfully! ID:", fileUploaded.id);
			}

			res.send("File(s) uploaded successfully!");
		} catch (error) {
			console.error(error);
			res.status(500).send("Error uploading file.");
		}
	};
	handleUpload()
		.catch((e) => {
			console.error(e);
			prisma.$disconnect();
		})
		.finally(() => {
			prisma.$disconnect();
		});
});

app.get("/", function (req, res) {
	res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/show", (req, res) => {
	res.sendFile(path.join(__dirname, "public/show.html"));
});

app.get("/images", (req, res) => {
	prisma.file
		.findMany()
		.then((result) => {
			// Convert Buffers to Base64 *before* sending to frontend
			const images = result.map((image) => ({
				...image,
				data: image.data.toString("base64"), // Correctly encode as base64
			}));
			res.status(200).json({ result: images });
		})
		.catch((e) => {
			res.json({ message: e });
			console.error(e);
		});
});

app.listen(port, () => {
	console.log("Server started at http://localhost:" + port);
});

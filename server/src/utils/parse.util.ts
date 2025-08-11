import fs from "fs";
import axios from "axios";
import FormData from "form-data";
import https from "https";
import pdfParse from "pdf-parse";

const agent = new https.Agent({
	rejectUnauthorized: false, // 👈 ignore self-signed certs
});

const parsePdf = async (pdfPath: string): Promise<string> => {
	try {
		const dataBuffer = fs.readFileSync(pdfPath);
		const pdfData = await pdfParse(dataBuffer);
		if (pdfData && pdfData.text) {
			return pdfData.text;
		}
		return await performOCR(pdfPath);
	} catch (error) {
		console.error("Error parsing PDF:", error);
		throw new Error("Failed to parse PDF");
	}
};

const performOCR = async (imagePath: string): Promise<string> => {
	try {
		const formData = new FormData();
		formData.append("file", fs.createReadStream(imagePath));

		const response = await axios.post(
			"https://3cc7e4d0b98e.ngrok-free.app/ocr",
			formData,
			{ headers: formData.getHeaders(), httpsAgent: agent }
		);

		console.log("Extracted text:", response);
		return response.data.text || "";
	} catch (error) {
		console.error("Tesseract OCR Error:", error);
		throw new Error("Failed to extract text from image using Tesseract");
	}
};

export const parseFile = async (filePath: string): Promise<string> => {
	if (filePath.endsWith(".pdf")) {
		return await parsePdf(filePath);
	} else if (
		filePath.endsWith(".jpg") ||
		filePath.endsWith(".jpeg") ||
		filePath.endsWith(".png")
	) {
		return await performOCR(filePath);
	} else {
		throw new Error("Unsupported file type for parsing");
	}
};

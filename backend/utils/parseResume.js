const fs = require("fs");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");

/**
 * Extract text from PDF file
 * @param {Buffer} fileBuffer - PDF file buffer
 * @returns {Promise<string>} - Extracted text
 */
const extractFromPDF = async (fileBuffer) => {
  try {
    const pdfData = await pdfParse(fileBuffer);
    return pdfData.text;
  } catch (error) {
    throw new Error(`PDF parsing failed: ${error.message}`);
  }
};

/**
 * Extract text from DOCX file
 * @param {Buffer} fileBuffer - DOCX file buffer
 * @returns {Promise<string>} - Extracted text
 */
const extractFromDOCX = async (fileBuffer) => {
  try {
    const result = await mammoth.extractRawText({ buffer: fileBuffer });
    return result.value;
  } catch (error) {
    throw new Error(`DOCX parsing failed: ${error.message}`);
  }
};

/**
 * Parse resume file and extract text
 * @param {Buffer} fileBuffer - File buffer
 * @param {string} mimeType - MIME type of file
 * @returns {Promise<string>} - Extracted text
 */
const parseResume = async (fileBuffer, mimeType) => {
  if (!fileBuffer || fileBuffer.length === 0) {
    throw new Error("Empty file provided");
  }

  // Determine file type and extract accordingly
  if (
    mimeType === "application/pdf" ||
    mimeType.includes("pdf")
  ) {
    return await extractFromPDF(fileBuffer);
  } else if (
    mimeType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    mimeType.includes("wordprocessingml") ||
    mimeType.includes("docx") ||
    mimeType === "application/msword"
  ) {
    return await extractFromDOCX(fileBuffer);
  } else {
    throw new Error(
      "Unsupported file type. Only PDF and DOCX files are supported."
    );
  }
};

/**
 * Clean and normalize extracted text
 * @param {string} text - Raw extracted text
 * @returns {string} - Cleaned text
 */
const cleanText = (text) => {
  if (!text) return "";

  return text
    .replace(/\s+/g, " ") // Replace multiple spaces with single space
    .replace(/\n\n+/g, "\n") // Reduce multiple newlines
    .trim();
};

module.exports = {
  parseResume,
  extractFromPDF,
  extractFromDOCX,
  cleanText,
};

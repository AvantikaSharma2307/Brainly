import { useState } from "react";
import axios from "axios";
import emailjs from "@emailjs/browser";
import {Toaster,toast} from "react-hot-toast";

export default function SummaryApp() {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [originalSummary, setOriginalSummary] = useState(""); 
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);

  const handleFileUpload = async () => {
    if (!file) return alert("Please select a file first!");
    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const res = await axios.post("https://brainly-kpxa.onrender.com/summarize", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSummary(res.data.summary);
      setOriginalSummary(res.data.summary);
    } catch (err) {
      console.error("Summarization error:", err);
      toast.error("Summarization failed. Check server logs.");
    }
    setLoading(false);
  };

  const handleSendEmail = () => {
    if (!email) return alert("Please enter an email address!");
    if (!summary) return alert("No summary to send!");

    setSendingEmail(true);
    const templateParams = {
      to_name: "Recipient",
      user_name: "Briefly App",
      summary_text: summary,
      user_email: email,
    };

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        (response) => {
          console.log("Email sent:", response);
          toast.success(" Email sent successfully!");
        },
        (error) => {
          console.error("Email sending error:", error);
          toast.error("Failed to send email. Check console.");
        }
      )
      .finally(() => setSendingEmail(false));
  };

  const handleResetSummary = () => {
    setSummary(originalSummary);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <Toaster position="top-right" />
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full space-y-6">
        <h2 className="text-3xl font-bold text-center text-purple-700">
          Quick Summarizer & Share
        </h2>

        {/* File Upload */}
        <div className="flex flex-col space-y-2">
          <label className="text-gray-700 font-medium">Upload your file:</label>
          <input
            type="file"
            accept=".txt,.doc,.docx,.pdf"
            onChange={(e) => setFile(e.target.files[0])}
            className="border border-gray-300 rounded-lg p-2 cursor-pointer"
          />
          {file && (
            <p className="text-sm text-gray-500">
              Selected: <span className="font-semibold">{file.name}</span> ({file.type || "unknown"})
            </p>
          )}
        </div>

        {/* Summarize Button */}
        <button
          onClick={handleFileUpload}
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg shadow-md transition-all duration-200 disabled:opacity-50"
        >
          {loading ? "Summarizing..." : "Summarize"}
        </button>

        {/* Summary Editor */}
        {summary && (
          <div className="space-y-4">
            <label className="text-gray-700 font-medium">Edit your summary:</label>
            <textarea
              className="w-full h-48 border border-gray-300 rounded-lg p-3 resize-none focus:ring-2 focus:ring-purple-300 focus:outline-none"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />

            {/* Recipient Email Input */}
            <input
              type="email"
              placeholder="Recipient email"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-300 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Reset & Send Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleResetSummary}
                className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 rounded-lg shadow-md transition-all duration-200"
              >
                Reset
              </button>
              <button
                onClick={handleSendEmail}
                disabled={sendingEmail}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg shadow-md transition-all duration-200 disabled:opacity-50"
              >
                {sendingEmail ? "Sending..." : "Share via Email"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

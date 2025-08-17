# ✨Brainly AI Quick Summarizer & Share ✨

A web app to **upload documents, summarize them, edit the summary, and share via email**! 🚀📄✉️  

---

## 🔥 Features

- 📂 Upload `.txt`, `.doc`, `.docx`, or `.pdf` files  
- 📝 Automatically generate a concise summary  
- ✏️ Edit the generated summary before sharing  
- 📧 Send the summary to any email using EmailJS  
- 📱 Responsive and modern UI  

---

## 🛠 Technologies Used

- **Frontend:** React ⚛️, Tailwind CSS 🎨, Axios 🔗, EmailJS 📧  
- **Backend:** Node.js 🟢, Express 🚂, CORS 🌐  
- **Deployment:** Render 🌍  
- **Other:** Environment variables for secure API keys 🔑  

---

## 🚀 Installation

### Clone the repository
```bash
git clone https://github.com/AvantikaSharma2307/Brainly.git
cd Brainly
Backend Setup
cd server
npm install
```

### Create a .env file in the backend directory:
```bash
PORT=5000
EMAILJS_SERVICE_ID=your_service_id
EMAILJS_TEMPLATE_ID=your_template_id
EMAILJS_PUBLIC_KEY=your_public_key
```


### Start the backend server:
```bash
npm start

Frontend Setup
cd frontend
npm install
```


### Create a .env file in the frontend directory:
```bash

VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_BACKEND_URL=http://localhost:5000
```

### Start the frontend:
```bash
npm run dev
```

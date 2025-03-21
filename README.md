# 🌙 TorotheSleep - Word Cloud App  

A **mobile-first** web app where users enter the word **"sleep"** in their local language. The app stores entries in **Firebase** and generates a **dynamic word cloud** using React and WordCloud.js.  

## 🚀 Features  
✅ **Enter 'Sleep' in Any Language**  
✅ **Real-time Firebase Firestore Integration**  
✅ **Dark Mode Toggle** 🌙 ☀️  
✅ **Mobile-First Responsive Design** 📱  
✅ **Dynamic Word Cloud Visualization**  

## 🛠️ Tech Stack  
- **React + Vite** ⚛️  
- **Firebase Firestore** 🔥  
- **WordCloud.js** 🌥️  
- **ShadCN UI + TailwindCSS** 🎨  

## 📸 Screenshot  
![WordCloud Sleep App](./screenshot.png)  

## 🎯 Installation & Setup  
1️⃣ Clone the repository:  
```sh
git clone https://github.com/yourusername/wordcloud-sleep-app.git
cd wordcloud-sleep-app
```
2️⃣ Install dependencies:  
```sh
npm install
```
3️⃣ Configure Firebase in **lib/firebase.js**:  
```js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};
export default firebaseConfig;
```
4️⃣ Start the development server:  
```sh
npm run dev
```

## 📝 Usage  
- Enter a word in the input field and **press Enter or click Submit**.  
- Your word gets **stored in Firestore** and **appears in the word cloud**.  
- Toggle **dark mode** for a better experience!  

## 💡 Contributing  
1. Fork the repo  
2. Create a new branch (`feature/your-feature`)  
3. Commit your changes  
4. Open a pull request!  

## 📜 License  
MIT License 📄  

---

🎉 **Enjoy contributing to the WordCloud Sleep App!** 🚀  
```

---

### **Customizations:**  
- Replace `yourusername` with your **GitHub username**.  
- Add a screenshot in the repo (`screenshot.png`).  
- Update Firebase config with **your credentials**.  

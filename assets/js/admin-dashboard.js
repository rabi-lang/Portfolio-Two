
// Initialize Firebase (MUST come first)
const firebaseConfig = {
  apiKey: "AIzaSyBLMhX11s_ltjUHyghmF5Rh8Bkv7a0_yhE",
  authDomain: "rabi-portfolio.firebaseapp.com",
  projectId: "rabi-portfolio",
  storageBucket: "rabi-portfolio.appspot.com",
  messagingSenderId: "249024862444",
  appId: "1:249024862444:web:3795c8f3eb7335f7ff2dc9"
};
firebase.initializeApp(firebaseConfig);

// Connect Firestore AFTER Firebase initialized
const db = firebase.firestore();

// Auth check (only logged-in users)
firebase.auth().onAuthStateChanged(user => {
  if (!user) {
    window.location.href = "admin-login.html"; 
  }
});

// Logout function
function logout() {
  firebase.auth().signOut().then(() => {
    window.location.href = "admin-login.html";
  });
}

// Blog form submit
const blogForm = document.getElementById('blogForm');
blogForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('blogTitle').value;
  const description = document.getElementById('blogDescription').value;
  const image = document.getElementById('blogImage').value;

  db.collection('blogs').add({
    title: title,
    description: description,
    image: image,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  }).then(() => {
    document.getElementById('statusMessage').textContent = "✅ Blog published successfully!";
    blogForm.reset();
  }).catch((error) => {
    console.error("Error adding blog: ", error);
    document.getElementById('statusMessage').textContent = "❌ Failed to publish blog.";
  });
});

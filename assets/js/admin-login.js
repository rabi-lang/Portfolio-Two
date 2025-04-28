
    // Firebase config
    const firebaseConfig = {
      apiKey: "AIzaSyBLMhX11s_ltjUHyghmF5Rh8Bkv7a0_yhE",
      authDomain: "rabi-portfolio.firebaseapp.com",
      projectId: "rabi-portfolio",
      storageBucket: "rabi-portfolio.appspot.com",
      messagingSenderId: "249024862444",
      appId: "1:249024862444:web:3795c8f3eb7335f7ff2dc9"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    // Login Handler
    document.getElementById('loginForm').addEventListener('submit', function (e) {
      e.preventDefault();

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          alert("✅ Login Successful!");
          window.location.href = "admin-dashboard.html"; // Redirect after login
        })
        .catch((error) => {
          alert("❌ Login Failed: " + error.message);
        });
    });

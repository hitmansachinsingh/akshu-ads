// Submit Form to Firebase
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
  
    // Save to Firebase
    db.collection('responses').add({
      name: name,
      email: email,
      message: message,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
      alert('Message sent successfully!');
      document.getElementById('contactForm').reset();
    })
    .catch((error) => {
      console.error('Error saving response: ', error);
    });
  });
  
  // Admin View (Password: "admin123")
  function viewResponses() {
    const password = document.getElementById('adminPass').value;
    if (password === 'admin123') {
      document.getElementById('adminLogin').style.display = 'none';
      document.getElementById('responseTable').style.display = 'block';
      
      // Fetch responses
      db.collection('responses').orderBy('timestamp', 'desc').get()
        .then((querySnapshot) => {
          let html = '<h3>Client Responses</h3><table border="1">';
          html += '<tr><th>Name</th><th>Email</th><th>Message</th><th>Date</th></tr>';
          
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            html += `
              <tr>
                <td>${data.name}</td>
                <td>${data.email}</td>
                <td>${data.message}</td>
                <td>${data.timestamp?.toDate().toLocaleString()}</td>
              </tr>
            `;
          });
          
          html += '</table>';
          document.getElementById('responseTable').innerHTML = html;
        });
    } else {
      alert('Wrong password!');
    }
  }
  
  // Show Admin Login (Add a secret link/button on your site)
  // Example: <a href="#" onclick="showAdmin()">Admin</a>
  function showAdmin() {
    document.getElementById('adminLogin').style.display = 'block';
  }
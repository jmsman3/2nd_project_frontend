// const getValue = (id) =>{
//     return document.getElementById(id).value;

//  };

//  const handleRegistration = (event) => {

//     event.preventDefault();
//     const username = getValue("username");
//     const first_name = getValue("first_name");
//     const last_name = getValue("last_name");
//     const email = getValue("email");
//     const password = getValue("password");
//     const confirm_password = getValue("confirm_password");

//     const info = { username, first_name, last_name, email, password, confirm_password };

//     if (password === confirm_password) {
//         // document.getElementById("error").innerText = "";
//         if (/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password)) {
//             fetch(" http://127.0.0.1:8000/user/register/", {
//                 method: "POST",
//                 headers: { "content-type": "application/json" },
//                 body: JSON.stringify(info)
//             })
//             .then(res => res.json())
//             .then(data => {
//                 console.log(data);
//                 if (!data.errors) {
//                     // Show alert message
//                     const process = document.getElementById("wait_btn");

//                     document.getElementById("error").innerText="Check Your Email, Click the Link to activate your account ,then login"
//                     // alert("Check your email for confirmation");
//                     // Redirect to login.html after successful registration
//                     // window.location.href = "login.html";
//                 } else {
//                     document.getElementById("error").innerText = data.errors;
//                 }
//             });
//         } else {
//             document.getElementById("error").innerText = "Password must include minimum eight characters, at least one uppercase letter, one lowercase letter, and one number";
//         }
//     } else {
//         document.getElementById("error").innerText = "Password and confirm password do not match";
//         // alert("Password and confirm password do not match");
//     }
// };

const getValue = (id) => {
  return document.getElementById(id).value;
};

const handleRegistration = (event) => {
  event.preventDefault();

  const username = getValue("username");
  const first_name = getValue("first_name");
  const last_name = getValue("last_name");
  const email = getValue("email");
  const password = getValue("password");
  const confirm_password = getValue("confirm_password");

  const info = {
    username,
    first_name,
    last_name,
    email,
    password,
    confirm_password,
  };

  const signUpButton = document.querySelector(
    'button[type="submit"]:not(#wait_btn)'
  );
  const waitButton = document.getElementById("wait_btn");
  const errorElement = document.getElementById("error");

  // Show "wait..." button and hide "Sign Up" button
  signUpButton.style.display = "none";
  waitButton.style.display = "inline-block";

  if (password === confirm_password) {
    if (
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
        password
      )
    ) {
      fetch("https://social-2nd-project-backend.vercel.app/user/register/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(info),
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.errors) {
            // Show alert message and redirect after successful registration
            errorElement.innerText =
              "Check your email for an activation link. Click it to activate your account and then log in.";
            waitButton.style.display = "none"; // Hide "wait..." button
            signUpButton.style.display = "inline-block"; // Show "Sign Up" button
            // Redirect to login.html after successful registration
            // window.location.href = "login.html";
          } else {
            errorElement.innerText = data.errors;
            waitButton.style.display = "none"; // Hide "wait..." button
            signUpButton.style.display = "inline-block"; // Show "Sign Up" button
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          errorElement.innerText = "An error occurred. Please try again.";
          waitButton.style.display = "none"; // Hide "wait..." button
          signUpButton.style.display = "inline-block"; // Show "Sign Up" button
        });
    } else {
      errorElement.innerText =
        "Password must include minimum eight characters, at least one uppercase letter, one lowercase letter, and one number.";
      waitButton.style.display = "none"; // Hide "wait..." button
      signUpButton.style.display = "inline-block"; // Show "Sign Up" button
    }
  } else {
    errorElement.innerText = "Password and confirm password do not match.";
    waitButton.style.display = "none"; // Hide "wait..." button
    signUpButton.style.display = "inline-block"; // Show "Sign Up" button
  }
};

// Handle user login
// const handleLogin = (event) => {
//     event.preventDefault();
//     const username = getValue("login-username");
//     const password = getValue("login-password");

//     if (username && password) {
//         fetch(" http://127.0.0.1:8000/user/login/", {
//             method: "POST",
//             headers: { "content-type": "application/json" },
//             body: JSON.stringify({ username, password }),
//         })
//         .then(res => res.json())
//         .then(data => {
//          console.log(data);
//             if (data.token && data.user_id) {
//                 localStorage.setItem("token", data.token);
//                 localStorage.setItem("user_id", data.user_id);
//                 window.location.href = "home.html";

//             }
//         });
//     }
//  };

// const handleLogin = (event) => {
//     event.preventDefault();

//     const username = getValue("login-username");
//     const password = getValue("login-password");

//     const loginButton = document.querySelector('button[type="submit"]:not(#wait_btn)');
//     const waitButton = document.getElementById("wait_btn");
//     const errorElement = document.getElementById("error");

//     // Show "wait..." button and hide "Log In" button
//     loginButton.style.display = 'none';
//     waitButton.style.display = 'inline-block';

//     if (username && password) {
//         fetch(" http://127.0.0.1:8000/user/login/", {
//             method: "POST",
//             headers: { "content-type": "application/json" },
//             body: JSON.stringify({ username, password }),
//         })
//         .then(res => res.json())
//         .then(data => {
//             if (data.token && data.user_id) {
//                 localStorage.setItem("token", data.token);
//                 localStorage.setItem("user_id", data.user_id);
//                 window.location.href = "home.html"; // Redirect after successful login
//             } else {
//                 errorElement.innerText = "Invalid username or password.";
//                 waitButton.style.display = 'none'; // Hide "wait..." button
//                 loginButton.style.display = 'inline-block'; // Show "Log In" button
//             }
//         })
//         .catch(error => {
//             console.error('Error:', error);
//             errorElement.innerText = "An error occurred. Please try again.";
//             waitButton.style.display = 'none'; // Hide "wait..." button
//             loginButton.style.display = 'inline-block'; // Show "Log In" button
//         });
//     } else {
//         errorElement.innerText = "Please enter both username and password.";
//         waitButton.style.display = 'none'; // Hide "wait..." button
//         loginButton.style.display = 'inline-block'; // Show "Log In" button
//     }
// };

const handleLogin = (event) => {
  event.preventDefault();

  const username = getValue("login-username");
  const password = getValue("login-password");

  const loginButton = document.querySelector('button[type="submit"]:not(#wait_btn)');
  const waitButton = document.getElementById("wait_btn");
  const errorElement = document.getElementById("error");

  // Show "wait..." button and hide "Log In" button
  loginButton.style.display = 'none';
  waitButton.style.display = 'inline-block';

  if (username && password) {
      fetch("https://social-2nd-project-backend.vercel.app/user/login/", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ username, password }),
      })
      .then(res => res.json())
      .then(data => {
        
          // Check if login is successful by checking for token and user_id
          if (data.token && data.user_id) {
              localStorage.setItem("token", data.token);
              localStorage.setItem("user_id", data.user_id);
              window.location.href = "home.html"; // Redirect after successful login
          } else {
              // Handle specific error messages
              if (data.error === 'incorrect_username') {
                  errorElement.innerText = "Username is incorrect.";
              } else if (data.error === 'incorrect_password') {
                  errorElement.innerText = "Password is incorrect.";
              } else if (data.error === 'invalid_credentials') {
                  errorElement.innerText = "Username and password are both incorrect.";
              } else {
                  errorElement.innerText = "An error occurred. Please try again.";
              }
              // Reset buttons after error
              waitButton.style.display = 'none'; // Hide "wait..." button
              loginButton.style.display = 'inline-block'; // Show "Log In" button
          }
      })
      .catch(error => {
          console.error('Error:', error);
          errorElement.innerText = "An error occurred. Please try again.";
          waitButton.style.display = 'none'; // Hide "wait..." button
          loginButton.style.display = 'inline-block'; // Show "Log In" button
      });
  } else {
      errorElement.innerText = "Please enter both username and password.";
      waitButton.style.display = 'none'; // Hide "wait..." button
      loginButton.style.display = 'inline-block'; // Show "Log In" button
  }
};





const handleLogout = () => {
  const token = localStorage.getItem("token");
  fetch("https://social-2nd-project-backend.vercel.app/user/logout/", {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
      window.location.href = "signup.html";
      // UpdateNavbar();
    });
};

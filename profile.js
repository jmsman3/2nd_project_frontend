// Part one js
document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("user_id");

  if (token && userId) {
    const apiUrl = `https://social-2nd-project-backend.vercel.app/user/user_details/${userId}/`;

    fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Get  profile fields
        document.getElementById("profile-pic").src =
          data.image || "images/LOLER-inspections-1.jpg";

        document.getElementById(
          "user-name"
        ).textContent = `${data.first_name} ${data.last_name}`;

        document.getElementById("user-handle").textContent = `@${data.user}`;

        document.getElementById("user-bio").innerHTML = `<b>Bio-</b> ${
          data.bio || "No bio available."
        }`;

        document.getElementById(
          "user-location"
        ).innerHTML = `<b>Location-</b> ${
          data.location || "No Location available."
        }`;

        document.getElementById("user-mobile").innerHTML = `<b>Mobile-</b> ${
          data.mobile_no || "No Mobile number available."
        }`;

        const currentDate = new Date();
        const options = { year: "numeric", month: "long", day: "numeric" };
        const formattedDate = currentDate.toLocaleDateString("en-US", options);
        document.getElementById(
          "join-date"
        ).textContent = `Joined on ${formattedDate}`;
      })
      .catch((error) => console.error("Error fetching profile data:", error));
  } else {
    console.error("Token or User ID not found. Redirecting to login.");
    window.location.href = "signup.html";
  }
});

// Part two js

// document.addEventListener("DOMContentLoaded", () => {
//   const form = document.querySelector("form");
//   const profileImagePreview = document.getElementById("profileImagePreview");
//   const noImageText = document.getElementById("noImageText");
//   const updateProfileModal = document.getElementById("updateProfileModal");
//   const userId = localStorage.getItem("user_id");
//   const token = localStorage.getItem("token");
//   let base64ImageString = "";

//   if (!userId || !token) {
//     window.location.href = "signup.html";
//     return;
//   }

//   function openModal() {
//     fetch(` http://127.0.0.1:8000/user/user_details/${userId}/`, {
//       method: "GET",
//       headers: {
//         Authorization: `Token ${token}`,
//         "Content-Type": "application/json",
//       },
//       //   headers: {
//       //       'Authorization': `Bearer ${token}`
//       //   }
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("Before update:", data); // Log the data fetched from the server

//         document.getElementById("first_name").value = data.first_name || "";
//         document.getElementById("last_name").value = data.last_name || "";
//         document.getElementById("username").value = data.user || "";
//         document.getElementById("mobile_no").value = data.mobile_no || "";
//         document.getElementById("location").value = data.location || "";
//         document.getElementById("bio").value = data.bio || "";

//         if (data.image) {
//           profileImagePreview.src = data.image;
//           profileImagePreview.classList.remove("hidden");
//           noImageText.classList.add("hidden");
//         } else {
//           profileImagePreview.classList.add("hidden");
//           noImageText.classList.remove("hidden");
//         }

//         updateProfileModal.classList.remove("hidden");
//       })
//       .catch((error) => console.error("Error fetching user data:", error));
//   }

//   function closeModal() {
//     updateProfileModal.classList.add("hidden");
//   }

//   function previewImage(event) {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = function (e) {
//         base64ImageString = e.target.result;
//         profileImagePreview.src = base64ImageString;
//         profileImagePreview.classList.remove("hidden");
//         noImageText.classList.add("hidden");
//       };
//       reader.readAsDataURL(file);
//     }
//   }

//   form.addEventListener("submit", (event) => {
//     event.preventDefault();

//     const formData = new FormData(form);
//     const data = {
//       first_name: formData.get("first_name"),
//       last_name: formData.get("last_name"),
//       user: formData.get("username"),
//       mobile_no: formData.get("mobile_no"),
//       location: formData.get("location"),
//       bio: formData.get("bio"),
//       image: base64ImageString || undefined, // Use existing image if base64ImageString is empty
//     };

//     console.log("Data being sent for update:", data);

//     fetch(` http://127.0.0.1:8000/user/user_details/${userId}/`, {
//       method: "PUT",
//       headers: {
//         Authorization: `Token ${token}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     })
//       .then((response) => response.json())
//       .then((result) => {
//         console.log("Server response after update:", result);

//         if (result.error) {
//           console.error("Error updating profile:", result.error);
//         } else {
//           closeModal();
//           // Update profile section with the new data document.getElementById("profile-pic").src = data.image || document.getElementById("profile-pic").src;
//           document.getElementById(
//             "user-name"
//           ).textContent = `${data.first_name} ${data.last_name}`;
//           document.getElementById("user-handle").textContent = `${data.user}`;
//           document.getElementById("user-bio").textContent = `${data.bio}`;
//           document.getElementById(
//             "user-location"
//           ).textContent = `${data.location}`;
//           document.getElementById(
//             "user-mobile"
//           ).textContent = `${data.mobile_no}`;
//         }
//       })
//       .catch((error) => console.error("Error updating profile:", error));
//   });

//   document
//     .querySelector('a[onclick="openModal()"]')
//     .addEventListener("click", openModal);
//   document.getElementById("picture").addEventListener("change", previewImage);
// });

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const profileImagePreview = document.getElementById("profileImagePreview");
  const noImageText = document.getElementById("noImageText");
  const updateProfileModal = document.getElementById("updateProfileModal");
  const userId = localStorage.getItem("user_id");
  const token = localStorage.getItem("token");
  let base64ImageString = "";

  if (!userId || !token) {
    window.location.href = "signup.html";
    return;
  }

  function openModal() {
    fetch(`https://social-2nd-project-backend.vercel.app/user/user_details/${userId}/`, {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Before update:", data); // Log the data fetched from the server

        document.getElementById("first_name").value = data.first_name || "";
        document.getElementById("last_name").value = data.last_name || "";
        document.getElementById("username").value = data.user || "";
        document.getElementById("mobile_no").value = data.mobile_no || "";
        document.getElementById("location").value = data.location || "";
        document.getElementById("bio").value = data.bio || "";

        if (data.image) {
          profileImagePreview.src = data.image;
          profileImagePreview.classList.remove("hidden");
          noImageText.classList.add("hidden");
        } else {
          profileImagePreview.classList.add("hidden");
          noImageText.classList.remove("hidden");
        }

        updateProfileModal.classList.remove("hidden");
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }

  function closeModal() {
    updateProfileModal.classList.add("hidden");
  }

  function previewImage(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        base64ImageString = e.target.result;
        profileImagePreview.src = base64ImageString;
        profileImagePreview.classList.remove("hidden");
        noImageText.classList.add("hidden");
      };
      reader.readAsDataURL(file);
    }
  }

  async function uploadImageToImgBB(imageFile) {
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await fetch(
      "https://api.imgbb.com/1/upload?key=59c029e1206724ae1f2e3c30d278d10f",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    if (data.success) {
      return data.data.display_url; // Return the uploaded image URL
    } else {
      throw new Error("Image upload failed");
    }
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    let imageUrl = base64ImageString; // Start with the base64 image string

    // Check if a new image is being uploaded
    const fileInput = document.getElementById("picture");
    if (fileInput.files.length > 0) {
      const imageFile = fileInput.files[0];
      try {
        imageUrl = await uploadImageToImgBB(imageFile); // Upload and get the image URL
      } catch (error) {
        console.error("Error uploading image:", error);
        return; // Exit the function on upload error
      }
    }

    const formData = new FormData(form);
    const data = {
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      user: formData.get("username"),
      mobile_no: formData.get("mobile_no"),
      location: formData.get("location"),
      bio: formData.get("bio"),
      image: imageUrl || undefined, // Use the uploaded image URL
    };

    console.log("Data being sent for update:", data);

    fetch(`https://social-2nd-project-backend.vercel.app/user/user_details/${userId}/`, {
      method: "PUT",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Server response after update:", result);

        if (result.error) {
          console.error("Error updating profile:", result.error);
        } else {
          closeModal();
          // Update profile section with the new data
          document.getElementById("profile-pic").src =
            imageUrl || document.getElementById("profile-pic").src; // Update profile pic
          document.getElementById(
            "user-name"
          ).textContent = `${data.first_name} ${data.last_name}`;
          document.getElementById("user-handle").textContent = `${data.user}`;
          document.getElementById("user-bio").textContent = `${data.bio}`;
          document.getElementById(
            "user-location"
          ).textContent = `${data.location}`;
          document.getElementById(
            "user-mobile"
          ).textContent = `${data.mobile_no}`;
        }
      })
      .catch((error) => console.error("Error updating profile:", error));
  });

  document
    .querySelector('a[onclick="openModal()"]')
    .addEventListener("click", openModal);
  document.getElementById("picture").addEventListener("change", previewImage);
});

// Part 3
document.addEventListener("DOMContentLoaded", function () {
  // Fetching userId and token from localStorage
  const userId = localStorage.getItem("user_id");
  const token = localStorage.getItem("token");

  // Check if userId and token are present
  if (!userId || !token) {
    console.error("User ID or Token not found in localStorage");
    return;
  }

  console.log("User ID:", userId, "Token:", token);

  // Fetch and display user posts
  fetchAndDisplayUserPosts(userId, token);
});

async function fetchAndDisplayUserPosts(userId, token) {
  try {
    console.log("Fetching posts for User ID:", userId);

    const apiUrl = `https://social-2nd-project-backend.vercel.app/crud/user/${userId}/posts/`;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("Response Status:", response.status);

    const responseText = await response.text(); // Raw response
    // console.log("Raw Response:", responseText);

    if (!response.ok) {
      throw new Error(`Error fetching posts: ${response.statusText}`);
    }

    const posts = JSON.parse(responseText); // Parse JSON manually
    console.log("Fetched posts:", posts);

    // Verify that posts is an array
    if (!Array.isArray(posts)) {
      throw new Error("Fetched posts is not an array");
    }

    const postsContainer = document.getElementById("posts-container");

    // Check if posts-container exists in the DOM
    if (!postsContainer) {
      throw new Error("Posts container element not found");
    }

    postsContainer.innerHTML = ""; // Clear any existing content

    // Iterate over posts and generate HTML for each post
    posts.forEach((post) => {
      console.log("Processing post:", post);

      const postElement = document.createElement("div");
      postElement.classList.add(
        "bg-white",
        "shadow-md",
        "rounded-md",
        "p-6",
        "mb-4",
        "w-full", // Full width on small screens
        "md:w-6/12", // 4/12 width on medium screens and above
        "mx-auto" // Center horizontally with auto margin
      );
      
      // Check if post image exists, if not, use a default image
      const postImage = post.image
        ? post.image
        : "images/LOLER-inspections-1.jpg"; // Replace 'default-image.jpg' with the path to your default image

        let postContent = `
                <div class="flex justify-between items-start mb-4">
                    <div class="flex items-center space-x-3">
                        <div class="w-10 h-10 rounded-full bg-gray-300">
                           
                    
                     <img  data-user-id="${post.user_id}"  src="${post.profile_image}" 
class="post-image-click w-16 h-10 rounded-full object-cover" alt="Post Image">

                        </div>
                        <div>
                            
                            <div class="flex justify-between items-center gap-1">
                                <p class="font-semibold post-name-click" data-user-id="${post.user_id}">${post.post_creator}</p>
                                <p class="font-semibold text-blue-600 post-creator" data-user-id="${post.user_id}">View Profile</p>
                            </div>

                            
                            <p class="text-sm text-gray-500">${new Date(post.created_at).toLocaleString()}</p>
                        </div>
                    </div>
                    <div>
                        <button class="text-gray-500 hover:text-gray-700 toggle-btn">
                            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6h18M3 12h18m-9 6h9"></path>
                            </svg>
                            <span class="sr-only">More options</span>
                        </button>
                        <div class="edit-delete-buttons hidden flex-col space-y-2 mt-2">
                            <button class="text-xs bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 delete-btn" data-post-id="${post.id}">Delete</button>
                        </div>
                    </div>
                </div>
            `;
            if (post.caption) {
              postContent += `<p class="text-gray-800 mt-2">${post.caption}</p>`;
          }
            if (post.image) {
              postContent += `<img src="${post.image}" alt="Post Image" class="w-full h-auto rounded mb-4">`;
          }
          if (post.video) {
              postContent += `<video controls class="w-full h-auto rounded mb-4"><source src="${post.video}" type="video/mp4">Your browser does not support the video tag.</video>`;
          }
         
           
      postElement.innerHTML = postContent;
      postsContainer.appendChild(postElement);

      // Add functionality for toggling edit-delete buttons
      const toggleButton = postElement.querySelector(".toggle-btn");
      const editDeleteButtons = postElement.querySelector(
        ".edit-delete-buttons"
      );

      toggleButton.addEventListener("click", () => {
        editDeleteButtons.classList.toggle("hidden");
      });

      // Add functionality for deleting posts
      const deleteButton = postElement.querySelector(".delete-btn");
      deleteButton.addEventListener("click", async () => {
        const postId = deleteButton.getAttribute("data-post-id");
        console.log("Deleting post ID:", postId);

        try {
          const deleteResponse = await fetch(
            `https://social-2nd-project-backend.vercel.app/crud/posts/${postId}/`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Token ${token}`,
              },
            }
          );

          if (!deleteResponse.ok) {
            throw new Error(
              `Error deleting post: ${deleteResponse.statusText}`
            );
          }

          postElement.remove();
          alert(`Post deleted successfully`);
          console.log(`Post ${postId} deleted successfully`);
        } catch (error) {
          console.error(`Error deleting post ${postId}:`, error);
        }
      });
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

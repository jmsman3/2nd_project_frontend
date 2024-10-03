async function fetchUserData() {
    let userId; // Declare a variable to store the userId

    try {
        // Fetch posts from the API
        const response = await fetch('http://127.0.0.1:8000/crud/posts/', {
            method: 'GET',
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`  // Include token for authenticated requests
            }
        });

        if (!response.ok) {
            throw new Error(`Error fetching posts: ${response.statusText}`);
        }

        const posts = await response.json(); 

        // Assume the user ID is the same for all posts
        if (posts.length > 0) {
            userId = posts[0].user_id; // Get the user ID from the first post
            console.log("Redirecting to profile of user ID:", userId);
        } else {
            console.warn("No posts found.");
            return; // Exit if no posts are available
        }

        // Fetch particular user data using the obtained userId
        const token = localStorage.getItem("token");
        const apiUrl = `http://127.0.0.1:8000/crud/particular_user/${userId}/`;

        const userResponse = await fetch(apiUrl, {
            method: "GET",
            headers: {
                Authorization: `Token ${token}`,
                "Content-Type": "application/json",
            },
        });



        const userData = await userResponse.json();
        console.log("Particular user data:", userData);

        // Update the HTML with dynamic data
        document.getElementById('user-name-particular').textContent = `${userData.profile.first_name} ${userData.profile.last_name}`;
        document.getElementById('user-handle-particular').textContent = `@${userData.profile.username}`;
        document.getElementById('user-bio-particular').textContent = userData['More Bio-Data'].bio;
        document.getElementById('user-location-particular').textContent = userData['More Bio-Data'].location;
        document.getElementById('user-mobile-particular').textContent = userData['More Bio-Data'].mobile;

        // Assuming join date is a field in the profile data
        document.getElementById('join-date-particular').textContent = `Joined: ${new Date(userData.profile.created_at).toLocaleDateString()}`;

        // Update profile picture if available
        if (userData.profile.profile_picture) {
            document.getElementById('profile-pic-particular').src = userData.profile.profile_picture;
        } else {
            document.getElementById('profile-pic-particular').src = 'images/LOLER-inspections-1.jpg'; // fallback image
        }

    } catch (error) {
        console.error("Error in fetchUserData:", error);
    }
}

// Call the function to fetch user data
document.addEventListener("DOMContentLoaded", fetchUserData);
  document.addEventListener("DOMContentLoaded", function () {
    // Fetching userId and token from localStorage
    // const userId = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");

    // Check if userId and token are present
    if (!userId || !token) {
        console.error("User ID or Token not found in localStorage");
        return;
    }

    console.log("User ID:", userId, "Token:", token);

    // Fetch and display user posts
    fetchAndDisplayUser_all_Posts(userId, token);
});


//part 3
async function fetchAndDisplayUser_all_Posts(userId, token) {
    try {
        console.log("Fetching posts for User ID:", userId);

        const apiUrl = `http://127.0.0.1:8000/crud/particular_user/${userId}/`;
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                Authorization: `Token ${token}`,
                "Content-Type": "application/json",
            },
        });

        console.log("Response Status:", response.status);

        const responseText = await response.text(); // Raw response
        // console.log("Raw Response:", responseText); // Log raw response for debugging

        if (!response.ok) {
            throw new Error(`Error fetching posts: ${response.statusText}`);
        }

        const posts = JSON.parse(responseText); // Parse JSON
        console.log("Fetched posts:", posts); // Log fetched posts

        // Verify that posts is an array
        if (!Array.isArray(posts)) {
            throw new Error("Fetched posts is not an array");
        }

        const postsContainer = document.getElementById("posts-container-particular-user");
        console.log("Posts Container:", postsContainer); // Log the posts container element

        // Check if posts-container exists in the DOM
        if (!postsContainer) {
            throw new Error("Posts container element not found");
        }

        postsContainer.innerHTML = ""; // Clear any existing content

        // Iterate over posts and generate HTML for each post
        posts.forEach((post) => {
            console.log("Processing post:", post); // Log each post being processed

            const postElement = document.createElement("div");
            postElement.classList.add(
                "bg-white",
                "shadow-md",
                "rounded-md",
                "p-6",
                "mb-4",
                "w-full", // Full width on small screens
                "md:w-6/12", // 6/12 width on medium screens and above
                "mx-auto" // Center horizontally with auto margin
            );

            // Check if post image exists, if not, use a default image
            const postImage = post.image ? post.image : 'images/LOLER-inspections-1.jpg'; // Default image path

            let postContent = `
                <div class="flex justify-between items-start mb-4">
                    <div class="flex items-center space-x-3">
                        <div class="w-10 h-10 rounded-full bg-gray-300"> 
                            <img src="${postImage}" alt="Post Image" class="w-full h-full object-cover rounded-full">
                        </div>
                        <div>
                            <p class="font-semibold">${post.post_creator}</p>
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
                            <!-- Removed delete button here -->
                        </div>
                    </div>
                </div>`;

            // Include post image if available
            if (post.image) {
                postContent += `<img src="${post.image}" alt="Post Image" class="w-full h-auto rounded mb-4">`;
            }
            // Include video if available
            if (post.video) {
                postContent += `<video controls class="w-full h-auto rounded mb-4"><source src="${post.video}" type="video/mp4">Your browser does not support the video tag.</video>`;
            }
            // Include caption if available
            if (post.caption) {
                postContent += `<p class="text-gray-800 mt-2">${post.caption}</p>`;
            }

            postElement.innerHTML = postContent; // Set the post element's inner HTML
            postsContainer.appendChild(postElement); // Append post element to the container

            // Add functionality for toggling edit-delete buttons
            const toggleButton = postElement.querySelector(".toggle-btn");
            const editDeleteButtons = postElement.querySelector(".edit-delete-buttons");

            toggleButton.addEventListener("click", () => {
                editDeleteButtons.classList.toggle("hidden"); // Toggle visibility
            });
        });
    } catch (error) {
        console.error("Error fetching posts:", error); // Log error
    }
}

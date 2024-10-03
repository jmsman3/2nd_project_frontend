document.getElementById('post-button').addEventListener('click', async () => {
    // Get the form elements
    const content = document.getElementById('post-content').value;
    const imageFile = document.getElementById('post-image').files[0];
    const videoFile = document.getElementById('post-video').files[0];

    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');
    console.log('Retrieved token:', token);

    // Prepare the data to send
    const data = {
        caption: content,
    };

    // Add image and video URLs if files are present
    if (imageFile) {
        const imageUrl = await uploadFile(imageFile);
        data.image = imageUrl;
    }
    if (videoFile) {
        const videoUrl = await uploadFile(videoFile);
        data.video = videoUrl;
    }

    try {
        const response = await fetch('http://127.0.0.1:8000/crud/posts/', {
            method: 'POST',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const responseData = await response.json();

        if (response.ok) {
            console.log('Post created successfully:', responseData);
        } else {
            console.error('Error creating post:', responseData);
        }
    } catch (error) {
        console.error('Network error:', error);
    }
});

// Function to upload files and get URLs (dummy implementation)
async function uploadFile(file) {
    // Replace with your actual file upload logic and URL return
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
    });
}

const REPO_OWNER = "vishantrathi";
const REPO_NAME = "woolconnect";
const GITHUB_TOKEN = ""; // Optional: Add your GitHub personal access token to avoid rate limits

async function fetchContributors() {
  const contributorsContainer = document.getElementById("contributors");
  const canvas = document.createElement("canvas"); // Create a hidden canvas for certificate generation
  const ctx = canvas.getContext("2d");



  try {
    // Fetch contributors from the GitHub API
    const response = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contributors?per_page=100`,
      {
        headers: GITHUB_TOKEN ? { Authorization: `token ${GITHUB_TOKEN}` } : {},
      }
    );

    

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(`Failed to fetch contributors: ${errorDetails}`);


    }
    
    const contributors = await response.json();

    contributors.forEach((contributor) => {
      // Create a card for each contributor
      const card = document.createElement("div");
      card.className = "contributor-card";

      // Profile image
      const img = document.createElement("img");
      img.src = contributor.avatar_url;
      img.alt = contributor.login;



      // GitHub username
      const name = document.createElement("h5");
      name.textContent = contributor.login;

      // GitHub profile link
      const githubLink = document.createElement("a");
      githubLink.href = contributor.html_url;
      githubLink.target = "_blank";
      githubLink.textContent = "GitHub Profile";



      // Generate Certificate Button
const button = document.createElement("button");
button.textContent = "Certificate";
button.classList.add("certificate-button"); // Apply styling
button.addEventListener("click", () => {
  generateCertificate(contributor.login, contributor.avatar_url);
});

      // Append elements to card
      card.appendChild(img);
      card.appendChild(name);
      card.appendChild(githubLink);
      card.appendChild(button);



      // Append card to container
      contributorsContainer.appendChild(card);
    });

    // Function to generate a certificate
function generateCertificate(username, avatarUrl) {
  // Set canvas size
  canvas.width = 1600;
  canvas.height = 1000;

  // Background gradient (shades of gray)
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, "#f0f0f0"); // Light gray
  gradient.addColorStop(1, "#ffffff"); // White
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Decorative border (light gray)
  ctx.strokeStyle = "#d3d3d3"; // Light gray
  ctx.lineWidth = 20;
  ctx.strokeRect(50, 50, canvas.width - 100, canvas.height - 100);

  // Certificate title (dark gray)
  ctx.fillStyle = "#333333"; // Dark gray for text
  ctx.font = "bold 80px Georgia";
  ctx.textAlign = "center";
  ctx.fillText("Certificate of Contribution", canvas.width / 2, 150);

  // Decorative underline (dark gray)
  ctx.strokeStyle = "#333333"; // Dark gray
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2 - 400, 180);
  ctx.lineTo(canvas.width / 2 + 400, 180);
  ctx.stroke();

  // Add user's GitHub image (circular)
  const image = new Image();
  image.crossOrigin = "Anonymous";
  image.src = avatarUrl;
  image.onload = () => {
    const imageSize = 200;
    ctx.save();
    ctx.beginPath();
    ctx.arc(canvas.width / 2, 300, imageSize / 2, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(
      image,
      canvas.width / 2 - imageSize / 2,
      200,
      imageSize,
      imageSize
    );
    ctx.restore();

    // GitHub username under the image (dark gray)
    ctx.font = "bold 50px Arial";
    ctx.fillStyle = "#333333"; // Dark gray for username
    ctx.fillText(username, canvas.width / 2, 500);

    // Certificate content (light gray)
    ctx.font = "35px Arial";
    const content = `This certificate is proudly presented to ${username} for their valuable 
    contribution to Wool_Connect in Social Winter of Code (SWoC) 
    from January 1, 2025 to March 1, 2025.`;
    const contentLines = content.split("\n");
    contentLines.forEach((line, index) => {
      ctx.fillText(line.trim(), canvas.width / 2, 600 + index * 40);
    });

    // Signature with decorative underline (dark gray)
    ctx.font = "italic 30px Georgia";
    ctx.fillText("Vishant Rathi", canvas.width / 1.5, 850);
    ctx.strokeStyle = "#333333"; // Dark gray
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 1.5 - 150, 860);
    ctx.lineTo(canvas.width / 1.5 + 150, 860);
    ctx.stroke();

    // Generated date (dark gray)
    const date = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString();
    ctx.font = "25px Arial";
    ctx.fillText(`Generated on: ${date}`, canvas.width / 5, 900);

    // Open the certificate in a new tab and display the certificate image
    const certWindow = window.open("", "_blank");
    certWindow.document.write(`
          <html>
            <head>
              <title>Certificate of Contribution</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  text-align: center;
                  background-color:white);
                  padding: 20px;
                }
                h1 {
                  color: #5a4637;
                }
                img {
                  border: 10px solidrgb(207, 204, 195);
                  border-radius: 12px;
                  margin-top: 20px;
                  max-width: 100%;
                  height: auto;
                }
                .download-btn {
                  margin-top: 30px;
                  padding: 15px 30px;
                  background-color:rgb(22, 22, 20);
                  color: white;
                  font-size: 18px;
                  border: none;
                  border-radius: 8px;
                  cursor: pointer;
                }
                .download-btn:hover {
                  background-color:rgb(104, 103, 98);
                }
              </style>
            </head>
            <body>
              <h1>Certificate of Contribution</h1>
              <img src="${canvas.toDataURL('image/png')}" alt="Certificate" />
              <br />
              <button class="download-btn" onclick="downloadCertificate()">Download Certificate</button>
              <script>
                function downloadCertificate() {
                  const link = document.createElement('a');
                  link.download = '${username}_certificate.png';
                  link.href = "${canvas.toDataURL('image/png')}";
                  link.click();
                }
              </script>
            </body>
          </html>
        `);
      };
    }
  } catch (error) {
    console.error("Error fetching contributors:", error);

    // Show error message on the page
    const errorMessage = document.createElement("p");
    contributorsContainer.innerHTML = "<p style='color: red; font-weight:bold;'>Failed to load contributors. Please check your internet connection or try again later.</p>";
contributorsContainer.appendChild(errorMessage);
  }
}

// Fetch and render contributors on page load
fetchContributors();
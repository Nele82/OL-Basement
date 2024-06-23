// Loader bar funcion
export const loadBar = () => {
    // Get the 'loading' container
    const loadingContainer = document.getElementById('loading')
    // Get the 'loader' container
    const loaderContainer = document.getElementById('loader')

    // Display property: 'none' => 'flex' (Loader bar)
    loadingContainer.style.display = 'flex'

    // Create spans for each character
    for (let i = 0; i < 5; i++) {
        const span = document.createElement('span')
        span.innerHTML = `&#128230;`;
        span.classList.add('loader-char') // Add a class for styling
    
        // Set animation delay for fading effect
        span.style.animationDelay = `${i * 0.1}s`
    
        // Append the span to the container
        loaderContainer.appendChild(span)
    }
}

// Removes the loading bar & message
export const removeLoadBar = () => {
    // Get the 'loading' container
    const loadingContainer = document.getElementById('loading')
    // Get the 'loader' container
    const loaderContainer = document.getElementById('loader')

    // Remove all child elements (spans)
    while (loaderContainer.firstChild) {
        loaderContainer.removeChild(loaderContainer.firstChild)
    }
    // Display property: 'flex' => 'none'
    loadingContainer.style.display = 'none'
}
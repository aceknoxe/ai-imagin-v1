export const downloadImage = async (imageUrl: string, prompt: string) => {
  try {
    // For base64 images
    if (imageUrl.startsWith('data:image')) {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = `${prompt.slice(0, 30)}.png`; // First 30 chars of prompt as filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } 
    // For URL images
    else {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${prompt.slice(0, 30)}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }
  } catch (error) {
    console.error('Download error:', error);
    alert('Failed to download image. Please try again.');
  }
}; 
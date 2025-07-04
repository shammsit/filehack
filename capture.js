(async () => {
  // Load external scripts
  const loadScript = (src) => new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = src;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });

  // Inject html2canvas and jsPDF
  await loadScript("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js");
  await loadScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js");

  const pages = document.querySelectorAll('[data-testid="DocumentViewer"] > div');
  if (!pages.length) {
    alert("No pages found. Make sure you are on the course page.");
    return;
  }

  const images = [];

  for (let i = 0; i < pages.length; i++) {
    pages[i].scrollIntoView({ behavior: "smooth", block: "center" });
    await new Promise(res => setTimeout(res, 1000));

    const canvas = await html2canvas(pages[i]);
    const dataURL = canvas.toDataURL("image/jpeg", 1.0);
    images.push(dataURL);
  }

  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();

  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    const imgProps = pdf.getImageProperties(img);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    if (i !== 0) pdf.addPage();
    pdf.addImage(img, 'JPEG', 0, 0, pdfWidth, pdfHeight);
  }

  pdf.save("captured-course.pdf");
})();
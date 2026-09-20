// Central registry of every tool on the site.
// Used for homepage grid, routing, sitemap generation, and search.

export const categories = [
  { id: 'calculators', name: 'Calculators', color: '#E8B34A' },
  { id: 'converters', name: 'Unit Converters', color: '#4F9D8C' },
  { id: 'text', name: 'Text & Code Tools', color: '#7DAAE0' },
  { id: 'files', name: 'File Tools', color: '#D98B5F' },
  { id: 'images', name: 'Image Tools', color: '#C388D6' },
];

export const tools = [
  // Calculators
  { slug: 'gpa-calculator', name: 'GPA Calculator', category: 'calculators', desc: 'Calculate your semester GPA using an editable HEC-standard 4.0 grading scale.' },
  { slug: 'cgpa-calculator', name: 'CGPA Calculator', category: 'calculators', desc: 'Combine multiple semester GPAs and credit hours into your cumulative CGPA.' },
  { slug: 'percentage-to-gpa', name: 'Percentage to GPA Converter', category: 'calculators', desc: 'Convert a percentage marksheet score into an estimated GPA.' },
  { slug: 'age-calculator', name: 'Age Calculator', category: 'calculators', desc: 'Find your exact age in years, months and days from your date of birth.' },
  { slug: 'bmi-calculator', name: 'BMI Calculator', category: 'calculators', desc: 'Check your Body Mass Index from height and weight.' },
  { slug: 'loan-calculator', name: 'Loan / EMI Calculator', category: 'calculators', desc: 'Work out monthly installments for any loan amount, rate and term.' },
  { slug: 'salary-tax-calculator', name: 'Salary Tax Calculator (Pakistan)', category: 'calculators', desc: 'Estimate your monthly income tax under Pakistan\u2019s salary tax slabs.' },
  { slug: 'percentage-calculator', name: 'Percentage Calculator', category: 'calculators', desc: 'Quickly find percentages, percentage change, and ratios.' },

  // Converters
  { slug: 'length-converter', name: 'Length Converter', category: 'converters', desc: 'Convert between kilometers, miles, feet, meters and inches.' },
  { slug: 'weight-converter', name: 'Weight Converter', category: 'converters', desc: 'Convert between kg, pounds, grams and tola.' },
  { slug: 'currency-converter', name: 'Currency Converter', category: 'converters', desc: 'Convert between PKR, USD, AED, SAR and more using editable rates.' },
  { slug: 'temperature-converter', name: 'Temperature Converter', category: 'converters', desc: 'Convert between Celsius, Fahrenheit and Kelvin.' },
  { slug: 'marla-kanal-converter', name: 'Marla / Kanal Converter', category: 'converters', desc: 'Convert between Marla, Kanal and Square Feet for property deals.' },

  // Text & Code
  { slug: 'word-counter', name: 'Word Counter', category: 'text', desc: 'Count words, characters, sentences and reading time instantly.' },
  { slug: 'case-converter', name: 'Case Converter', category: 'text', desc: 'Switch text between UPPERCASE, lowercase, Title Case and Sentence case.' },
  { slug: 'json-formatter', name: 'JSON Formatter', category: 'text', desc: 'Format, validate and beautify JSON data.' },
  { slug: 'base64-tool', name: 'Base64 Encoder / Decoder', category: 'text', desc: 'Encode text to Base64 or decode Base64 back to text.' },
  { slug: 'password-generator', name: 'Password Generator', category: 'text', desc: 'Generate strong, random passwords with custom rules.' },
  { slug: 'qr-generator', name: 'QR Code Generator', category: 'text', desc: 'Turn any link or text into a downloadable QR code.' },

  // File tools
  { slug: 'image-to-pdf', name: 'Image to PDF', category: 'files', desc: 'Combine one or more images into a single PDF file.' },
  { slug: 'pdf-merge-split', name: 'PDF Merge / Split', category: 'files', desc: 'Merge several PDFs into one, or split pages out of a PDF.' },
  { slug: 'zip-create', name: 'ZIP File Creator', category: 'files', desc: 'Select multiple files and download them as a single ZIP archive.' },
  { slug: 'zip-extract', name: 'ZIP Extractor', category: 'files', desc: 'Open a ZIP archive in your browser and download files inside it.' },
  { slug: 'word-to-pdf', name: 'Word to PDF', category: 'files', desc: 'Convert a .docx document\u2019s text into a PDF file.' },
  { slug: 'pdf-to-word', name: 'PDF to Word', category: 'files', desc: 'Extract text from a PDF into an editable .docx file.' },
  { slug: 'excel-to-pdf', name: 'Excel to PDF', category: 'files', desc: 'Convert spreadsheet data from .xlsx into a formatted PDF table.' },
  { slug: 'pdf-to-excel', name: 'PDF to Excel', category: 'files', desc: 'Pull tabular text out of a PDF into an .xlsx spreadsheet.' },

  // Images
  { slug: 'image-compressor', name: 'Image Compressor', category: 'images', desc: 'Shrink image file size while keeping visual quality.' },
  { slug: 'image-format-converter', name: 'Image Format Converter', category: 'images', desc: 'Convert images between JPG, PNG and WebP.' },
  { slug: 'passport-photo', name: 'Passport Size Photo Maker', category: 'images', desc: 'Crop and resize any photo to standard passport / CNIC / visa dimensions.' },
  { slug: 'image-resizer', name: 'Image Resizer', category: 'images', desc: 'Resize an image to exact pixel dimensions.' },
];

export const getToolBySlug = (slug) => tools.find(t => t.slug === slug);
export const getToolsByCategory = (categoryId) => tools.filter(t => t.category === categoryId);

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';
import { AdminRoute } from './components/ProtectedRoute';
import Home from './pages/Home';
import Category from './pages/Category';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Blog from './pages/Blog';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Admin from './pages/Admin';
import GpaVsCgpa from './pages/blog/GpaVsCgpa';
import HecScale from './pages/blog/HecScale';
import CompressImage from './pages/blog/CompressImage';

import GpaCalculator from './pages/tools/GpaCalculator';
import CgpaCalculator from './pages/tools/CgpaCalculator';
import PercentageToGpa from './pages/tools/PercentageToGpa';
import AgeCalculator from './pages/tools/AgeCalculator';
import BmiCalculator from './pages/tools/BmiCalculator';
import LoanCalculator from './pages/tools/LoanCalculator';
import SalaryTaxCalculator from './pages/tools/SalaryTaxCalculator';
import PercentageCalculator from './pages/tools/PercentageCalculator';

import LengthConverter from './pages/tools/LengthConverter';
import WeightConverter from './pages/tools/WeightConverter';
import CurrencyConverter from './pages/tools/CurrencyConverter';
import TemperatureConverter from './pages/tools/TemperatureConverter';
import MarlaKanalConverter from './pages/tools/MarlaKanalConverter';

import WordCounter from './pages/tools/WordCounter';
import CaseConverter from './pages/tools/CaseConverter';
import JsonFormatter from './pages/tools/JsonFormatter';
import Base64Tool from './pages/tools/Base64Tool';
import PasswordGenerator from './pages/tools/PasswordGenerator';
import QrGenerator from './pages/tools/QrGenerator';

import ImageToPdf from './pages/tools/ImageToPdf';
import PdfMergeSplit from './pages/tools/PdfMergeSplit';
import ZipCreate from './pages/tools/ZipCreate';
import ZipExtract from './pages/tools/ZipExtract';
import WordToPdf from './pages/tools/WordToPdf';
import PdfToWord from './pages/tools/PdfToWord';
import ExcelToPdf from './pages/tools/ExcelToPdf';
import PdfToExcel from './pages/tools/PdfToExcel';

import ImageCompressor from './pages/tools/ImageCompressor';
import ImageFormatConverter from './pages/tools/ImageFormatConverter';
import PassportPhoto from './pages/tools/PassportPhoto';
import ImageResizer from './pages/tools/ImageResizer';

function NotFound() {
  return (
    <div className="container" style={{ padding: '80px 24px', textAlign: 'center' }}>
      <h1>404 \u2014 Page not found</h1>
      <p>The tool or page you're looking for doesn't exist.</p>
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AuthProvider>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:id" element={<Category />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<Privacy />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
            <Route path="/blog/gpa-vs-cgpa" element={<GpaVsCgpa />} />
            <Route path="/blog/hec-grading-scale" element={<HecScale />} />
            <Route path="/blog/compress-image-without-losing-quality" element={<CompressImage />} />

            <Route path="/tools/gpa-calculator" element={<GpaCalculator />} />
            <Route path="/tools/cgpa-calculator" element={<CgpaCalculator />} />
            <Route path="/tools/percentage-to-gpa" element={<PercentageToGpa />} />
            <Route path="/tools/age-calculator" element={<AgeCalculator />} />
            <Route path="/tools/bmi-calculator" element={<BmiCalculator />} />
            <Route path="/tools/loan-calculator" element={<LoanCalculator />} />
            <Route path="/tools/salary-tax-calculator" element={<SalaryTaxCalculator />} />
            <Route path="/tools/percentage-calculator" element={<PercentageCalculator />} />

            <Route path="/tools/length-converter" element={<LengthConverter />} />
            <Route path="/tools/weight-converter" element={<WeightConverter />} />
            <Route path="/tools/currency-converter" element={<CurrencyConverter />} />
            <Route path="/tools/temperature-converter" element={<TemperatureConverter />} />
            <Route path="/tools/marla-kanal-converter" element={<MarlaKanalConverter />} />

            <Route path="/tools/word-counter" element={<WordCounter />} />
            <Route path="/tools/case-converter" element={<CaseConverter />} />
            <Route path="/tools/json-formatter" element={<JsonFormatter />} />
            <Route path="/tools/base64-tool" element={<Base64Tool />} />
            <Route path="/tools/password-generator" element={<PasswordGenerator />} />
            <Route path="/tools/qr-generator" element={<QrGenerator />} />

            <Route path="/tools/image-to-pdf" element={<ImageToPdf />} />
            <Route path="/tools/pdf-merge-split" element={<PdfMergeSplit />} />
            <Route path="/tools/zip-create" element={<ZipCreate />} />
            <Route path="/tools/zip-extract" element={<ZipExtract />} />
            <Route path="/tools/word-to-pdf" element={<WordToPdf />} />
            <Route path="/tools/pdf-to-word" element={<PdfToWord />} />
            <Route path="/tools/excel-to-pdf" element={<ExcelToPdf />} />
            <Route path="/tools/pdf-to-excel" element={<PdfToExcel />} />

            <Route path="/tools/image-compressor" element={<ImageCompressor />} />
            <Route path="/tools/image-format-converter" element={<ImageFormatConverter />} />
            <Route path="/tools/passport-photo" element={<PassportPhoto />} />
            <Route path="/tools/image-resizer" element={<ImageResizer />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}

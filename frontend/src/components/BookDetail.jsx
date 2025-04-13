import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaArrowLeft, FaDownload } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';
import axios from 'axios';

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { currentLang } = useLanguage();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pdfContent, setPdfContent] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/books/${id}`);
        setBook(response.data);
        setLoading(false);
      } catch (err) {
        setError(t('error.fetchingBook'));
        setLoading(false);
      }
    };

    fetchBook();
  }, [id, t]);

  useEffect(() => {
    const fetchPdfContent = async () => {
      if (!book) return;
      
      try {
        const response = await axios.get(`http://localhost:5000/api/books/${id}/read`, {
          responseType: 'arraybuffer'
        });
        
        // Convert the PDF content to base64
        const base64Content = btoa(
          new Uint8Array(response.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          )
        );
        
        setPdfContent(base64Content);
      } catch (err) {
        setError(t('error.loadingPdf'));
      }
    };

    fetchPdfContent();
  }, [book, id, t]);

  const handleDownload = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/books/${id}/download`, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${book.title[currentLang]}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      setError(t('error.downloadingBook'));
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen">{t('loading')}</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!book) return <div className="text-center">{t('bookNotFound')}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center text-blue-600 hover:text-blue-800"
      >
        <FaArrowLeft className="mr-2" />
        {t('back')}
      </button>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <img
              src={book.imageUrl}
              alt={book.title[currentLang]}
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
          
          <div className="md:w-2/3">
            <h1 className="text-3xl font-bold mb-4">{book.title[currentLang]}</h1>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">{t('author')}:</span> {book.author[currentLang]}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">{t('category')}:</span> {book.category[currentLang]}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">{t('publishYear')}:</span> {book.publishYear}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">{t('pages')}:</span> {book.pages}
            </p>
            <p className="text-gray-700 mb-6">{book.description[currentLang]}</p>

            <div className="flex gap-4">
              <button
                onClick={handleDownload}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <FaDownload className="mr-2" />
                {t('download')}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">{t('readBook')}</h2>
          <div className="border rounded-lg p-4">
            {pdfContent && (
              <div className="pdf-content">
                <embed
                  src={`data:application/pdf;base64,${pdfContent}`}
                  type="application/pdf"
                  width="100%"
                  height="800px"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail; 
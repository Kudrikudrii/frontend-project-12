import React from 'react';
import avatar from '../assets/404-D_FLHmTM.svg';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom'; // Используйте Link вместо <a> для SPA

const PageNotFound = () => {
  const { t } = useTranslation();
  
  return (
    <body className="h-100 bg-light">
      <div className="h-100">
        <div className="h-100" id="chat">
          <div className="d-flex flex-column h-100">
            <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
              <div className="container">
                <a className="navbar-brand" href="/">
                  {t('mainHeader.hexletChat')}
                </a>
              </div>
            </nav>
            <div className="text-center">
              <img 
                alt={t('notFoundPage.title')} 
                className="img-fluid w-25" 
                src={avatar} 
              />
              <h1 className="h4 text-muted">
                {t('notFoundPage.title')}
              </h1>
              <p className="text-muted">
                <Trans 
                  i18nKey="notFoundPage.toMainPage" 
                  components={{
                    homeLink: <Link to="/" className="text-decoration-none" />
                  }}
                />
              </p>
            </div>
          </div>
          <div className="Toastify"></div>
        </div>
      </div>
    </body>  
  );
};


export default PageNotFound;

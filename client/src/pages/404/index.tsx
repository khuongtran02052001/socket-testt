import React from 'react';

import Link from 'next/link';
import { Helmet } from 'react-helmet';

import ErrorPage from '../../styles/pageerror.module.css';

export default function Error() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>404 PAGE</title>
      </Helmet>
      <div className="my-28">
        <h1 className={ErrorPage.title}>404 Error Page</h1>
        <p className={ErrorPage.zoomarea}>
          <b>Oh no!!!</b> You&apos;re either misspelling the URL <br /> or
          requesting a page that&apos;s no longer here.{' '}
        </p>
        <section className={ErrorPage.errorcontainer}>
          <span>
            <span>4</span>
          </span>
          <span>0</span>
          <span>
            <span>4</span>
          </span>
        </section>
        <div className={ErrorPage.linkcontainer}>
          <p className="inline-flex justify-center w-1/4 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
            <Link href="/">Visit the homepage</Link>
          </p>
        </div>
      </div>
    </>
  );
}

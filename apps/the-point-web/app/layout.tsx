import React, { ReactNode } from 'react'
// @todo
// import { GoogleTagManager } from '@next/third-parties/google'
import { LocaleProvider } from '../hooks/locale-provider'
import { getLocale } from '../i18n/server'
// @todo
// import { NextSeo } from 'next-seo'
// import { SEO } from 'next-seo.config'
import { Root } from '@/components/Root'
// global styles
import './localGlobalStyles.scss'
import '@apprepo/styles/index.scss'

export default function RootLayout({
  children
}: {
  children: ReactNode
}) {
  const locale = getLocale()

  return (
    <html lang={locale}>
      {/* <GoogleTagManager gtmId='GTM-XXXXXX' /> */}
      <body>
        {/* @todo add nextseo - https://github.com/garmeeh/next-seo/blob/master/README.md */}
        {/* <NextSeo {...SEO} /> */}
        <LocaleProvider value={locale}>
          <Root>
            { children }
          </Root>
        </LocaleProvider>
      </body>
    </html>
  )
}

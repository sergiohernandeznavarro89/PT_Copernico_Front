import Head from "next/head"
import { FC } from "react"
import { Navbar } from '../ui/Navbar';

type LayoutProps = {
  children: React.ReactNode,
  title?: string
}

export const Layout: FC<LayoutProps> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title || 'App Next'}</title>
        <meta name="author" content="Sergio Hernández" />
        <meta name="description" content={title} />
        <meta name="keywords" content={`${title}`} />
      </Head>

      <Navbar />

      <main style={{
        padding: '0px 20px'
      }}>
        {children}
      </main>
    </>
  )
}

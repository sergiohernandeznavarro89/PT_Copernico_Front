import type { NextPage } from 'next'
import { Layout } from '../components/layouts'
import { CustomerTable } from '../components/ui'

interface Props {
}

const HomePage: NextPage<Props> = () => {
  return (
    <Layout title='Prueba técnica Copernicus'>
      <CustomerTable />
    </Layout>
  )
}

export default HomePage

import { Layout } from '@/components/Layout';
import '@/pages/Home.css'

export function Home() {
  return (
    <Layout>
      <img src="catcouple.jpg" alt='Two cute cats cuddling' className='hero-image' />
      <div className='home-card'>
        <h1 className='subheading'>You Can Make a Difference!</h1>
        <p></p>
      </div>
    </Layout>
  );
}

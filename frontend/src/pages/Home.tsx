import { Layout } from '@/components/Layout';
import '@/pages/Home.css'

export function Home() {
  return (
    <Layout>
      <img src="catcouple.jpg" alt='Two cute cats cuddling' className='hero-image' />
      <div className='home-card'>
        <h1 className='subheading'>You Can Make a Difference!</h1>
        <div home-card-container>

        </div>
        <h1 className='subheading'>Our Mission</h1>
        <p className='mission-body'>Our mission is to give every cat the chance to feel safe, loved, and truly at home. We rescue cats in need, provide compassionate care, and match them with families who are ready to love them for life.</p>
      </div>
    </Layout>
  );
}

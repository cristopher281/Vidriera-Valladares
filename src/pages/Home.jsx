import React from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Hero from '../components/home/Hero'
import WhyChooseUs from '../components/home/WhyChooseUs'
import FeaturedProducts from '../components/home/FeaturedProducts'
import Testimonials from '../components/home/Testimonials'

export default function Home(){
  return (
    <div>
      <Navbar />
      <Hero />
      <WhyChooseUs />
      <FeaturedProducts />
      <Testimonials />
      <Footer />
    </div>
  )
}

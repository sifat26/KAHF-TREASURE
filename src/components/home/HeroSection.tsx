'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

const heroSlides = [
  {
    id: 1,
    eyebrow: 'Signature Collection',
    title: 'Royal Attar Display',
    description: 'গভীর, রাজকীয় এবং দীর্ঘস্থায়ী সুগন্ধির কালেকশন, প্রিমিয়াম প্রেজেন্টেশনে।',
    src: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=luxury%20attar%20bottles%20displayed%20on%20an%20ornate%20Islamic%20geometric%20pattern%2C%20black%20and%20gold%20packaging%2C%20warm%20golden%20lighting%2C%20premium%20product%20photography%2C%20shallow%20depth%20of%20field%2C%20elegant%20dark%20background%2C%20realistic%2C%20high-end%20ecommerce%20hero%20banner&image_size=landscape_16_9',
    alt: 'Luxury attar bottles displayed with black and gold premium styling',
  },
  {
    id: 2,
    eyebrow: 'Premium Oils',
    title: 'Crafted For Daily Elegance',
    description: 'প্রতিদিনের ব্যবহার থেকে বিশেষ মুহূর্ত, সবকিছুর জন্য মার্জিত এবং সমৃদ্ধ সুগন্ধ।',
    src: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=close-up%20of%20a%20premium%20attar%20oil%20bottle%20with%20Arabic%20inspired%20gold%20details%2C%20luxury%20glass%20bottle%2C%20soft%20studio%20lighting%2C%20dark%20moody%20background%2C%20high-end%20beauty%20brand%20hero%20image%2C%20realistic%20product%20photography&image_size=landscape_16_9',
    alt: 'Close-up premium attar oil bottle with gold details',
  },
  {
    id: 3,
    eyebrow: 'Gift-Ready Picks',
    title: 'Curated For A Refined Taste',
    description: 'স্মরণীয় উপহার বা ব্যক্তিগত সংগ্রহের জন্য বাছাই করা এলিগ্যান্ট আতরের সেট।',
    src: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=curated%20set%20of%20luxury%20attar%20perfume%20bottles%20on%20a%20dark%20reflective%20surface%2C%20golden%20highlights%2C%20Islamic%20luxury%20aesthetic%2C%20premium%20ecommerce%20banner%2C%20realistic%20product%20photography%2C%20rich%20black%20and%20gold%20tones&image_size=landscape_16_9',
    alt: 'Curated luxury attar bottles with black and gold styling',
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(nextSlide, 5000);
    return () => window.clearInterval(interval);
  }, [nextSlide]);

  const activeSlide = heroSlides[currentSlide];

  return (
    <header className='relative overflow-hidden px-4 pb-12 pt-[100px] sm:pt-[120px] md:pb-32 md:pt-[140px]' id='hero'>
      {/* Ambient glow effects */}
      <div
        className='pointer-events-none absolute left-[10%] top-[15%] h-[500px] w-[500px] rounded-full bg-[var(--color-gold-500)] opacity-[0.04] blur-[150px]'
        aria-hidden='true'
      />
      <div
        className='pointer-events-none absolute right-[5%] top-[50%] h-[400px] w-[400px] rounded-full bg-[var(--color-gold-400)] opacity-[0.03] blur-[120px]'
        aria-hidden='true'
      />
      <div
        className='pointer-events-none absolute left-[40%] bottom-[10%] h-[300px] w-[600px] rounded-full bg-[var(--color-gold-600)] opacity-[0.025] blur-[100px]'
        aria-hidden='true'
      />

      <div className='container relative z-10 mx-auto max-w-[1400px]'>
        <div className='grid items-center gap-8 sm:gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20'>
          {/* Left Content */}
          <div className='flex flex-col items-center text-center'>
            {/* Logo */}
            <div className='mb-6 sm:mb-10'>
              <Image
                src='https://i.ibb.co/jv7S5ZXr/2.png'
                alt='KAHF TREASURE Logo'
                width={160}
                height={64}
                className='h-auto w-[100px] sm:w-[130px] lg:w-[150px] drop-shadow-[0_0_20px_rgba(212,184,106,0.15)]'
                priority
              />
            </div>

            {/* Decorative line */}
            <div className='mb-6 sm:mb-8 flex items-center gap-3'>
              <div className='h-px w-8 bg-gradient-to-r from-transparent to-[var(--color-gold-500)]/50' />
              <div className='h-1 w-1 rounded-full bg-[var(--color-gold-400)]' />
              <div className='h-px w-8 bg-gradient-to-l from-transparent to-[var(--color-gold-500)]/50' />
            </div>

            <h1 className='font-bengali text-[clamp(2.2rem,5vw,5rem)] font-light leading-[1.08] text-white tracking-tight'>
              আতরের বিক্রয়
              <br />
              <span className='font-medium text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-gold-200)] via-[var(--color-gold-400)] to-[var(--color-gold-600)]'>
                মূল্য তালিকা
              </span>
            </h1>

            <p className='mt-5 sm:mt-8 font-display text-[0.65rem] sm:text-[0.8rem] uppercase tracking-[0.35em] sm:tracking-[0.45em] text-[var(--color-gold-400)]/70'>
              A Drop of Gold, The Earth Turns Royal
            </p>

            <p className='mt-5 sm:mt-6 max-w-lg font-bengali text-[0.9rem] sm:text-base lg:text-lg leading-relaxed text-white/50'>
              আতর, মধু, ইসলামী বই এবং অন্যান্য ইসলামী পণ্য — সঠিক গুণমান, সঠিক মূল্য, সবই এখন আপনার হাতের নাগালে।
            </p>

            {/* CTA Buttons */}
            <div className='mt-8 sm:mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-5'>
              <Link
                href='#most-wanted'
                className='group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-[var(--color-gold-500)]/30 bg-gradient-to-r from-[var(--color-gold-500)] to-[var(--color-gold-600)] px-7 py-3 sm:px-9 sm:py-4 text-xs sm:text-sm font-medium uppercase tracking-[0.15em] text-black shadow-[0_0_30px_rgba(201,168,76,0.15)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(201,168,76,0.3)] hover:scale-[1.02]'
              >
                Explore Collection
                <span className='transition-transform duration-300 group-hover:translate-x-1'>→</span>
              </Link>
              <Link
                href='#contact'
                className='inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 sm:px-8 sm:py-4 text-xs sm:text-sm font-medium uppercase tracking-[0.15em] text-white/60 transition-all duration-300 hover:border-white/25 hover:text-white/90 hover:bg-white/5'
              >
                Contact Us
              </Link>
            </div>

            {/* Stats */}
            <div className='mt-10 sm:mt-16 w-full max-w-md'>
              <div className='flex items-center justify-center gap-6 sm:gap-10 border-t border-white/[0.06] pt-6 sm:pt-8'>
                <div className='flex flex-col items-center'>
                  <span className='text-xl sm:text-2xl font-light text-white'>50+</span>
                  <span className='text-[0.55rem] sm:text-[0.6rem] uppercase tracking-[0.2em] text-white/30 mt-1.5'>
                    Premium Scents
                  </span>
                </div>
                <div className='h-7 sm:h-9 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent' />
                <div className='flex flex-col items-center'>
                  <span className='text-xl sm:text-2xl font-light text-white'>100%</span>
                  <span className='text-[0.55rem] sm:text-[0.6rem] uppercase tracking-[0.2em] text-white/30 mt-1.5'>
                    Trusted Quality
                  </span>
                </div>
                <div className='h-7 sm:h-9 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent' />
                <div className='flex flex-col items-center'>
                  <span className='text-xl sm:text-2xl font-light text-white'>64</span>
                  <span className='text-[0.55rem] sm:text-[0.6rem] uppercase tracking-[0.2em] text-white/30 mt-1.5'>
                    Districts
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Slider Card */}
          <div className='relative w-full aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] max-h-[450px] sm:max-h-[600px] lg:max-h-[850px] rounded-[1.2rem] sm:rounded-[1.5rem] overflow-hidden group border border-white/[0.06]'>
            {/* Subtle card glow */}
            <div className='absolute -inset-px rounded-[1.2rem] sm:rounded-[1.5rem] bg-gradient-to-b from-[var(--color-gold-500)]/10 via-transparent to-transparent pointer-events-none z-10' />

            {heroSlides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                  index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                }`}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  sizes='(min-width: 1024px) 50vw, 100vw'
                  className='object-cover'
                  unoptimized
                  priority={index === 0}
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10' />
              </div>
            ))}

            {/* Slide Content overlay */}
            <div className='absolute inset-0 z-20 flex flex-col justify-end p-5 sm:p-8 md:p-10'>
              <div className='flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4'>
                <div className='max-w-md'>
                  <span className='text-[var(--color-gold-400)]/80 text-[0.55rem] sm:text-[0.6rem] uppercase tracking-[0.35em] mb-2 sm:mb-3 block'>
                    {activeSlide.eyebrow}
                  </span>
                  <h2 className='font-display text-xl sm:text-2xl lg:text-4xl text-white mb-2 sm:mb-3 font-light tracking-wide leading-tight'>
                    {activeSlide.title}
                  </h2>
                  <p className='text-white/50 font-bengali text-xs sm:text-sm leading-relaxed'>
                    {activeSlide.description}
                  </p>
                </div>

                {/* Controls */}
                <div className='flex items-center gap-2.5 sm:gap-3 pb-0 sm:pb-1'>
                  <button
                    onClick={prevSlide}
                    className='w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center rounded-full border border-white/15 text-white/60 hover:bg-white/10 hover:text-white hover:border-white/30 transition-all duration-300 text-sm backdrop-blur-sm'
                    aria-label='Previous slide'
                  >
                    ←
                  </button>
                  <button
                    onClick={nextSlide}
                    className='w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center rounded-full border border-white/15 text-white/60 hover:bg-white/10 hover:text-white hover:border-white/30 transition-all duration-300 text-sm backdrop-blur-sm'
                    aria-label='Next slide'
                  >
                    →
                  </button>
                </div>
              </div>

              {/* Progress dots */}
              <div className='flex items-center gap-2 mt-5 sm:mt-6'>
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-[2px] rounded-full transition-all duration-500 ${
                      index === currentSlide ? 'w-8 bg-[var(--color-gold-400)]' : 'w-3 bg-white/20 hover:bg-white/30'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

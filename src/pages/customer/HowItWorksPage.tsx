import React from 'react';

const HowItWorksPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-dark mb-8 text-center">How It Works</h1>
      
      <div className="max-w-3xl mx-auto">
        <div className="space-y-12">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/3 flex-shrink-0 mb-4 md:mb-0">
              <div className="w-24 h-24 bg-primary-100 text-primary font-bold rounded-full mx-auto flex items-center justify-center text-2xl">1</div>
            </div>
            <div className="md:w-2/3">
              <h2 className="text-xl font-bold text-dark mb-2">Browse Handcrafted Gifts</h2>
              <p className="text-dark-600">
                Explore our marketplace of unique, handcrafted gifts from local artisans. 
                Filter by occasion, price, and delivery timeline.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/3 flex-shrink-0 mb-4 md:mb-0">
              <div className="w-24 h-24 bg-primary-100 text-primary font-bold rounded-full mx-auto flex items-center justify-center text-2xl">2</div>
            </div>
            <div className="md:w-2/3">
              <h2 className="text-xl font-bold text-dark mb-2">Customize Your Gift</h2>
              <p className="text-dark-600">
                Personalize your selection with custom messages, colors, or 
                embellishments. Make it truly special for your recipient.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/3 flex-shrink-0 mb-4 md:mb-0">
              <div className="w-24 h-24 bg-primary-100 text-primary font-bold rounded-full mx-auto flex items-center justify-center text-2xl">3</div>
            </div>
            <div className="md:w-2/3">
              <h2 className="text-xl font-bold text-dark mb-2">Choose Delivery Options</h2>
              <p className="text-dark-600">
                Select standard delivery or our SOS Express service for 
                same-day delivery in select areas. Track your gift in real-time.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/3 flex-shrink-0 mb-4 md:mb-0">
              <div className="w-24 h-24 bg-primary-100 text-primary font-bold rounded-full mx-auto flex items-center justify-center text-2xl">4</div>
            </div>
            <div className="md:w-2/3">
              <h2 className="text-xl font-bold text-dark mb-2">Delight Your Recipient</h2>
              <p className="text-dark-600">
                Watch as your thoughtfully selected gift brings joy to your 
                special someone. Share your experience and support local artisans.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <button className="bg-primary text-white px-8 py-3 rounded-md font-medium text-lg">
            Start Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage; 
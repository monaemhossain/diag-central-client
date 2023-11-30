const AboutPage = () => {
  return (
    <div className="container mx-auto mt-8 mb-20">
      <h1 className="text-4xl font-bold mb-6 mx-6">About Us</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-6">
        <div>
          <h2 className="text-2xl font-bold mb-4">Our Story</h2>
          <p className="text-gray-600">
            Welcome to DiagCentral, where your health and well-being are our top priorities. Our journey began with a simple yet powerful mission: to empower individuals to take control of their health through accessible and personalized diagnostic solutions.
            Founded in 2018, we have been committed to delivering accurate, reliable, and timely health information. Whether you are seeking preventive measures, health tips, or upcoming tests suggested by healthcare professionals, DiagCentral is here to guide you on your wellness journey.
            Join us as we continue to evolve, innovate, and contribute to a healthier and happier world. Your health is your wealth, and at DiagCentral, we are dedicated to helping you live your best life.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-600">
            At DiagCentral, our mission is simple yet profound — to make quality healthcare accessible to everyone. We believe that everyone deserves the right to prioritize their health, and we are dedicated to providing innovative diagnostic solutions that empower individuals to make informed decisions about their well-being.
            Our commitment extends beyond just diagnostics; we aim to create a holistic and supportive platform that fosters a culture of proactive health management. Through cutting-edge technology, expert insights, and a user-centric approach, we strive to transform the healthcare experience for our users.
            Whether it&#39;s preventive measures, personalized recommendations, or a community that shares the same health journey, DiagCentral is here to serve and uplift. Join us in our mission to build a healthier world, one individual at a time.
          </p>
        </div>
      </div>

      <div className="mt-8 mx-6">
        <h2 className="text-2xl font-bold mb-4">Meet the Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="border p-4 rounded-md">
            <h3 className="text-xl font-semibold mb-2">John Doe</h3>
            <p className="text-gray-600">Co-Founder / CEO</p>
          </div>

          <div className="border p-4 rounded-md">
            <h3 className="text-xl font-semibold mb-2">Jane Smith</h3>
            <p className="text-gray-600">Co-Founder / CTO</p>
          </div>

          <div className="border p-4 rounded-md">
            <h3 className="text-xl font-semibold mb-2">Alex Johnson</h3>
            <p className="text-gray-600">Marketing Director</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

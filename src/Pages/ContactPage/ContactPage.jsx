const ContactPage = () => {
  return (
    <div className="container mx-auto mt-8 pb-16">
      <h1 className="text-4xl font-bold mb-8 mx-6">Contact Us</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-6">
        <div>
          <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
          <p className="text-gray-600 mb-4">
            If you have any questions or inquiries, please feel free to contact us using the form below or via email.
          </p>
          <ul className="list-disc text-gray-600">
            <li className="list-none">Email: info@diag-central.com</li>
            <li className="list-none">Phone: +1 (123) 456-7890</li>
            <li className="list-none">
              Address:
              <address>
                123 Main St, City villa, State, 12345
              </address>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Contact Form</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-1 p-2 border rounded-md w-full"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 p-2 border rounded-md w-full"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                className="mt-1 p-2 border rounded-md w-full"
                placeholder="Type your message here..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

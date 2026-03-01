import './App.css'

function App() {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>University Lost & Found</h1>
          <p className="hero-subtitle">
            Lost something on campus? Found something that isn't yours? 
            Help reunite items with their owners.
          </p>
          <div className="cta-buttons">
            <button className="btn btn-primary">Report Found Item</button>
            <button className="btn btn-secondary">Search Lost Items</button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <div className="container">
          <h2>About</h2>
          <p>
            Our platform makes it easy for university students to report lost and found items. 
            Whether you've lost your keys, phone, or textbook, or found something that belongs 
            to someone else, we're here to help connect the dots and reunite items with their 
            rightful owners.
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="container">
          <h2>How It Works</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Post</h3>
              <p>Report a lost or found item with details and photos</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Search</h3>
              <p>Browse listings to find your missing belongings</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Claim</h3>
              <p>Connect with the finder to arrange pickup</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Get Started?</h2>
          <p>Join our community and help make campus a better place</p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container">
          <p>&copy; 2026 University Lost & Found. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App

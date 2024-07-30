import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-overlay"></div>
      <div className="home-content-wrapper">
        <h1 className="home-title">Welcome to GourmetGem: Your Culinary Inspiration!</h1>
        <p className="home-content">
          Explore the world of flavors and aromas with GourmetGem, where cooking meets creativity.
          Whether you are a seasoned chef or a curious beginner, our platform is your gateway to a
          treasure trove of delightful recipes, culinary tips, and food inspiration. Dive into our
          collection of dishes from around the globe and embark on a journey of culinary discovery.
          Get ready to elevate your cooking skills and delight your taste buds. Let us cook up
          something extraordinary together!
        </p>
      </div>
    </div>
  );
};

export default Home;

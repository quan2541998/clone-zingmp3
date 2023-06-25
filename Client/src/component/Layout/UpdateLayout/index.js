import Header from "./Header";
import Footer from "./Footer";

const UpdateLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="container">{children}</div>
      <Footer />
    </div>
  );
};

export default UpdateLayout;

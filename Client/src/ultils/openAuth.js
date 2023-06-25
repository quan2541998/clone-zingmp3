const openAuth = () => {
  var width = 600;
  var height = 500;
  var left = (window.innerWidth - width) / 2;
  var top = (window.innerHeight - height) / 2;
  window.open(
    "http://localhost:3000/login",
    "_blank",
    "width=" + width + ", height=" + height + ", left=" + left + ", top=" + top
  );
};

export default openAuth;

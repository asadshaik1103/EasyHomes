export default {
  isLogin: () => {
    return !!localStorage.getItem("token");
  }
};
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

const LoginForm = () => {
  return (
    <section className="ftco-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="login-wrap p-4 p-md-5">
              <h3 className="text-center mb-4">Login</h3>
              <form action="#" className="login-form">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control rounded-left"
                    placeholder="Username"
                    required
                  />
                </div>
                <div className="form-group d-flex">
                  <input
                    type="password"
                    className="form-control rounded-left"
                    placeholder="Password"
                    required
                  />
                </div>
                <div className="form-group d-md-flex">
                  <div className="w-50 text-md-right">
                    <a href="#">Forgot Password</a>
                  </div>
                </div>
                <div className="form-group">
                  <button
                    type="submit"
                    className="btn btn-primary rounded submit p-3 px-5"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;

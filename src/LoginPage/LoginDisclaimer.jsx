import React from "react";
import styles from "./LoginContainer.module.css";

const LoginDisclaimer = () => {
  return (
    <section className={styles.loginText}>
      <p>Sign in with your Google account to continue</p>
      <p>
        By signing in, you agree to our{" "}
        <button
          className={styles.termsLink}
          onClick={() => window.open("/terms", "_blank")}
        >
          Terms & Privacy Policy
        </button>
      </p>
    </section>
  );
};

export default LoginDisclaimer;

import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={classes.footerCnt}>
      <p className={classes.text}>
        Made by <strong>Alfonso Falcone</strong> —
        <a
          href="https://github.com/alfon96/linkedin-banner-maker"
          target="_blank"
          rel="noopener noreferrer"
        >
          View on GitHub
        </a>
        ·
        <a
          href="https://www.linkedin.com/in/alfonso-falcone-621b151b2/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Connect on LinkedIn
        </a>
      </p>
    </footer>
  );
};

export default Footer;

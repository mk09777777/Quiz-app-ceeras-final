import React from "react";
import styles from "./InputDesign.module.css";
import FeatureCard from "./FeatureCard";

function FeaturesSection() {
  const features = [
    {
      title: "Secure Quiz System",
      description:
        "One-time quiz IDs and secure authentication ensure your tests remain confidential and tamper-proof.",
    },
    {
      title: "Real-time Results",
      description:
        "Get instant feedback and detailed analytics on quiz performance as soon as participants complete their tests.",
    },
    {
      title: "User-friendly Interface",
      description:
        "Intuitive design makes it easy for both quiz creators and participants to navigate and use the platform.",
    },
  ];

  return (
    <section className={styles.featuresSection}>
      <h2 className={styles.featuresTitle}>Features</h2>
      <h3 className={styles.featuresHeading}>
        Everything you need for perfect quizzing
      </h3>
      <div className={styles.featureCards}>
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </section>
  );
}

export default FeaturesSection;

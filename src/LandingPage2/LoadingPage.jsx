"use client";
import React from "react";
import styles from "./LoadingPage.module.css";
import NavigationBar from "./NavigationBar";
import AppOverview from "./AppOverview";
import HowToUse from "./HowToUse";
import FAQ from "./FAQ";
import SupportSection from "./SupportSection";

function LoadingPage() {
  return (
    <main className={styles.loadingpage}>
      <NavigationBar />
      <hr className={styles.div5} aria-hidden="true" />
      <AppOverview />
      <HowToUse />
      <FAQ />
      <SupportSection />
    </main>
  );
}

export default LoadingPage;

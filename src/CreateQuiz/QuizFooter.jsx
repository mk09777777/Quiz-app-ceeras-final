import React from "react";
import styles from "./InputDesign.module.css";

const QuizFooter = ({ 
  currentStep, 
  onBack, 
  onNext, 
  onSaveDraft,
  onFinish,
  quizLink,
  quizData 
}) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.buttonContainer}>
        <button
          className={styles.back}
          onClick={onBack}
          disabled={currentStep === 1}
          aria-label="Go back to previous step"
        >
          Back
        </button>
   
        <button
          className={styles.saveDraft}
          onClick={onSaveDraft}
          aria-label="Save quiz as draft"
        >
          Save Draft
        </button>
   
        <button
          className={styles.next}
          onClick={currentStep === 3 ? onFinish : onNext}
          disabled={currentStep === 3 && quizLink}
          aria-label={
            currentStep === 3 ? "Finish quiz creation" : "Go to next step"
          }
        >
          {currentStep === 3 ? "Finish" : "Next"}
        </button>
      </div>
   
      {quizLink && (
        <div className={styles.linkContainer}>
          <p>Quiz Link: <a href={quizLink} target="_blank" rel="noopener noreferrer">{quizLink}</a></p>
        </div>
      )}
      
      <div className={styles.credit}>
        <p>Developed by CEERAS</p>
      </div>
    </footer>
  );
};

export default QuizFooter;
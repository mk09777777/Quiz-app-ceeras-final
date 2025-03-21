"use client";
import React from "react";
import styles from "./Dashboard.module.css";

const ActivityTable = () => {
  // Mock activity data
  const activities = [
    {
      id: 1,
      quiz: "Mathematics Basics",
      score: "90%",
      scoreBadge:
        '<svg width="61" height="35" viewBox="0 0 61 35" fill="none" xmlns="http://www.w3.org/2000/svg" class="score-badge"> <mask id="mask0_144_1893" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="3" width="61" height="30"> <path d="M61 3.04688H0V33H61V3.04688Z" fill="white"></path> </mask> <g mask="url(#mask0_144_1893)"> <path d="M61 3.04688H0V33H61V3.04688Z" fill="#F9F9F9"></path> <path d="M46.2494 3.04688H14.7506C6.60408 3.04688 0 9.75211 0 18.0234C0 26.2948 6.60408 33 14.7506 33H46.2494C54.3959 33 61 26.2948 61 18.0234C61 9.75211 54.3959 3.04688 46.2494 3.04688Z" fill="#DCFCE7"></path> </g> <text fill="#166534" xml:space="preserve" style="white-space: pre" font-family="REM" font-size="16" font-weight="bold" letter-spacing="0px"><tspan x="11.9922" y="23.68">90%</tspan></text> </svg>',
      date: "May 15, 2024",
    },
    {
      id: 2,
      quiz: "Science Quiz",
      score: "75%",
      scoreBadge:
        '<svg width="61" height="35" viewBox="0 0 61 35" fill="none" xmlns="http://www.w3.org/2000/svg" class="score-badge"> <mask id="mask0_144_1902" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="3" width="61" height="30"> <path d="M61 3.04688H0V33H61V3.04688Z" fill="white"></path> </mask> <g mask="url(#mask0_144_1902)"> <path d="M61 3.04688H0V33H61V3.04688Z" fill="#F9F9F9"></path> <path d="M46.2494 3.04688H14.7506C6.60408 3.04688 0 9.75211 0 18.0234C0 26.2948 6.60408 33 14.7506 33H46.2494C54.3959 33 61 26.2948 61 18.0234C61 9.75211 54.3959 3.04688 46.2494 3.04688Z" fill="#ECF89E"></path> </g> <text fill="#166534" xml:space="preserve" style="white-space: pre" font-family="REM" font-size="16" font-weight="bold" letter-spacing="0px"><tspan x="11.9922" y="23.68">75%</tspan></text> </svg>',
      date: "May 14, 2024",
    },
  ];

  // Handle view results
  const handleViewResults = (activityId) => {
    // In a real app, this would navigate to the results page
    console.log(`Viewing results for activity ${activityId}`);
  };

  return (
    <section className={styles.recentActivity} aria-labelledby="activity-title">
      <h2 id="activity-title" className={styles.sectionTitle}>
        Recent Activity
      </h2>
      <div
        className={styles.activityTable}
        role="table"
        aria-label="Recent quiz activities"
      >
        <div className={styles.tableHeader} role="row">
          <div className={styles.headerCell} role="columnheader">
            Quiz
          </div>
          <div className={styles.headerCell} role="columnheader">
            Score
          </div>
          <div className={styles.headerCell} role="columnheader">
            Date
          </div>
          <div className={styles.headerCell} role="columnheader">
            Actions
          </div>
        </div>

        {activities.map((activity, index) => (
          <div key={activity.id} className={styles.tableRow} role="row">
            <div className={styles.cell} role="cell">
              {activity.quiz}
            </div>
            <div
              className={index === 0 ? styles.cell2 : styles.cell4}
              role="cell"
            >
              <div
                dangerouslySetInnerHTML={{ __html: activity.scoreBadge }}
                aria-hidden="true"
              />
              <span className="sr-only">{activity.score}</span>
            </div>
            <div className={styles.cell} role="cell">
              {activity.date}
            </div>
            <div
              className={index === 0 ? styles.cell3 : styles.cell5}
              role="cell"
            >
              <button
                onClick={() => handleViewResults(activity.id)}
                className="text-button"
                aria-label={`View results for ${activity.quiz}`}
              >
                View Results
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ActivityTable;

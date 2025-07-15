'use client';

import { memo } from 'react';
import { Experience } from '../types';
import styles from './ExperienceCard.module.css';

interface ExperienceCardProps {
  experience: Experience;
}

const ExperienceCard = memo<ExperienceCardProps>(({ experience }) => {
  return (
    <div className={styles.experienceCard}>
      <div className={styles.header}>
        <h3 className={styles.jobTitle}>{experience.jobtitle}</h3>
        <h4 className={styles.companyName}>{experience.companyname}</h4>
        <div className={styles.jobInfo}>
          <span className={styles.workType}>{experience.worktype}</span>
          <span className={styles.duration}>{experience.duration}</span>
          <span className={styles.location}>{experience.location}</span>
        </div>
      </div>

      <div className={styles.section}>
        <h5 className={styles.sectionTitle}>Key Responsibilities</h5>
        <ul className={styles.responsibilityList}>
          {experience.responsibility.map((item, index) => (
            <li key={index} className={styles.responsibilityItem}>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.section}>
        <h5 className={styles.sectionTitle}>Technologies & Tools</h5>
        <div className={styles.toolsContainer}>
          {experience.tools.map((tool, index) => (
            <span key={index} className={styles.toolTag}>
              {tool}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
});

ExperienceCard.displayName = 'ExperienceCard';

export default ExperienceCard; 
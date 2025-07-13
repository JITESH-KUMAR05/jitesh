import React, {useContext} from "react";
import "./WorkExperience.scss";
import ExperienceCard from "../../components/experienceCard/ExperienceCard";
import {workExperiences} from "../../portfolio";
import {motion} from "framer-motion";
import StyleContext from "../../contexts/StyleContext";

export default function WorkExperience() {
  const {isDark} = useContext(StyleContext);
  if (workExperiences.display) {
    return (
      <div id="experience">
        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 1}}
          className="experience-container"
          id="workExperience"
        >
          <div>
            <h1 className="experience-heading">Experiences</h1>
            <div className="experience-cards-div">
              {workExperiences.experience.map((card, i) => {
                return (
                  <ExperienceCard
                    key={i}
                    isDark={isDark}
                    cardInfo={{
                      company: card.company,
                      desc: card.desc,
                      date: card.date,
                      companylogo: card.companylogo,
                      role: card.role,
                      descBullets: card.descBullets
                    }}
                  />
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    );
  }
  return null;
}

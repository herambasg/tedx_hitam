import React from 'react';
import { motion } from 'framer-motion';

/**
 * A reusable tabs component with an animated active indicator.
 * @param {object} props - The component props.
 * @param {Array<object>} props.tabs - An array of tab objects, each with an 'id' and 'label'.
 * @param {string} props.activeTab - The ID of the currently active tab.
 * @param {Function} props.setActiveTab - The state setter function to change the active tab.
 */
function Tabs({ tabs, activeTab, setActiveTab }) {
  return (
    <div className="tab-wrapper">
      <div className="tab-container">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
          >
            {/* The text label for the tab */}
            <span>{tab.label}</span>

            {/* The animated pill that highlights the active tab */}
            {activeTab === tab.id && (
              <motion.div
                className="active-pill"
                layoutId="activePill" // This ID is crucial for the animation between tabs
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Tabs;

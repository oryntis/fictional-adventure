import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'about',
    {
      type: 'category',
      label: 'Introduction & Setup',
      items: [
        'orion/orion_00_master_index_v9',
        'orion/orion_vol0_quickstart_contributing_roadmap',
      ],
    },
    {
      type: 'category',
      label: 'Orion Volumes',
      items: [
        'orion/orion_vol1_vision_strategy',
        'orion/orion_vol1_supplement',
        'orion/orion_vol2_unified',
        'orion/orion_vol3_build_requirements',
        'orion/orion_vol3_supplement',
        'orion/orion_vol4_learning_resources',
        'orion/orion_vol5_philosophy_problems',
        'orion/orion_vol6_developer_tools',
        'orion/orion_vol7_problems_solutions',
        'orion/orion_vol8_os_landscape_analysis',
        'orion/orion_vol9_research_innovation_hub',
        {type: 'category', label: 'Future Volumes', items: [
          'orion/orion_vol10_roadmap'
        ]}
      ],
    },
    {
      type: 'category',
      label: 'Analysis & Reports',
      items: [
        'orion/orion_analysis_feedback_report',
        'orion/orion_master_flaw_register',
        'orion/orion_project_tools_spec',
      ],
    },
  ],

  // But you can create a sidebar manually
  /*
  tutorialSidebar: [
    'intro',
    'hello',
    {
      type: 'category',
      label: 'Tutorial',
      items: ['tutorial-basics/create-a-document'],
    },
  ],
   */
};

export default sidebars;

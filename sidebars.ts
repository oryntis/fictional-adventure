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
    'index',
    {
      type: 'category',
      label: 'About',
      items: ['about/index', 'about/comparison-matrix', 'about/philosophy', 'about/roadmap'],
    },
    {
      type: 'category',
      label: 'Phases',
      items: [
       {
        type: 'category',
        label: 'Phase 0: Cosmic Dawn',
        items: [
          'phases/phase-0/index',
          'phases/phase-0/resources',
          {
            type: 'category',
            label: 'Tasks',
            items: [
              {
                type: 'category',
                label: 'Task 0.1: Bootloader',
                items:[
                  'phases/phase-0/tasks/bootloader/index',
                  'phases/phase-0/tasks/bootloader/implementation',
                  'phases/phase-0/tasks/bootloader/testing',
                  'phases/phase-0/tasks/bootloader/troubleshooting'
                ]
              },
              {
                type: 'category',
                label: 'Task 0.2: Kernel-Entry',
                items:[
                  'phases/phase-0/tasks/kernel-entry/index',
                  'phases/phase-0/tasks/kernel-entry/implementation',
                  'phases/phase-0/tasks/kernel-entry/testing',
                  'phases/phase-0/tasks/kernel-entry/troubleshooting'
                ]
              },
              {
                type: 'category',
                label: 'Task 0.3: Memory Management',
                items:[
                  'phases/phase-0/tasks/memory-management/index',
                  'phases/phase-0/tasks/memory-management/implementation',
                  'phases/phase-0/tasks/memory-management/testing',
                  'phases/phase-0/tasks/memory-management/troubleshooting'
                ]
              },
            ]
          },
          'phases/phase-0/summary'
        ]
       },
        {
        type: 'category',
        label: 'Phase 1: Core Being',
        items: [
          'phases/phase-1/index',
          'phases/phase-1/resources',
          {
            type: 'category',
            label: 'Tasks',
            items: [
              {
                type: 'category',
                label: 'Task 1.1 Process Management',
                items:[
                  'phases/phase-1/tasks/process-management/index',
                  'phases/phase-1/tasks/process-management/implementation',
                  'phases/phase-1/tasks/process-management/testing',
                  'phases/phase-1/tasks/process-management/troubleshooting'
                ]
              },
            ]
          },
          'phases/phase-0/summary'
        ]
       }
      ]
    },
    // {
    //   type: 'category',
    //   label: 'Orion Volumes',
    //   items: [
    //     'orion/orion_vol1_vision_strategy',
    //     'orion/orion_vol1_supplement',
    //     'orion/orion_vol2_unified',
    //     'orion/orion_vol3_build_requirements',
    //     'orion/orion_vol3_supplement',
    //     'orion/orion_vol4_learning_resources',
    //     'orion/orion_vol5_philosophy_problems',
    //     'orion/orion_vol6_developer_tools',
    //     'orion/orion_vol7_problems_solutions',
    //     'orion/orion_vol8_os_landscape_analysis',
    //     'orion/orion_vol9_research_innovation_hub',
    //     {type: 'category', label: 'Future Volumes', items: [
    //       'orion/orion_vol10_roadmap'
    //     ]}
    //   ],
    // },
    // {
    //   type: 'category',
    //   label: 'Analysis & Reports',
    //   items: [
    //     'orion/orion_analysis_feedback_report',
    //     'orion/orion_master_flaw_register',
    //     'orion/orion_project_tools_spec',
    //   ],
    // },
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

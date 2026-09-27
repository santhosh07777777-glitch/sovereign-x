import React from 'react';
import { WorkflowStepIndicator } from '../components/workbench/WorkflowStepIndicator';
import { TaskInputPanel } from '../components/workbench/TaskInputPanel';
import { AnalysisResultView } from '../components/workbench/AnalysisResultView';
import { AgentWorkflowVisualizer } from '../components/workbench/AgentWorkflowVisualizer';

export const WorkbenchPage: React.FC = () => {
  return (
    <div className="h-full flex flex-col overflow-hidden bg-[#07090e]">
      {/* Top Simple Workflow Progress Indicator: 1 Upload → 2 Analyze → 3 Verify → 4 Result */}
      <div className="shrink-0">
        <WorkflowStepIndicator />
      </div>

      {/* Main 3-Column Responsive Workspace */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-0 overflow-y-auto lg:overflow-hidden">
        {/* LEFT COLUMN: Analyze Document (3 cols on desktop) */}
        <div className="lg:col-span-3 h-full overflow-hidden">
          <TaskInputPanel />
        </div>

        {/* CENTER COLUMN: Analysis Result (6 cols on desktop) */}
        <div className="lg:col-span-6 h-full overflow-hidden">
          <AnalysisResultView />
        </div>

        {/* RIGHT COLUMN: AI Process (3 cols on desktop) */}
        <div className="lg:col-span-3 h-full overflow-hidden">
          <AgentWorkflowVisualizer />
        </div>
      </div>
    </div>
  );
};

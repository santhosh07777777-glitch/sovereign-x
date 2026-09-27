import React from 'react';
import { InteractiveEvidenceGraph } from '../components/evidence/InteractiveEvidenceGraph';

export const EvidencePage: React.FC = () => {
  return (
    <div className="h-full w-full overflow-hidden">
      <InteractiveEvidenceGraph />
    </div>
  );
};

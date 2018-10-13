import React from 'react';
import Panel from 'js/components/Panel/index';

const TypographyPreview = () => (
  <Panel heading="Typography">
    <h1 className="compact">H1. 36 roman / Hi, How are you doing?</h1>
    <h2>H2. 30 roman / Are you interested in talking?</h2>
    <h3>H3. 24 light / Are you interested in talking?</h3>
    <h4>H4. 20 light / (Section header) Chose a word set you want to learn</h4>
    <h5>H5. 18 light (subheader) / Are you interested in talking?</h5>
    <h6>H6. 16 roman / (sidebar header) Are you interested in talking?</h6>
    <p>regular text. 16 light / Would you like to arrange an appointment with a doctor or a dentist and/or
      being able to manage medical and beauty plans?</p>
    <p className="small">small text. 14 roman / Black Would you like to arrange an appointment with a doctor
      or a dentist and/or being able to manage medical and beauty plans?</p>
    <div className="text-tiny text-muted">tiny text. 12 roman / Want to learn by your own?</div>
  </Panel>
);

export default TypographyPreview;
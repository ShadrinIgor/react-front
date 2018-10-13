import React from 'react';
import App from 'js/containers/App';
import UIPreview from './routes/UIPreview';
import ColorsPreview from './routes/ColorsPreview';
import CoursePreview from './routes/CoursePreview';
import WordsPreview from './routes/WordsPreview';

const UIKitRoutes = () => (
  <App>
    <div className="container">

      <div className="row">
        <div className="col-xs-12 text-center">
          <h1>UI-Kit</h1>
        </div>
      </div>

      <div className="row">
        <div className="col-xs-12">

          <WordsPreview/>
          <ColorsPreview/>
          <CoursePreview/>
          <UIPreview/>

        </div>
      </div>

    </div>
  </App>
);

export default UIKitRoutes;